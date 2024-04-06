"use client";

import { getOverview } from "@/api/transaction.api";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import Overview from "./dashboard/overview";
import Transactions from "./dashboard/transactions";

export default function Dashboard() {
  const [data, setData] = useState({} as any);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Fetch transactions
      const response = await getOverview();
      setData(response);
    };

    fetchTransactions();

    return () => {
      setData({});
    };
  }, []);

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Hey, Chirag!
            </h2>
            <div className="flex items-center gap-4">
              <Link href="/transactions/new" className="text-sm">
                New transaction
              </Link>
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview data={data} />
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <Transactions />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
