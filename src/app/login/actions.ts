"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { LoginSchema } from "@/lib/schema";
import { signIn } from "../../lib/auth/auth";
import { AuthError } from "next-auth";

export async function login(formData: FormData) {
  // VALIDATE: Validate the form data
  const parsedData = LoginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  // CHECK: Check for parsing errors
  if (!parsedData.success) {
    console.error(parsedData.error);
    return { error: "Invalid email or password" };
  }

  // AUTH: Login user
  try {
    const user = await signIn("credentials", formData);
    if (!user) {
      return { error: "Invalid credentials" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Invalid credentials" };
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
