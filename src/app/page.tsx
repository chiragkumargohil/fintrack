import { getOverview } from "@/api/transaction.api";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import Link from "next/link";
import Overview from "./dashboard/overview";
import Transactions from "./dashboard/transactions";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default async function Dashboard() {
  const { data, error } = await getOverview();

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        "Something went wrong!"
      </div>
    );
  }

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Hey, Chirag!</h2>
            <div className="flex items-center gap-4">
              <Link href="/transactions/new">
                <Button className="flex items-center gap-2">
                  <Plus size={16} strokeWidth={3} />
                  New transaction
                </Button>
              </Link>
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

      <Navbar />
    </>
  );
}
