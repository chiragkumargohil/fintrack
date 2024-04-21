import prisma from "@/lib/prisma";
import { createClient } from "@/lib/superbase/client";
const supabase = createClient();

async function getTransactions(email: string): Promise<Transaction[]> {
  try {
    if (!email) return [];
    const response = await supabase
      .from("Transaction")
      .select("*,Category(*),User(*)")
      .order("date", { ascending: false });

    if (response.error) {
      console.error(response.error);
      return [];
    }
    const transactions = response.data;

    return transactions.map((transaction: any) => {
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
        category: transaction.Category.name,
      } as any;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getTransaction(
  id: number
): Promise<{ data: Transaction; error?: string }> {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        user: true,
      },
    });

    if (!transaction)
      return { data: {} as Transaction, error: "Transaction not found" };

    return {
      data: {
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        mode: transaction.mode,
        location: transaction.location,
        payee: transaction.payee,
        remarks: transaction.remarks,
        categoryId: transaction.categoryId,
        category: transaction.category.name,
        email: transaction.user.email,
      } as Transaction,
    };
  } catch (error) {
    console.error(error);
    return { data: {} as Transaction, error: error as string };
  }
}

async function createTransaction(data: Transaction) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        title: data.title,
        amount: data.amount,
        date: new Date(data.date),
        mode: data.mode,
        location: data.location,
        payee: data.payee,
        remarks: data.remarks,
        user: {
          connect: {
            email: data.email,
          },
        },
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
    });

    return {
      data: {
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        categoryId: transaction.categoryId,
        mode: transaction.mode,
        location: transaction.location,
        payee: transaction.payee,
        remarks: transaction.remarks,
        createdAt: transaction.createdAt,
      } as Transaction,
    };
  } catch (error) {
    return { error: error as string };
  }
}

async function updateTransaction(id: number, data: Transaction) {
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: id,
        user: {
          email: data.email,
        },
      },
      data: {
        title: data.title,
        amount: data.amount,
        date: new Date(data.date),
        mode: data.mode,
        location: data.location,
        payee: data.payee,
        remarks: data.remarks,
        categoryId: Number(data.categoryId),
      },
    });

    return {
      data: {
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        categoryId: transaction.categoryId,
        mode: transaction.mode,
        location: transaction.location,
        payee: transaction.payee,
        remarks: transaction.remarks,
        createdAt: transaction.createdAt,
      } as Transaction,
    };
  } catch (error) {
    return { error: error as string };
  }
}

async function deleteTransaction(id: number, email: string) {
  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id,
        // user: {
        //   email,
        // },
      },
    });

    return {
      data: {
        id: transaction.id,
      } as Transaction,
    };
  } catch (error) {
    return { error: error as string };
  }
}

async function getOverview() {
  try {
    const currentMonthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const currentMonthEnd = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    const promises: any = [];
    promises.push(
      prisma.transaction.aggregate({
        where: {
          date: {
            gte: currentMonthStart,
            lte: currentMonthEnd,
          },
          amount: {
            gt: 0,
          },
          category: {
            name: {
              in: ["Income"],
            },
          },
        },
        _sum: {
          amount: true,
        },
      })
    );

    promises.push(
      prisma.transaction.aggregate({
        where: {
          date: {
            gte: currentMonthStart,
            lte: currentMonthEnd,
          },
          amount: {
            gt: 0,
          },
          category: {
            name: {
              in: ["Investment"],
            },
          },
        },
        _sum: {
          amount: true,
        },
      })
    );

    promises.push(
      prisma.transaction.aggregate({
        where: {
          date: {
            gte: currentMonthStart,
            lte: currentMonthEnd,
          },
          amount: {
            gt: 0,
          },
          category: {
            name: {
              notIn: ["Investment", "Income"],
            },
          },
        },
        _sum: {
          amount: true,
        },
      })
    );

    promises.push(
      prisma.transaction.findMany({
        where: {
          date: {
            gte: currentMonthStart,
            lte: currentMonthEnd,
          },
        },
        include: {
          category: true,
        },
      })
    );

    const responses = await prisma.$transaction(promises);

    return {
      data: {
        totalIncome: responses[0]._sum.amount || 0,
        totalExpense: responses[2]._sum.amount || 0,
        totalInvestment: responses[1]._sum.amount || 0,
        transactions: [],
        transactionTrend: [],
      },
    };
  } catch (error) {
    return { error: error as string };
  }
}

const getCategories = async (): Promise<{
  data: Category[];
  error?: string;
}> => {
  try {
    const categories = await prisma.category.findMany();

    const data = (categories || []).map((category: any) => {
      return {
        id: category.id,
        name: category.name,
      };
    }) as Category[];

    return { data };
  } catch (error) {
    console.error(error);
    return { error: error as string, data: [] };
  }
};

export {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getOverview,
  getCategories,
};
