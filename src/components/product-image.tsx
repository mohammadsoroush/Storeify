"use client";
import Image from "next/image";
import React from "react";

export const Product_image = ({ Images }: { Images: string[] }) => {
  const [currentImage, setcurrentImage] = React.useState<number>(0);
  return (
    <div className="flex flex-col gap-y-2 items-center ">
      <div className=" rounded-xl overflow-hidden">
        <Image
          src={Images[currentImage]}
          alt="Image Cart"
          width={400}
          height={450}
          className="rounded-2xl transition-all cursor-pointer hover:scale-109"
        />
      </div>
      <div className="flex gap-x-2">
        {Images.map((img, index) => (
          <Image
            key={index} // ✅ اینجا یک key یکتا اضافه شد
            onClick={() => setcurrentImage(index)}
            src={img}
            alt="image"
            width={100}
            height={100}
            className={`rounded cursor-pointer hover:border-4 hover:border-amber-400 ${
              currentImage === index ? "border-2 border-red-800" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};
