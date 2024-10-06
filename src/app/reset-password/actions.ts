"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { ResetPasswordSchema } from "@/lib/schema";
import { getUserByEmail, updatePassword } from "@/api/user.api";
import { decrypt } from "@/lib/token";

// check if the token is valid
export async function validate(token: string) {
  try {
    // VALIDATE: Validate the token
    const decodedToken = await decrypt(token);
    const email = decodedToken.payload.email as string;

    // VALIDATE: Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return { error: "Invalid credentials" };
    }

    return { message: "Token is valid" };
  } catch (error) {
    return { error: "Invalid token" };
  }
}

export async function resetPassword(token: string, formData: FormData) {
  try {
    // VALIDATE: Validate the form data
    const parsedData = ResetPasswordSchema.safeParse({
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    });

    // VALIDATE: Check for parsing errors
    if (!parsedData.success) {
      console.error(parsedData.error);
      return { error: "Invalid password" };
    }

    if (parsedData.data.password !== parsedData.data.confirmPassword) {
      return { error: "Passwords do not match" };
    }

    // DECRYPT: Decrypt token
    const decodedToken = await decrypt(token);
    const email = decodedToken.payload.email as string;

    // VALIDATE: Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return { error: "Invalid credentials" };
    }

    // UPDATE: Update password
    await updatePassword(user.email, parsedData.data.password);

    return { message: "Password updated successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    if (typeof error === "string" && !error.includes("NEXT_REDIRECT")) {
      return { error: "Something went wrong" };
    }
  }

  redirect("/login");
}
