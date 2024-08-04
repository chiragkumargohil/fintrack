"use client";

import React from "react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import Link from "next/link";
import Overview from "./dashboard/overview";
import { Plus } from "lucide-react";
import Loading from "./loading";
import useLocalSWR from "@/hooks/useLocalSWR";

export default function Dashboard() {
  const { data, isLoading: loading, error } = useLocalSWR("/api/overview");

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        Something went wrong!
      </div>
    );
  }

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Namaste!</h2>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link
                  href="/transactions/create"
                  className="flex items-center gap-2"
                >
                  <Plus size={16} strokeWidth={3} />
                  <span className="hidden md:block">Add transaction</span>
                </Link>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions" disabled>
                Ledger
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview
                data={
                  data as {
                    totalIncome: number;
                    totalExpense: number;
                    totalInvestment: number;
                    grossSavings: number;
                    transactions: any[];
                    transactionTrend: any[];
                  }
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
