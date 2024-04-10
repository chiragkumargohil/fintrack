// User model
interface User {
  email: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  password?: string | null;
  location?: string | null;
  provider?: string | null;
  providerId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Transaction model
interface Transaction {
  id?: number;
  title?: string | null;
  amount: number;
  date: Date | string;
  categoryId: number;
  mode: PaymentMode;
  location?: string | null;
  payee?: string | null;
  remarks?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  email: string;
}

// Category model
interface Category {
  id: number;
  name: string;
  email?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// PaymentMode enum
enum PaymentMode {
  CASH = "CASH",
  UPI = "UPI",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  NET_BANKING = "NET_BANKING",
  OTHERS = "OTHERS",
}
