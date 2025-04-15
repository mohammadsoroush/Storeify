import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismadb } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  adapter: PrismaAdapter(prismadb),
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 روز
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("ایمیل و رمز عبور الزامی است.");
        }

        // جستجوی کاربر در پایگاه داده
        const user = await prismadb.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("کاربری با این ایمیل یافت نشد.");
        }

        // بررسی رمز عبور
        const isMatch = compareSync(
          credentials.password as string,
          user.password
        );

        if (!isMatch) {
          throw new Error("رمز عبور اشتباه است.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role ?? "user", // مقدار پیش‌فرض در صورت نبود مقدار
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? "";
        token.role = user.role ?? "user"; // مقدار پیش‌فرض برای role
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }: any) {
      // console.log(token);
      if (token?.id) {
        session.user = {
          id: token.id,
          email: token.email ?? "",
          role: token.role ?? "user",
          name: token.name,
        };
      }
      return session;
    },

    // authorized({ request, auth }: any) {
    //   console.log("Authorized callback executed"); // بررسی اجرای تابع

    //   if (!request.cookies.get("sessionCartId")) {
    //     const sessionCartId = crypto.randomUUID();
    //     console.log("salam")
    //     console.log(sessionCartId);
    //     // const newRequestHeaders = new Headers(request.headers);

    //     // const response = NextResponse.next({
    //     //   request: {
    //     //     headers: newRequestHeaders,
    //     //   },
    //     // });

    //     // response.cookies.set("sessionCartId", sessionCartId);
    //     return true;
    //     // return response;
    //   } else {
    //     return true;
    //   }
    // },
  },
} satisfies NextAuthConfig; // اضافه کردن as any برای جلوگیری از مشکلات تایپ

export const { handlers, auth, signIn, signOut } = NextAuth(config);
