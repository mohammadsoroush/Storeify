"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/productAction.tsx/user.action";
import Link from "next/link";
import React from "react";
import ReactDOM from "react-dom";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export const CredentialSignInForm = () => {
  const [data, action] = React.useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });
  const SignInButton = () => {
    const { pending } = ReactDOM.useFormStatus();

    return (
      <Button disabled={pending}>
        {pending ? "Signing in ..." : "sign in"}
      </Button>
    );
  };
  return (
    <form action={action}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          required
          id="email"
          name="email"
          type="email"
          autoComplete="email"
        />
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
        <SignInButton />
      </div>
      {data && !data.success && (
        <div className="text-center text-rose-500">salam{data.message}</div>
      )}
      <div className="flex gap-x-4 items-center">
        <p>Dont have account?</p>
        <Link
          className="cursor-pointer bg-rose-200 rounded-sm p-[0px_5px]"
          href={"/sign-up"}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};
