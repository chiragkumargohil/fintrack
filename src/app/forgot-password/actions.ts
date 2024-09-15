"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { ForgotPasswordSchema } from "@/lib/schema";
import { getUserByEmail } from "@/api/user.api";
import { encrypt } from "@/lib/token";
import sendEmail from "@/lib/email";

export async function forgotPassword(formData: FormData) {
  // VALIDATE: Validate the form data
  const parsedData = ForgotPasswordSchema.safeParse({
    email: formData.get("email") as string,
  });

  // VALIDATE: Check for parsing errors
  if (!parsedData.success) {
    console.error(parsedData.error);
    return { error: "Invalid email" };
  }

  try {
    // VALIDATE: Check if user exists
    const user = await getUserByEmail(parsedData.data.email);
    if (!user) {
      return { error: "Invalid credentials" };
    }

    // CREATE: Generate reset token
    const resetToken = await encrypt(
      { email: user.email },
      { expirationTime: "10m" }
    );

    const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // SEND: Send email with reset link
    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      htmlContent: `Click on the link to reset your password: ${url}`,
    });

    return { message: "Email sent with reset link" };
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

  // SUCCESS: Revalidate home page and redirect
  revalidatePath("/", "layout");
  redirect("/");
}
