"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { PAYMENT_MODE } from "@/constants";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransactionSchema, TransactionSchemaType } from "@/lib/schema";
import { toast } from "sonner";

export default function TransactionForm({
  transaction,
  categories,
  action,
}: {
  transaction?: Transaction;
  categories: Category[];
  action: (data: FormData) => Promise<any>;
}) {
  const isUpdate = transaction !== undefined;

  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      mode: "UPI" as PaymentMode,
      payee: "",
      location: "",
      remarks: "",
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
    if (response?.error) {
      return toast.error(response.error);
    }

    if (isUpdate) {
      toast.success("Transaction updated successfully");
    } else {
      toast.success("Transaction created successfully");
    }
  };

  useEffect(() => {
    if (isUpdate) {
      const data: any = { ...transaction };
      if (data?.date) {
        data.date = new Date(data.date).toISOString().split("T")[0];
      }
      form.reset(data);
    }
  }, [transaction]);

  return (
    <Form {...form}>
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger
                        id="categoryId"
                        className="w-full"
                        name={field.name}
                      >
                        <SelectValue
                          id="categoryId"
                          placeholder="Select category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(categories || []).map((category) => (
                        <SelectItem
                          key={String(category.id)}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
        </div>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Payment mode</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger id="mode" className="w-full" {...field}>
                      <SelectValue
                        placeholder="Select payment method"
                        {...field}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(PAYMENT_MODE).map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {PAYMENT_MODE[mode]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Payee</FormLabel>
                <FormControl>
                  <Input placeholder="Payee (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea placeholder="Remarks (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
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
          <Link href="/">
            <Button className="w-full" variant="ghost">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
