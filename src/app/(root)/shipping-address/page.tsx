import React from "react";
import { auth } from "../../../../auth";
import { getMyCart } from "@/lib/productAction.tsx/cart.action";
import { redirect } from "next/navigation";
import { ShippingAddress } from "./shippingAddress";
import { getUserById } from "@/lib/productAction.tsx/user.action";

const Shipping_address_page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("no user Id");

  const Shopping_Cart = await getMyCart();
  if (!Shopping_Cart || Shopping_Cart.items.length === 0) redirect("/cart");

  const user = await getUserById(userId);
  console.log("Address:   "+user.address.fullName);

  //console.log("user:  " + user.address.postalCode);

  return (
    <div>
      <ShippingAddress address={user.address} />
    </div>
  );
};

export default Shipping_address_page;
