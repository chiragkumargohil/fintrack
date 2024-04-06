async function getTransactions(): Promise<Transaction[]> {
  // get from local storage
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
}

async function createTransaction(data: Transaction) {
  // add to local storage
  const transactions = await getTransactions();
  transactions.push(data);

  localStorage.setItem("transactions", JSON.stringify(transactions));
  return data || [];
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

  transactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const lastTransactions = transactions.map((transaction) => {
    return {
      id: transaction.id,
      amount: `₹${transaction.amount}`,
      date: new Date(transaction.date).toDateString(),
      type: transaction.type,
    };
  });

  return {
    totalIncome,
    totalExpense,
    totalInvestment,
    transactions: lastTransactions.slice(0, 5),
  };
}

export { createTransaction, getTransactions, getOverview };
