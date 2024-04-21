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
import { create, fetchCategories } from "./actions";

export default async function NewTransaction() {
  const categories: Category[] = await fetchCategories();

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
