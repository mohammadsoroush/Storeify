"use server";

import React from "react";
import { prismadb } from "../../../db/prisma";

import { cache } from "react";

export const Getproduct = cache(async () => {
  return await prismadb.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });
});

// export const Getproduct = async () => {
//   const data = await prismadb.product.findMany({
//     take: 5,
//     orderBy: { createdAt: "desc" },
//   });
//   return data;
// };

export const getProductBySlug = async (MySlug: string) => {
  return await prismadb.product.findFirst({
    where: { slug: MySlug },
  });
};
