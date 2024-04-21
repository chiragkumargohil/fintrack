"use server";

import { deleteTransaction } from "@/api/transaction.api";
import { revalidatePath } from "next/cache";

export const remove = async (id: string) => {
  if (isNaN(Number(id))) {
    console.error("Invalid transaction ID");
    return {} as Transaction;
  }

  const email = "cmg.dev.projects@gmail.com";

  const { error } = await deleteTransaction(Number(id), email);

  if (error) {
    console.error(error);
    return {} as Transaction;
  }

  revalidatePath("/transactions");
};
