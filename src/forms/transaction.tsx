"use client";

import { Button, Form } from "@/components/ui";
import { PAYMENT_MODE } from "@/constants";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransactionSchema, TransactionSchemaType } from "@/lib/schema";
import { toast } from "sonner";
import { Category, PaymentMode, Transaction } from "@prisma/client";
import { TransactionWithCategory } from "@/lib/types";
import FormElement from "@/components/ui/form-element";

export default function TransactionForm({
  transaction,
  categories,
  action,
}: {
  transaction?: Transaction | TransactionWithCategory;
  categories: Category[];
  action: (data: FormData) => Promise<any>;
}) {
  const isUpdate = transaction !== undefined;

  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      categoryId: transaction?.categoryId?.toString() || "",
      title: transaction?.title || "",
      amount: transaction?.amount || "",
      date: transaction?.date
        ? new Date(transaction.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      mode: transaction?.mode || PaymentMode.UPI,
      payee: transaction?.payee || "",
      location: transaction?.location || "",
      remarks: transaction?.remarks || "",
    },
  });

  const handleSubmitForm: SubmitHandler<TransactionSchemaType> = async (
    data
  ) => {
    const formData = new FormData();
    formData.append("categoryId", data.categoryId);
    formData.append("title", data.title as string);
    formData.append("amount", String(data.amount));
    formData.append("date", data.date);
    formData.append("mode", data.mode);
    formData.append("payee", data.payee as string);
    formData.append("location", data.location as string);
    formData.append("remarks", data.remarks as string);
    const response = await action(formData);

    if (!response) {
      return toast.error("Something went wrong");
    }

    if (response?.error) {
      return toast.error(response.error);
    }

    if (isUpdate) {
      toast.success("Transaction updated successfully");
    } else {
      toast.success("Transaction created successfully");
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <FormElement
          elementType="select"
          control={form.control}
          name="categoryId"
          label="Category"
          SelectProps={{
            options: categories.map((category) => ({
              value: category.id?.toString(),
              label: category.name,
            })),
          }}
        />
        <FormElement
          elementType="input"
          control={form.control}
          name="title"
          label="Title"
          InputProps={{ placeholder: "Title" }}
        />
        <FormElement
          elementType="input"
          control={form.control}
          name="amount"
          label="Amount"
          InputProps={{ type: "number", placeholder: "Amount" }}
        />
        <FormElement
          elementType="input"
          control={form.control}
          name="date"
          label="Date"
          InputProps={{ type: "date", placeholder: "Date" }}
        />
        <FormElement
          elementType="select"
          control={form.control}
          name="mode"
          label="Payment mode"
          SelectProps={{
            options: Object.keys(PAYMENT_MODE).map((mode) => ({
              value: mode,
              label: PAYMENT_MODE[mode],
            })),
          }}
        />
        <FormElement
          elementType="input"
          control={form.control}
          name="payee"
          label="Payee / Payer"
          InputProps={{ placeholder: "Payee / Payer (optional)" }}
        />
        <FormElement
          elementType="input"
          control={form.control}
          name="location"
          label="Location"
          InputProps={{ placeholder: "Location (optional)" }}
        />
        <FormElement
          elementType="textarea"
          control={form.control}
          name="remarks"
          label="Remarks"
          TextareaProps={{ placeholder: "Remarks (optional)" }}
        />
        <div className="grid gap-3">
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Loading..."
              : isUpdate
              ? "Update transaction"
              : "Add transaction"}
          </Button>
          <Link href={isUpdate ? "/transactions" : "/"}>
            <Button className="w-full" variant="ghost">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
