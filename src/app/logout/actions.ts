"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth/auth";

export async function logout(formData: FormData) {
  await signOut();
  // SUCCESS: Redirect to login
  redirect("/login");
}
