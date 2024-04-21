import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  try {
    noStore();
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true,
      },
    });

    const data = transactions.map((transaction: any) => {
      return {
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        mode: transaction.mode,
        location: transaction.location,
        payee: transaction.payee,
        remarks: transaction.remarks,
        createdAt: transaction.created_at,
        category: transaction.category?.name,
      } as any;
    });

    return Response.json({ data });
  } catch (error) {
    return Response.error();
  }
}
