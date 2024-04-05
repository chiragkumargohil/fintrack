async function getTransactions(): Promise<any[]> {
  // get from local storage
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
}

async function createTransaction(data: any) {
  // add to local storage
  const transactions = await getTransactions();
  transactions.push(data);

  localStorage.setItem("transactions", JSON.stringify(transactions));
  return data || [];
}

async function getOverview() {
  const transactions = await getTransactions();
  const income = transactions.filter((transaction) => transaction.type === "INCOME");
  const expense = transactions.filter((transaction) => transaction.type === "EXPENSE");
  const investment = transactions.filter((transaction) => transaction.type === "INVESTMENT");
  const totalIncome = income.reduce((acc, transaction) => acc + Number(transaction.amount), 0);
  const totalExpense = expense.reduce((acc, transaction) => acc + Number(transaction.amount), 0);
  const totalInvestment = investment.reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  return {
    totalIncome,
    totalExpense,
    totalInvestment,
    transactions,
  };
}

export { createTransaction, getTransactions, getOverview };
