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
import { getTransaction } from "@/api/transaction.api";

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

export default function TransactionForm({
  id,
  handleSubmit,
}: {
  id?: string;
  handleSubmit: (data: Transaction) => void;
}) {
  const [form, setForm] = useState<Transaction>({
    type: "" as PaymentType,
    title: "",
    amount: 0,
    date: "",
    mode: "" as PaymentMode,
    counterParty: "",
    remarks: "",
  } as Transaction);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit({
      ...form,
      amount: Number(form.amount),
      date: new Date(form.date),
    } as Transaction);
  };

  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        // Fetch transaction
        const response = await getTransaction(id);
        setForm(response);
      };

      fetchTransaction();
    }

    return () => {
      setForm({
        type: "" as PaymentType,
        title: "",
        amount: 0,
        date: "",
        mode: "" as PaymentMode,
        counterParty: "",
        remarks: "",
      } as Transaction);
    };
  }, [id]);

  return (
    <form className="grid gap-6" onSubmit={handleFormSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="type">Transaction type</Label>
        <Select
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, type: value as PaymentType }))
          }
          value={form.type}
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
          value={form.date ? new Date(form.date).toISOString().split("T")[0] : ""}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="mode">Payment method</Label>
        <Select
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, mode: value as PaymentMode }))
          }
          value={form.mode}
        >
          <SelectTrigger id="mode" className="w-full" name="mode">
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
      <Button className="w-full">{id ? "Update" : "Add"} transaction</Button>
    </form>
  );
}
