"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { TransactionSchema } from "@/lib/schema";
import {
  getCategories,
  getTransaction,
  updateTransaction,
} from "@/api/transaction.api";
import { auth } from "@/lib/auth/auth";
import { Category, PaymentMode, Transaction } from "@prisma/client";
import { TransactionWithCategory } from "@/lib/types";

export async function fetchTransaction(
  transactionId: string
): Promise<TransactionWithCategory> {
  // Get param
  if (!transactionId) {
    console.error("Transaction ID not provided");
    return {} as TransactionWithCategory;
  }
  if (isNaN(Number(transactionId))) {
    console.error("Invalid transaction ID");
    return {} as TransactionWithCategory;
  }

  // Get transaction
  const { data, error } = await getTransaction(Number(transactionId));

  if (error) {
    console.error(error);
    return {} as TransactionWithCategory;
  }

  return data as TransactionWithCategory;
}

export async function update(id: number, formData: FormData) {
  // AUTH: Get user email
  const { user } = (await auth()) || {};
  const email = user?.email;

  if (!email) {
    return { error: "Session not found" };
  }

  // VALIDATE: Validate the form
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

  // UPDATE: Update transaction
  const data = parsedData.data;
  const { error } = await updateTransaction(id, {
    ...data,
    id: id,
    email,
    categoryId: Number(data.categoryId),
    amount: Number(data.amount),
    mode: data.mode as PaymentMode,
  } as TransactionWithCategory);

  // CHECK: Check for Update transaction errors
  if (error) {
    console.log(error);
    return { error: "Error updating transaction" };
  }

  // SUCCESS: Revalidate transactions page
  revalidatePath("/transactions");
  redirect("/transactions");
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await getCategories();

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
