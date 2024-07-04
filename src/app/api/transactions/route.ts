import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  try {
    noStore();
    const { user } = (await auth()) || {};
    if (!user || !user.email) {
      return Response.error();
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        user: {
          email: user.email,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        date: "desc",
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
