"use cliet";
import { useEffect, useState } from "react";
import { getTransactions } from "@/api/transaction.api";
import { DataGrid } from "@/components/ui";

export default function Transactions() {
  const [transactions, setTransactions] = useState([] as any[]);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Fetch transactions
      const response = await getTransactions();
      setTransactions(response);
    };

    fetchTransactions();

    return () => {
      setTransactions([]);
    };
  }, []);

  return (
    <DataGrid
      columns={[
        {
          label: "Title",
          field: "title",
        },
        {
          label: "Type",
          field: "type",
        },
        {
          label: "Date",
          field: "date",
        },
        {
          label: "Amount",
          field: "amount",
          className: "text-right",
        },
      ]}
      rows={transactions || []}
    />
  );
}
