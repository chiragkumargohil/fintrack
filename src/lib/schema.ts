import { PAYMENT_MODE_ENUM } from "@/constants";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(0).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});
export type SignupSchemaType = z.infer<typeof SignupSchema>;

const PaymentModeEnum = z.enum([
  PAYMENT_MODE_ENUM.CASH,
  PAYMENT_MODE_ENUM.UPI,
  PAYMENT_MODE_ENUM.CREDIT_CARD,
  PAYMENT_MODE_ENUM.DEBIT_CARD,
  PAYMENT_MODE_ENUM.NET_BANKING,
  PAYMENT_MODE_ENUM.OTHERS,
]);
export const TransactionSchema = z.object({
  categoryId: z.string().regex(/^\d+$/),
  title: z.string().optional(),
  amount: z.number().min(0).nonnegative().or(z.string().regex(/^\d+(\.\d{1,2})?$/)),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  mode: PaymentModeEnum,
  payee: z.string().optional(),
  location: z.string().optional(),
  remarks: z.string().optional(),
});
export type TransactionSchemaType = z.infer<typeof TransactionSchema>;
