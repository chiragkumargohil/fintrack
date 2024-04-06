"use client";

import { createTransaction } from "@/api/transaction.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import TransactionForm from "@/forms/transaction-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewTransaction() {
  const router = useRouter();

  const handleSubmit = async (data: Transaction) => {
    const newTransaction = await createTransaction(data);

    if (newTransaction) {
      toast.success("Transaction added successfully");
      router.push("/");
    }
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>New transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm handleSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </>
  );
}
