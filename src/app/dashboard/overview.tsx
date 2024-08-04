"use client";

import React from "react";
import { StackedBarChart } from "@/components/charts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataGrid,
} from "@/components/ui";

const OverviewCard = ({
  title,
  value,
  icon,
  helpText,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  helpText?: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {helpText ? (
          <p className="text-xs text-muted-foreground">{helpText}</p>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default function Overview({
  data,
}: {
  data: {
    totalIncome: number;
    totalExpense: number;
    totalInvestment: number;
    grossSavings: number;
    transactions: any[];
    transactionTrend: any[];
  };
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Gross savings"
          value={`₹${data.grossSavings || 0}`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        />
        <OverviewCard
          title="Total income"
          value={`₹${data.totalIncome || 0}`}
          icon={<span className="text-sm text-muted-foreground">₹</span>}
        />
        <OverviewCard
          title="Total investment"
          value={`₹${data.totalInvestment || 0}`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          }
        />
        <OverviewCard
          title="Total expense"
          value={`₹${data.totalExpense || 0}`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
      </div>
      <div className="grid gap-4 grid-cols-12 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full md:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <StackedBarChart
              data={data.transactionTrend || []}
              categories={["Expense", "Investment", "Saved"]}
              colors={["#8884d8", "#82ca9d", "#ffc658"]}
            />
          </CardContent>
        </Card>
        <Card className="col-span-full md:col-span-3">
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <DataGrid
              columns={[
                {
                  label: "Category",
                  field: "category",
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
              rows={data.transactions || []}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
