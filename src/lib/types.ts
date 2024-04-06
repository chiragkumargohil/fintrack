interface Transaction {
  id: string;
  title: string;
  remarks: string;
  amount: number;
  date: Date | string;
  counterParty: string;
  type: PaymentType;
  mode: PaymentMode;
}

enum PaymentType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  INVESTMENT = "INVESTMENT",
  REWARDS = "REWARDS",
}

enum PaymentMode {
  CASH = "CASH",
  UPI = "UPI",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  NET_BANKING = "NET_BANKING",
  OTHERS = "OTHERS",
}
