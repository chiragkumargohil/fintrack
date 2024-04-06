import { formatNumberInIndianStyle, getMonthName } from "@/lib/utils";

function formatData(jsonData: string) {
  const data = JSON.parse(jsonData);

  // Initialize an object to store data for each month
  const monthlyData: Record<string, any> = {};

  // Loop through each transaction
  data.forEach((transaction: Transaction) => {
    const month = getMonthName(transaction.date as string);

    // If the month entry doesn't exist, create it
    if (!monthlyData[month]) {
      monthlyData[month] = {
        name: month,
        saved: 0,
        expense: 0,
        investment: 0,
      };
    }

    // Categorize the transaction based on type
    if (transaction.type === "INCOME") {
      monthlyData[month].saved += transaction.amount;
    } else if (transaction.type === "EXPENSE") {
      monthlyData[month].expense += transaction.amount;
    } else if (transaction.type === "INVESTMENT") {
      monthlyData[month].investment += transaction.amount;
    }
  });

  // Calculate saved amount for each month
  for (const month in monthlyData) {
    monthlyData[month].saved -=
      monthlyData[month].expense + monthlyData[month].investment;
  }

  // Convert monthlyData object to array
  const formattedData = Object.values(monthlyData);

  const myData = [];

  // add missing months
  for (let i = 0; i < 11; i++) {
    const month = getMonthName(new Date(new Date().setMonth(i)).toDateString());
    if (!formattedData.find((data) => data.name === month)) {
      myData.push({
        name: month,
        saved: 0,
        expense: 0,
        investment: 0,
      });
    } else {
      myData.push(formattedData.find((data) => data.name === month));
    }
  }

  return myData;
}

async function getTransactions(): Promise<Transaction[]> {
  // get from local storage
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
}

async function getTransaction(id: string): Promise<Transaction> {
  const transactions = await getTransactions();
  return (
    transactions.find((transaction) => transaction.id === id) ||
    ({} as Transaction)
  );
}

async function createTransaction(data: Transaction) {
  // add to local storage
  const transactions = await getTransactions();
  data.id = new Date().getTime().toString();
  transactions.push(data);

  localStorage.setItem("transactions", JSON.stringify(transactions));
  return data || [];
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
  const transactions = await getTransactions();
  const income = transactions.filter(
    (transaction) => transaction.type === "INCOME"
  );
  const expense = transactions.filter(
    (transaction) => transaction.type === "EXPENSE"
  );
  const investment = transactions.filter(
    (transaction) => transaction.type === "INVESTMENT"
  );
  const totalIncome = income.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );
  const totalExpense = expense.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );
  const totalInvestment = investment.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

  const transactionTrend = formatData(JSON.stringify(transactions));

  transactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const lastTransactions = transactions.map((transaction) => {
    return {
      id: transaction.id,
      amount: `₹${formatNumberInIndianStyle(transaction.amount)}`,
      date: new Date(transaction.date).toDateString(),
      type: transaction.type,
    };
  });

  return {
    totalIncome: formatNumberInIndianStyle(totalIncome),
    totalExpense: formatNumberInIndianStyle(totalExpense),
    totalInvestment: formatNumberInIndianStyle(totalInvestment),
    transactions: lastTransactions.slice(0, 5),
    transactionTrend,
  };
}

export {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  getOverview,
};
