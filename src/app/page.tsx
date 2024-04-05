"use client";

import { getOverview } from "@/api/transaction.api";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataGrid,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import Link from "next/link";
import { useEffect, useState } from "react";

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
              Greetings, Chirag!
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <OverviewCard
                  title="Total income"
                  value={data.totalIncome || "₹0"}
                  icon={
                    <span className="text-sm text-muted-foreground">₹</span>
                  }
                />
                <OverviewCard
                  title="Total expense"
                  value={data.totalExpense || "₹0"}
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
                <OverviewCard
                  title="Total investment"
                  value={data.totalInvestment || "₹0"}
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
                  helpText="+19% from last month"
                />
                <OverviewCard
                  title="Expense"
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
                  value="24%"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {/* <Overview /> */}
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataGrid
                      columns={[
                        { label: "Customer", field: "customer", className: "" },
                        {
                          label: "Type",
                          field: "type",
                          className: "hidden xl:table-column",
                        },
                        {
                          label: "Status",
                          field: "status",
                          className: "hidden xl:table-column",
                        },
                        {
                          label: "Date",
                          field: "date",
                          className: "hidden xl:table-column",
                        },
                        {
                          label: "Amount",
                          field: "amount",
                          className: "text-right",
                        },
                      ]}
                      rows={[
                        {
                          customer: "Liam Johnson",
                          type: "Sale",
                          status: "Approved",
                          date: "2023-06-23",
                          amount: "$250.00",
                        },
                        {
                          customer: "Olivia Smith",
                          type: "Refund",
                          status: "Declined",
                          date: "2023-06-24",
                          amount: "$150.00",
                        },
                        {
                          customer: "Noah Williams",
                          type: "Subscription",
                          status: "Approved",
                          date: "2023-06-25",
                          amount: "$350.00",
                        },
                        {
                          customer: "Emma Brown",
                          type: "Sale",
                          status: "Approved",
                          date: "2023-06-26",
                          amount: "$450.00",
                        },
                        {
                          customer: "Liam Johnson",
                          type: "Sale",
                          status: "Approved",
                          date: "2023-06-27",
                          amount: "$550.00",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
