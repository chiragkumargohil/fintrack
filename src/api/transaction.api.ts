import prisma from "@/lib/prisma";
import { createClient } from "@/lib/superbase/client";
const supabase = createClient();

async function getTransactions(): Promise<Transaction[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: true,
        category: true,
      },
    });

    return transactions.map((transaction) => {
      return {
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
        updatedAt: transaction.updatedAt,
      };
    }) as Transaction[];
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getTransaction(id: number): Promise<Transaction> {
  const transactions = await getTransactions();
  return (
    transactions.find((transaction) => transaction.id === id) ||
    ({} as Transaction)
  );
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

async function updateTransaction(data: Transaction) {
  // update local storage
  const transactions = await getTransactions();
  const index = transactions.findIndex(
    (transaction) => transaction.id === data.id
  );
  transactions[index] = data;

  localStorage.setItem("transactions", JSON.stringify(transactions));
  return data || {};
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

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await supabase.from("Category").select("*");
    const categories = response.data;

    return (categories || []).map((category: any) => {
      return {
        id: category.id,
        name: category.name,
      };
    }) as Category[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  getOverview,
  getCategories,
};
