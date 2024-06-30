import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { TransactionForm } from "@/forms";
import { fetchCategories, fetchTransaction, update } from "./actions";
import Link from "next/link";

export default async function UpdateTransaction({
  params,
}: {
  params: { transactionId: string };
}) {
  const [categories, transaction] = await Promise.all([
    fetchCategories(),
    fetchTransaction(params.transactionId as string),
  ]);

  const updateTransaction = update.bind(
    null,
    Number(params.transactionId) as number
  );

  return (
    <>
      <Card className="max-w-2xl mx-auto my-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Update transaction</CardTitle>
          <Button variant="ghost" asChild>
            <Link href="/transactions">Cancel</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <TransactionForm
            transaction={transaction}
            categories={categories}
            action={updateTransaction}
          />
        </CardContent>
      </Card>
    </>
  );
}
