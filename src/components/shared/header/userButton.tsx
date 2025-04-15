import React from "react";
import { auth, signOut } from "../../../../auth";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/productAction.tsx/user.action";

export const UserButton = async () => {
  const Is_Loged_In = await auth();

  const firstCharacter =
    Is_Loged_In?.user?.name?.charAt(0).toUpperCase() || "U";

  if (Is_Loged_In)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            {firstCharacter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col">
            <div>{Is_Loged_In?.user?.name}</div>
            <div>{Is_Loged_In?.user?.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={signOutUser}>
              <Button className="cursor-pointer" variant={"ghost"}>Sign out </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <Button>
      <Link href={"/sign-in"} className="flex gap-1">
        <UserRound /> Sign In
      </Link>
    </Button>
  );
};
