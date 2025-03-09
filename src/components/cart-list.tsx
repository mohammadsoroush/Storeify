import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Price_cart } from "./price-cart";
import { Product } from "@/types";

export const Cart_list = ({ data_list }: { data_list: Product[] }) => {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-[20px_40px]">
        {data_list.map((cart: any, index: number) => (
          <div
            key={index}
            className=" gap-y-4 w-full  flex flex-col justify-start border-[1px] border-[#00000021] p-2 rounded transition
            hover:border-[#6d6575]
            "
          >
            <Link href={`/product/${cart.slug}`}>
              <Image
                src={cart.images[0]}
                alt={cart.name}
                height={400}
                width={200}
                className="object-fill rounded "
              />
            </Link>
            <p className="text-sm ">{cart.brand}</p>
            <p className="text-[15px] ">{cart.name}</p>
            <div className="flex justify-between items-center">
            <p className="text-[15px] font-bold">{Number(cart.rating)} Stars</p>


              {cart.stock > 0 ? (
                <Price_cart price={cart.price}/>
              ) : (
                <p className="text-[13px] text-red-500">Sold Out</p>
              )}
            </div>
          </div> // مقدار باید داخل یک عنصر JSX باشد
        ))}
      </div>
    </>
  );
};
