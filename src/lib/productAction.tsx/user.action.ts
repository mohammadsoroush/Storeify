"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth, signIn, signOut } from "../../../auth";
import { signInFormSchema, signUpFormSchema } from "../validator";
import { z } from "zod";
import { prismadb } from "../../../db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { Prisma } from "@prisma/client";

export const signInWithCredentials = async (
  prevState: unknown,
  formdata: FormData
) => {
  try {
    const user = signInFormSchema.parse({
      email: formdata.get("email"),
      password: formdata.get("password"),
    });
    await signIn("credentials", user);
    return { success: true, message: "signed in completed!" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message }; // پیام دقیق خطا
    }

    return { success: false, message: "invalid email or password" };
  }
};

export const signOutUser = async () => {
  await signOut();
};

export const signUpUser = async (prevState: unknown, formdata: FormData) => {
  try {
    const user = signUpFormSchema.parse({
      name: formdata.get("name"),
      email: formdata.get("email"),
      password: formdata.get("password"),
      confirmPassword: formdata.get("confirmPassword"),
    });

    const plainpassWord = user.password;
    user.password = hashSync(user.password, 10);
    await prismadb.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainpassWord,
    });

    return { success: true, message: "user registered successfully" };
  } catch (error) {
    // console.log("name"+error.name)
    // console.log("code"+error.code)
    // console.log("errors"+error.errors)
    // console.log("meta"+error.meta?.target)
    if (isRedirectError(error)) {
      throw error;
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      if (error.meta?.target?.includes("email")) {
        return { success: false, message: "این ایمیل قبلاً ثبت شده است" };
      }
    }

    if (error instanceof z.ZodError) {
      console.log("Validation Errors:", error.errors);

      return {
        success: false,
        message: error.errors.map((err) => err.message).join(", "),
      };
    }

    return { success: false, message: "user was not registered! " };
  }
};

export const getUserById = async (userId: string) => {
  const user = await prismadb.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("user not found!");

  return user;
};

export const updateUserAddress = async (adress: any) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("no user Id");

    const currentUser = await prismadb.user.findFirst({
      where: { id: userId },
    });

    if (!currentUser) throw new Error("user not found!");

    await prismadb.user.update({
      where: { id: currentUser.id },
      data: { address: adress },
    });

    return {
      success: true,
      message: "user updated",
    };
  } catch (error) {
    return { success: false, message: "not Seccessful" };
  }
};
