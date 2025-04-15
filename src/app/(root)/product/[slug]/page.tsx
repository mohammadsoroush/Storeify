import { Add_to_cart } from "@/components/add-to-cart";
import { Price_cart } from "@/components/price-cart";
import { Product_image } from "@/components/product-image";
import { getMyCart } from "@/lib/productAction.tsx/cart.action";
import { getProductBySlug } from "@/lib/productAction.tsx/product";
import { notFound } from "next/navigation";
import React from "react";

const DetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params; // Resolve کردن Promise
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const Shopping_cart = await getMyCart();

  return (
    <section className="flex justify-around mt-10">
      {/*imahe*/}
      <div>
        <Product_image Images={product.images} />
      </div>
      <div className=" flex flex-col gap-y-8 border h-fit p-[5px] rounded-[10px] px-[8px] ">
        <p>
          {product.brand}
          {product.category}
        </p>
        <p className="font-bold text-[20px]">{product.name}</p>
        <p>
          {product.rating.toNumber()} of {product.numReviews} Reviews
        </p>

        <div className="px-4 py-2 bg-green-200 text-green-600 w-fit rounded-full">
          <Price_cart price={product.price.toNumber()} />
        </div>
        <div>
          <p className=" font-semibold">Description</p>
          <p className="">{product.description}</p>
        </div>
      </div>

      <div className="shadow-2xl flex flex-col border-1 px-[15px] rounded-[10px] h-fit gap-y-12">
        <div className="flex justify-between gap-x-8">
          <p>Price</p>
          <div>
            <Price_cart price={product.price.toNumber()} />
          </div>
        </div>

        <div className="flex justify-between items-center gap-x-8 ">
          <div className="text-[14px]">Status</div>
          <div>
            {product.stock ? (
              <p className=" text-green-400 bg-green-100 rounded-full px-[10px]">
                In Stock
              </p>
            ) : (
              <p className=" text-red-700 bg-red-100 rounded-full px-[10px]">
                Out of Stock
              </p>
            )}
          </div>
        </div>

        {product.stock > 0 && (
          <div>
            <Add_to_cart
              Shopping_cart={Shopping_cart}
              item={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price.toString(),
                qty: 1,
                image: product.images![0],
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailPage;
