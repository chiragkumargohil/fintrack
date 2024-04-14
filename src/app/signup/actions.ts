"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/superbase/server";
import { SignupSchema } from "@/lib/schema";
import { createUser } from "@/api/user.api";

export async function signup(formData: FormData) {
  const supabase = createClient();

  // VALIDATE: Validate the form data
  const parsedData = SignupSchema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  // CHECK: Check for parsing errors
  if (!parsedData.success) {
    console.error(parsedData.error);
    return { error: "Invalid form data" };
  }

  // AUTH: Sign up user
  const userData = parsedData.data;
  const { data, error } = await supabase.auth.signUp(userData);

  // CHECK: Check for sign up errors
  if (error) {
    console.error(error);
    return { error: "Error signing up" };
  }

  // CREATE: Create user
  const user = await createUser({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    provider: "email",
    providerId: data?.user?.id || null,
  } as User);

  // CHECK: Check for create user errors
  if (!user) {
    console.error("Error creating user");
    return { error: "Error creating user" };
  }

  // SUCCESS: Redirect to login
  redirect("/login");
}
