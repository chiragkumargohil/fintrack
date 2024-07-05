import prisma from "@/lib/prisma";
import { TransactionWithCategory } from "@/lib/types";
import {
  formatNumberInIndianStyle,
  formatDate,
  getMonthNameFromNumber,
} from "@/lib/utils";
import { Category, PaymentMode, Transaction } from "@prisma/client";

async function getTransaction(id: number): Promise<{
  data: TransactionWithCategory;
  error?: string;
}> {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        amount: true,
        date: true,
        mode: true,
        location: true,
        payee: true,
        remarks: true,
        categoryId: true,
        category: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!transaction)
      return {
        data: {} as TransactionWithCategory,
        error: "Transaction not found",
      };

    return {
      data: {
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        mode: transaction.mode as PaymentMode,
        location: transaction.location,
        payee: transaction.payee,
        remarks: transaction.remarks,
        categoryId: transaction.categoryId,
        category: transaction.category.name,
        email: transaction.user.email,
      } as TransactionWithCategory,
    };
  } catch (error) {
    console.error(error);
    return { data: {} as TransactionWithCategory, error: error as string };
  }
}

async function createTransaction(data: TransactionWithCategory) {
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

async function updateTransaction(id: number, data: TransactionWithCategory) {
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
        user: {
          email,
        },
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

async function getOverview(email: string) {
  try {
    const currentMonthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const currentMonthEnd = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      1
    );

    const promises: any = [];
    // 0: Total Income
    promises.push(
      prisma.transaction.aggregate({
        where: {
          user: {
            email,
          },
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

    // 1: Total Investment
    promises.push(
      prisma.transaction.aggregate({
        where: {
          user: {
            email,
          },
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

    // 2: Total Expense
    promises.push(
      prisma.transaction.aggregate({
        where: {
          user: {
            email,
          },
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

    // 3: Last 5 Transactions
    promises.push(
      prisma.transaction.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
        where: {
          user: {
            email,
          },
          date: {
            gte: currentMonthStart,
            lte: currentMonthEnd,
          },
        },
        select: {
          amount: true,
          date: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      })
    );

    // 4: Transaction Trend
    promises.push(
      prisma.$queryRaw`
        SELECT 
          EXTRACT(MONTH FROM t.date) AS month,
          SUM(CASE WHEN c.name = 'Investment' THEN t.amount ELSE 0 END) AS investment,
          SUM(CASE WHEN c.name NOT IN ('Investment', 'Income') THEN t.amount ELSE 0 END) AS expense,
          SUM(CASE WHEN c.name = 'Income' THEN t.amount ELSE 0 END) -
          (SUM(CASE WHEN c.name = 'Investment' THEN t.amount ELSE 0 END) +
          SUM(CASE WHEN c.name NOT IN ('Investment', 'Income') THEN t.amount ELSE 0 END)) AS saved
        FROM 
          "Transaction" t
        LEFT JOIN
          "User" u ON t."userId" = u.id
        INNER JOIN 
          "Category" c ON t."categoryId" = c.id
        WHERE
          EXTRACT(YEAR FROM t.date) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND
          u.email = ${email}
        GROUP BY
          EXTRACT(MONTH FROM t.date)
        ORDER BY
          EXTRACT(MONTH FROM t.date);
      `
    );

    const responses = await prisma.$transaction(promises);

    responses[3] = responses[3].map((transaction: any) => {
      return {
        category: transaction?.category?.name,
        date: formatDate(transaction?.date),
        amount: formatNumberInIndianStyle(transaction.amount),
      };
    });

    responses[4] = new Array(12).fill(0).map((_, index) => {
      const month = index;
      const data = responses[4].find((item: any) => item.month == month);
      return {
        name: getMonthNameFromNumber(month),
        Investment: data?.investment || 0,
        Expense: data?.expense || 0,
        Saved: data?.saved > 0 ? data?.saved : 0,
      };
    });

    return {
      totalIncome: formatNumberInIndianStyle(responses[0]._sum.amount),
      totalExpense: formatNumberInIndianStyle(responses[2]._sum.amount),
      totalInvestment: formatNumberInIndianStyle(responses[1]._sum.amount),
      transactions: responses[3],
      transactionTrend: responses[4],
    };
  } catch (error) {
    console.error(error);
    return { error: error as string };
  }
}

const getCategories = async (): Promise<{
  data: Category[];
  error?: string;
}> => {
  try {
    const categories = await prisma.category.findMany();

    const data = (categories || []).map((category) => {
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
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getOverview,
  getCategories,
};
