import { PaymentMode as PrismaPaymentMode } from "@prisma/client";

// User model
export interface User {
  id?: number;
  email: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  password?: string | null;
  location?: string | null;
  provider?: string | null;
  providerId?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Transaction model
export interface Transaction {
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
export interface Category {
  id: number;
  name: string;
  email?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// PaymentMode enum
export enum PaymentMode {
  "CASH",
  "UPI",
  "CREDIT_CARD",
  "DEBIT_CARD",
  "NET_BANKING",
  "OTHERS",
}

export type TransactionWithCategory = {
  id?: number;
  title: string;
  amount: number;
  date: Date | string;
  mode: PrismaPaymentMode;
  location: string;
  payee: string;
  remarks: string;
  categoryId: number;
  category?: string;
  email: string;
};