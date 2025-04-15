"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AddItemToCart, deleteItem } from "@/lib/productAction.tsx/cart.action";
import { LoaderCircle, Minus, Plus } from "lucide-react";

export const Cart_table = ({ shopping_cart }: { shopping_cart: any }) => {
  const Router = useRouter();
  const [pending, startTransition] = React.useTransition();

  if (!shopping_cart || shopping_cart.items.length === 0) {
    return (
      <div>
        <h1 className="py-4  font-bold">Shopping cart</h1>
        <h3>Your Shopping cart is empty!</h3>
        <Link href={"/"} className="rounded-full border border-amber-300 px-2">
          Go shopping
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-evenly mt-[50px]">
        <div className=" grow-[0.5]">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>item</TableHead>
                <TableHead className="text-center">quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shopping_cart.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link
                      href={`product/${item.slug}`}
                      className="flex items-center gap-x-1"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <span className="text-[16px]">{item.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="justify-center gap-x-2.5 flex items-center">
                    <Button
                      className="cursor-pointer"
                      disabled={pending}
                      variant={"outline"}
                      type="button"
                      onClick={() =>
                        startTransition(async () => {
                          const response = await deleteItem(item.productId);

                          if (!response?.success) {
                            toast("Done!", {
                              description: response?.message,
                            });
                          }
                        })
                      }
                    >
                      {pending ? (
                        <LoaderCircle className="h-3 w-3 animate-spin" />
                      ) : (
                        <Minus className="w-3 h-3" />
                      )}{" "}
                    </Button>

                    <span>{item.qty}</span>

                    <Button
                      className="cursor-pointer"
                      disabled={pending}
                      variant={"outline"}
                      type="button"
                      onClick={() =>
                        startTransition(async () => {
                          const response = await AddItemToCart(item);

                          if (!response?.success) {
                            toast("Done!", {
                              description: response?.message,
                            });
                          }
                        })
                      }
                    >
                      {pending ? (
                        <LoaderCircle className="h-3 w-3 animate-spin" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}{" "}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-5">
            <p>
              {" "}
              subTotal:{" "}
              {shopping_cart.items.reduce(
                (accumulator, item) => accumulator + item.qty,
                0
              )}
            </p>
            <p> total Price : {shopping_cart.itemsPrice}</p>
          </div>
          <Button
          className="cursor-pointer"
            onClick={() =>
              startTransition(() => {
                Router.push("/shipping-address");
              })
            }
            disabled={pending} // غیرفعال کردن دکمه در حالت pending
          >
            {pending ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              "Proceed to Purchase"
            )}
          </Button>
        </div>
      </div>
    );
  }
};
