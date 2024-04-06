import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberInIndianStyle(number: number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Define the Indian number formatting pattern
  const pattern = /(\d+?)(?=(\d{2})+(?!\d))/g;

  // last 3 digits are the decimal part
  const decimalPart = numberString.slice(-3);
  // first digits are the integer part
  if (numberString.length <= 3) {
    return `${numberString}`;
  }
  const integerPart = numberString.slice(0, -3).replace(pattern, "$1,");

  // Replace the number with the Indian style formatting
  return `${integerPart},${decimalPart}`;
}

export function getMonthName(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
}
