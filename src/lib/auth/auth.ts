import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/api/user.api";
import { comparePassword } from "../utils";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getUserByEmail(email);
        if (!user) return null;

        if (!user.password) return null;

        const passwordsMatch = await comparePassword(
          password,
          user.password as string
        );
        if (passwordsMatch) {
          return { ...user, password: undefined };
        }

        return null;
      },
    }),
  ],
});
