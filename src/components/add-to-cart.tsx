"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { AddItemToCart, deleteItem } from "@/lib/productAction.tsx/cart.action";
import { useRouter } from "next/navigation";
import {
  BadgeMinusIcon,
  BadgePlusIcon,
  LoaderCircle,
  Minus,
  Plus,
} from "lucide-react";

export const Add_to_cart = ({
  Shopping_cart,
  item,
}: {
  Shopping_cart: any;
  item: any;
}) => {
  const [isPending, startTransition] = React.useTransition();

  const Router = useRouter();
  const handleclick = async () => {
    startTransition(async () => {
      const response = await AddItemToCart(item);
      if (!response.success) {
        toast("Event has been created", {
          description: response.message,
        });

        return;
      }

      toast("Event has been created", {
        description: `${item.name} added `,
        action: {
          label: "Go to cart",
          onClick: () => Router.push("/cart"),
        },
      });
    });
  };

  const handleRemoveItem = async () => {
    startTransition(async () => {
      const res = await deleteItem(item.productId);
      toast("Event has been created", {
        description: res?.message,
      });
      return;
    });
  };

  const existItem =
    Shopping_cart &&
    Shopping_cart.items.find(
      (existItem: any) => existItem.productId === item.productId
    );

  if (existItem) {
    return (
      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant={"outline"}
          onClick={handleRemoveItem}
          className="cursor-pointer"
        >
          {isPending ? (
            <LoaderCircle className="h-3 w-3 animate-spin" />
          ) : (
            <Minus className="w-3 h-3" />
          )}
        </Button>
        <span>{existItem.qty}</span>
        <Button
          type="button"
          variant={"outline"}
          onClick={handleclick}
          className="cursor-pointer"
        >
          {isPending ? (
            <LoaderCircle className="h-3 w-3 animate-spin" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
        </Button>
      </div>
    );
  } else {
    return (
      <div >
        <Button className="w-full cursor-pointer" type="button" onClick={handleclick}>
          Add to cart
        </Button>
      </div>
    );
  }
};
