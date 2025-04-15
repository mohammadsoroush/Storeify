"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/productAction.tsx/user.action";
import Link from "next/link";
import React from "react";
import ReactDOM from "react-dom";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export const SignUpForm = () => {
  const [data, action] = React.useActionState(signUpUser, {
    success: false,
    message: "",
  });
  const SignUpButton = () => {
    const { pending } = ReactDOM.useFormStatus();

    return (
      <Button disabled={pending}>
        {pending ? "Submitting ..." : "sign Up"}
      </Button>
    );
  };
  return (
    <form action={action}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="text" autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          required
          id="password"
          name="password"
          type="password"
          autoComplete="password"
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          required
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="confirmPassword"
        />
      </div>
      <div>
        <SignUpButton />
      </div>
      {data && !data.success && (
        <div className="text-center text-rose-500">salam{data.message}</div>
      )}
      <div className="flex gap-x-4 items-center">
        <p>Already have account?</p>
        <Link
          className="cursor-pointer bg-rose-200 rounded-sm p-[0px_5px]"
          href={"/sign-in"}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};
