import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  
} from "@/components/ui/sheet";
import React from "react";
import { Menu, ShoppingCart, UserRound } from "lucide-react";
import { DarkMode } from "./darkMode";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Drawer = () => {
  return (
    <div className="md:hidden">
      <Sheet >
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col items-start">
          <SheetTitle>Pro-Store Application</SheetTitle>
          <DarkMode />
          <div className="flex justify-evenly w-full ">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};
