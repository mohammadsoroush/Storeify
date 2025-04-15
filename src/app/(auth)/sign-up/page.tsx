import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { SignUpForm } from "./sign-up-form";
const page = async () => {
  const session = await auth();
  console.log("Session :", session); // لاگ مقدار session

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default page;
