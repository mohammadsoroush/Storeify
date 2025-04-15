"use server";

import React from "react";
import { auth } from "../../../auth";
import { prismadb } from "../../../db/prisma";
import { Item } from "@radix-ui/react-dropdown-menu";
import { round2 } from "../utils";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const calcPrice = (item: any) => {
  const itemPrice = round2(
    item.reduce((acc, item) => {
      if (!item.price || !item.qty) {
        console.error("Invalid item detected:", item);
        return acc;
      }
      return acc + Number(item.price) * item.qty;
    }, 0)
  );

  const shippingPrice = round2(itemPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemPrice);
  const totalPrice = round2(itemPrice + taxPrice + shippingPrice);

  // بررسی مقدار NaN قبل از تبدیل به Decimal
  if ([itemPrice, shippingPrice, taxPrice, totalPrice].some(isNaN)) {
    console.error("❌ Error: Invalid price calculation!", {
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    throw new Error("Invalid price calculation");
  }

  return {
    itemsPrice: new Prisma.Decimal(itemPrice), // ✅ تبدیل به Decimal
    shippingPrice: new Prisma.Decimal(shippingPrice),
    taxPrice: new Prisma.Decimal(taxPrice),
    totalPrice: new Prisma.Decimal(totalPrice),
  };
};

export const AddItemToCart = async (data: any) => {
  try {
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    let cart = await getMyCart();

    const product = await prismadb.product.findFirst({
      where: { id: data.productId },
    });
    if (!product) throw new Error("Product not found!");

    if (cart) {
      const existItem = cart.items.find(
        (item) => item.productId === data.productId
      );

      console.log("existItem:", existItem ? existItem.qty : "Item not found");

      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock!");
        }
      } else {
        if (product.stock < 1) throw new Error("Not enough stock!");
      }

      // ✅ بروزرسانی مقدار آیتم‌ها
      const updatedItems = existItem
        ? cart.items.map((item) =>
            item.productId === data.productId
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...cart.items, data];

      if (!updatedItems || updatedItems.length === 0) {
        throw new Error("Updated items is empty!");
      }
      const updatedPrice = calcPrice(updatedItems);

      // ✅ بروزرسانی سبد خرید
      await prismadb.cart.update({
        where: { id: cart.id },
        data: {
          items: updatedItems, // ❌ JSON.stringify(updatedItems) نزن!
          ...updatedPrice,
        },
      });

      revalidatePath(`/product/${product.slug}`);
    } else {
      // ✅ اگر سبد خرید وجود ندارد، یک سبد جدید بساز
      const newCart = {
        userId: userId,
        items: [data],
        sessionCartId:
          userId || "guest-" + Math.random().toString(36).substring(7),
        ...calcPrice([data]), // ✅ محاسبه قیمت‌ها
      };

      await prismadb.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);
    }

    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    console.error("خطا در افزودن به سبد خرید:", error);
    throw error;
  }
};

export const getMyCart = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("کاربر وارد نشده است.");
    }

    const userId = session.user.id as string;
    const cart = await prismadb.cart.findFirst({
      where: { userId: userId },
    });

    if (!cart) return undefined;

    // ✅ تبدیل Decimal به Number
    return {
      ...cart,
      items: cart.items, // ✅ نیازی به JSON.parse() نیست

      itemsPrice: cart.itemsPrice.toNumber(),
      shippingPrice: cart.shippingPrice.toNumber(),
      taxPrice: cart.taxPrice.toNumber(),
      totalPrice: cart.totalPrice.toNumber(),
    };
  } catch (error) {
    console.error("خطا در گرفتن سبد خرید:", error);
    throw error;
  }
};

export const deleteItem = async (productId) => {
  try {
    const session = await auth();

    const product = await prismadb.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new Error("Product not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found!");

    const exist = cart.items.find((x) => x.productId === productId);
    if (!exist) throw new Error("Item not found");

    let updatedItems;
    if (exist.qty === 1) {
      // ✅ حذف آیتم از سبد خرید
      updatedItems = cart.items.filter(
        (item) => item.productId !== exist.productId
      );
    } else {
      // ✅ کاهش مقدار آیتم
      updatedItems = cart.items.map((item) =>
        item.productId === productId ? { ...item, qty: item.qty - 1 } : item
      );
    }

    // ✅ اگر سبد خرید خالی شد، حذفش کن
    if (updatedItems.length === 0) {
      await prismadb.cart.delete({ where: { id: cart.id } });
      return;
    }

    // ✅ بروزرسانی سبد خرید
    await prismadb.cart.update({
      where: { id: cart.id },
      data: {
        items: updatedItems,
        ...calcPrice(updatedItems),
      },
    });
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed`,
    };
  } catch (error) {
    console.error("Error in deleteItem:", error);
    throw error;
  }
};
