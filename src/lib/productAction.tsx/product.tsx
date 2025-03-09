"use server";

import React from "react";
import { prismadb } from "../../../db/prisma";

export const Getproduct = async () => {
  const data = await prismadb.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const getProductBySlug = async (MySlug: string) => {
  return await prismadb.product.findFirst({
    where: { slug: MySlug },
  });
};
