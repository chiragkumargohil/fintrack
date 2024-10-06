import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const whitelist = new Set([
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
      ]);

      const isOnMainPage =
        nextUrl.pathname.startsWith("/") && !whitelist.has(nextUrl.pathname);
      if (isOnMainPage) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
