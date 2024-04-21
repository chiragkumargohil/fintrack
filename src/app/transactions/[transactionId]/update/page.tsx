import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import TransactionForm from "@/forms/transaction-form";
import { fetchCategories, fetchTransaction, update } from "./actions";

export default async function UpdateTransaction({
  params,
}: {
  params: { transactionId: string };
}) {
  const [categories, transaction] = await Promise.all([
    fetchCategories(),
    fetchTransaction(params.transactionId as string),
  ]);

  return (
    <>
      <Card className="max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>Update transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm
            transaction={transaction}
            categories={categories}
            action={async (data) => {
              "use server";
              await update(Number(params.transactionId) as number, data);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
