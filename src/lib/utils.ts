import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberInIndianStyle(number = 0) {
  // Convert the number to a string
  number = number || 0;
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

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getMonthName(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
}

export function getMonthNameFromNumber(month: number) {
  const date = new Date();
  date.setMonth(month);
  return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  return pass;
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * @function validateEmail
 * @description Validates an email address
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/**
 * @function validatePassword
 * @description Validates a password
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * @function isStrongPassword
 * @description Checks if a password is strong
 * @param {string} password
 * @returns {boolean}
 */
export function isStrongPassword(password: string): boolean {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character, space not allowed.
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  return re.test(password);
}

export const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
