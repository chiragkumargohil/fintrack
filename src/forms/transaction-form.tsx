"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { getCategories, getTransaction } from "@/api/transaction.api";
import { PAYMENT_MODE } from "@/constants";
import Link from "next/link";

export default function TransactionForm({
  id,
  handleSubmit,
}: {
  id?: string;
  handleSubmit: (data: FormData) => void;
}) {
  const [form, setForm] = useState<Transaction>({} as Transaction);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        // Fetch transaction
        const response = await getTransaction(Number(id));
        setForm(response);
      };

      fetchTransaction();
    }

    const fetchCategories = async () => {
      // Fetch categories
      const response = await getCategories();
      setCategories(response);
    };

    fetchCategories();

    return () => {
      setForm({} as Transaction);
    };
  }, [id]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryId", String(form.categoryId));
    formData.append("title", form.title || "");
    formData.append("amount", String(form.amount));
    formData.append("date", form.date as string);
    formData.append("mode", form.mode);
    formData.append("payee", form.payee || "");
    formData.append("remarks", form.remarks || "");
    handleSubmit(formData);
  };

  return (
    <form className="grid gap-6" onSubmit={handleFormSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="categoryId">Transaction type</Label>
        <Select
          onValueChange={(value) =>
            setForm((prev) => ({
              ...prev,
              categoryId: Number(value),
            }))
          }
          value={String(form.categoryId)}
        >
          <SelectTrigger id="categoryId" className="w-full" name="categoryId">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          name="title"
          className="w-full"
          placeholder="Enter title (optional)"
          value={form.title || ""}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          name="amount"
          min="0"
          className="w-full"
          placeholder="Enter amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          name="date"
          className="w-full"
          placeholder="Enter date"
          value={
            form.date ? new Date(form.date).toISOString().split("T")[0] : ""
          }
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="mode">Payment method</Label>
        <Select
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, mode: value as PaymentMode }))
          }
          value={form.mode}
          required
        >
          <SelectTrigger id="mode" className="w-full" name="mode">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(PAYMENT_MODE).map((mode) => (
              <SelectItem key={mode} value={mode}>
                {PAYMENT_MODE[mode]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="payee">Counter party name</Label>
        <Input
          id="payee"
          type="text"
          name="payee"
          className="w-full"
          placeholder="Enter counter party name (optional)"
          value={form.payee || ""}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="remarks">Remarks</Label>
        <Textarea
          id="remarks"
          name="remarks"
          className="min-h-32"
          placeholder="Enter remarks (optional)"
          value={form.remarks || ""}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-3">
        <Button className="w-full">{id ? "Update" : "Add"} transaction</Button>
        <Link href="/">
          <Button className="w-full" variant="ghost">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
