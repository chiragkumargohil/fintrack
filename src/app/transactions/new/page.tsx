"use client";
import { createTransaction } from "@/api/transaction.api";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { value: "UPI", label: "UPI" },
  { value: "CASH", label: "Cash" },
  { value: "DEBIT_CARD", label: "Debit card" },
  { value: "CREDIT_CARD", label: "Credit card" },
  { value: "NET_BANKING", label: "Net banking" },
  { value: "OTHERS", label: "Others" },
];

const TRANSACTION_TYPES = [
  { value: "INCOME", label: "Income" },
  { value: "EXPENSE", label: "Expense" },
  { value: "INVESTMENT", label: "Investment" },
];

export default function NewTransaction() {
  const router = useRouter();

  const [form, setForm] = useState({} as Transaction);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction = await createTransaction({
      ...form,
      amount: Number(form.amount),
      date: new Date(form.date),
    });

    if (newTransaction) {
      toast.success("Transaction added successfully");
      setForm({} as Transaction);
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
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-3">
              <Label htmlFor="type">Transaction type</Label>
              <Select
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, type: value as PaymentType }))
                }
              >
                <SelectTrigger id="type" className="w-full" name="type">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  {TRANSACTION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
                value={form.title}
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
                value={form.date as string}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="paymentMethod">Payment method</Label>
              <Select
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, paymentMethod: value }))
                }
              >
                <SelectTrigger
                  id="paymentMethod"
                  className="w-full"
                  name="paymentMethod"
                >
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="counterParty">Counter party name</Label>
              <Input
                id="counterParty"
                type="text"
                name="counterParty"
                className="w-full"
                placeholder="Enter counter party name (optional)"
                value={form.counterParty}
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
                value={form.remarks}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full">Add transaction</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
