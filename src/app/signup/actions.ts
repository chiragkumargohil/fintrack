"use server";

import { redirect } from "next/navigation";

import { SignupSchema } from "@/lib/schema";
import { createUser, getUserByEmail } from "@/api/user.api";
import { User } from "@prisma/client";

export async function signup(formData: FormData) {
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

  // CHECK: Check for existing user
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    return { error: "User already exists" };
  }

  // CREATE: Create user
  const user = await createUser({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    provider: "email",
  } as User);

  // CHECK: Check for create user errors
  if (!user) {
    return { error: "Error creating user" };
  }

  // SUCCESS: Redirect to login
  redirect("/login");
}
