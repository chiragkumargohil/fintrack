"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/superbase/server";
import { LoginSchema } from "@/lib/schema";

export async function login(formData: FormData) {
  const supabase = createClient();

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
  const { error } = await supabase.auth.signInWithPassword(parsedData.data);

  // CHECK: Check for login errors
  if (error) {
    console.error("error superbase login: ", error);
    return { error: "Invalid email or password" };
  }

  // SUCCESS: Revalidate home page and redirect
  revalidatePath("/", "layout");
  redirect("/");
}
