import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, UserRound } from "lucide-react";

import React from "react";
import { DarkMode } from "./darkMode";
import { Drawer } from "./drawer";

export const Header = () => {
  return (
    <header className=" flex items-center justify-between  w-full border-b-4 p-[15px]">
      <div className="flex items-center space-x-3">
        <div className="relative w-[50px] h-[40px]">
          <Link href={"/"}>
            <Image
              src={"/asset/store.jpg"}
              className="rounded"
              fill
              alt="Logo"
            />
          </Link>
        </div>
        <p className="hidden sm:block font-bold text-2xl text-[#955656]">
          Store
        </p>
      </div>

      <div className="flex items-center">
        <div className="  items-center hidden md:flex">
          <div className="cursor-pointer">
            <DarkMode />
          </div>
          <Button variant={"ghost"}>
            <Link href={"cart"} className="flex  gap-1">
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <Button>
            <Link href={"/Sign-in"} className="flex gap-1">
              <UserRound /> Sign In
            </Link>
          </Button>
        </div>
        <Drawer />
      </div>
    </header>
  );
};
