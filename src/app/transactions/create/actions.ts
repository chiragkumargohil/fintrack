"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { TransactionSchema } from "@/lib/schema";
import { createTransaction, getCategories } from "@/api/transaction.api";

export async function create(formData: FormData) {
  const email = "cmg.dev.projects@gmail.com";

  // VALIDATE: Validate the form data
  const parsedData = TransactionSchema.safeParse({
    categoryId: formData.get("categoryId") as string,
    title: formData.get("title") as string,
    amount: parseFloat(formData.get("amount") as string),
    date: formData.get("date") as string,
    mode: formData.get("mode") as string,
    payee: formData.get("payee") as string,
    location: formData.get("location") as string,
    remarks: formData.get("remarks") as string,
  });

  // CHECK: Check for parsing errors
  if (!parsedData.success) {
    console.error(parsedData.error);
    return { error: "Invalid form data" };
  }

  // CREATE: Create transaction
  const data = parsedData.data;
  const { error } = await createTransaction({
    ...data,
    email,
    categoryId: Number(data.categoryId),
    amount: Number(data.amount),
    mode: data.mode as PaymentMode,
  });

  // CHECK: Check for create transaction errors
  if (error) {
    console.log(error);
    return { error: "Error creating transaction" };
  }

  // SUCCESS: Revalidate home page and redirect
  revalidatePath("/", "layout");
  redirect("/");
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await getCategories();

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
