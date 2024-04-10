"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/superbase/server";
import { createUser } from "@/api/user.api";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // const data = await prisma.

  const { data, error } = await supabase.auth.signUp(userData);

  if (error) {
    redirect("/error");
  }

  const user = await createUser({
    email: userData.email,
    password: userData.password,
    provider: "email",
    providerId: data?.user?.id || null,
  } as User);

  if (!user) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
