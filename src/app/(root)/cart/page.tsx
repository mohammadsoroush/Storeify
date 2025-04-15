import React from "react";
import { Cart_table } from "./cart-table";
import { getMyCart } from "@/lib/productAction.tsx/cart.action";

export const metadata = {
  title: "shopping cart",
};
const Cartpage = async () => {
  const shopping_cart = await getMyCart();
  return (
    <div>
      <Cart_table shopping_cart={shopping_cart}/>{" "}
    </div>
  );
};

export default Cartpage;
