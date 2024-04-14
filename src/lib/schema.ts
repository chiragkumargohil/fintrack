import { PAYMENT_MODE } from "@/constants";
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
  PAYMENT_MODE.CASH,
  PAYMENT_MODE.UPI,
  PAYMENT_MODE.CREDIT_CARD,
  PAYMENT_MODE.DEBIT_CARD,
  PAYMENT_MODE.NET_BANKING,
  PAYMENT_MODE.OTHERS,
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
