"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/superbase/server";
import { createTransaction } from "@/api/transaction.api";

export async function create(formData: FormData) {
  const supabase = createClient();
  let { data: userData } = await supabase.auth.getUser();
  const email = userData?.user?.email as string;

  const data = {
    title: formData.get("title") as string,
    amount: Number(formData.get("amount")),
    categoryId: Number(formData.get("categoryId")),
    date: formData.get("date") as string,
    remarks: formData.get("remarks") as string,
    mode: formData.get("mode") as PaymentMode,
    payee: formData.get("payee") as string,
    email,
  } as Transaction;

  const { error } = await createTransaction(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
