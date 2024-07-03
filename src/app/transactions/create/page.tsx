"use server";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { TransactionForm } from "@/forms";
import Link from "next/link";
import { create, fetchCategories } from "./actions";
import { Category } from "@prisma/client";

export default async function NewTransaction() {
  // Fetch categories from the server
  const categories: Category[] = await fetchCategories();

  return (
    <Card className="max-w-2xl mx-4 md:mx-auto my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add transaction</CardTitle>
        <Button variant="ghost" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <TransactionForm categories={categories} action={create} />
      </CardContent>
    </Card>
  );
}
