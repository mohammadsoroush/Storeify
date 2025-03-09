import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import sampleData from "../../../db/sample-data";
import { Cart_list } from "@/components/cart-list";
import { Getproduct } from "@/lib/productAction.tsx/product";
// const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  // await delay(1000);
  //console.log(sampleData)
  const data = await Getproduct();

  const formattedData = data.map((product) => ({
  ...product,
  price: Number(product.price).toFixed(2), // 👈 تبدیل به string
  rating: Number(product.rating),
}));

  
  return (
    <div>
      <Cart_list data_list={formattedData} />
    </div>
  );
}
