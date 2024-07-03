"use server";

import { deleteTransaction } from "@/api/transaction.api";
import { auth } from "@/lib/auth/auth";
import { Transaction } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const remove = async (id: string) => {
  if (isNaN(Number(id))) {
    console.error("Invalid transaction ID");
    return {} as Transaction;
  }
  const { user } = (await auth()) || {};
  const email = user?.email;

  if (!email) {
    return { error: "Session not found" };
  }

  const { error } = await deleteTransaction(Number(id), email);

  if (error) {
    console.error(error);
    return {} as Transaction;
  }

  revalidatePath("/transactions");
};
