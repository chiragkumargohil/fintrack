"use server";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import TransactionForm from "@/forms/transaction-form";
import Link from "next/link";
import { create } from "./actions";
import { getCategories } from "@/api/transaction.api";

export default async function NewTransaction() {
  const categories = await getCategories();

  return (
    <Card className="max-w-2xl mx-4 md:mx-auto my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>New transaction</CardTitle>
        <Link href="/">
          <Button className="w-full" variant="ghost">
            Cancel
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <TransactionForm categories={categories} action={create} />
      </CardContent>
    </Card>
  );
}
