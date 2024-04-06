"use client";

import { updateTransaction } from "@/api/transaction.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import TransactionForm from "@/forms/transaction-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditTransaction() {
  const router = useRouter();
  const { transactionId } = useParams();

  const handleSubmit = async (data: Transaction) => {
    const updatedTransaction = await updateTransaction(data);

    if (updatedTransaction) {
      toast.success("Transaction updated successfully");
      router.push("/");
    }
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>Update transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm
            id={transactionId as string}
            handleSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </>
  );
}
