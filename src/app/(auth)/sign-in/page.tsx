import React from "react";
import { CredentialSignInForm } from "./credentialSignInForm";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await auth();
  console.log("Session :", session); // لاگ مقدار session

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <CredentialSignInForm />
    </div>
  );
};

export default page;
