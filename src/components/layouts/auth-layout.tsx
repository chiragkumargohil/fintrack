import { payment } from "@/assets";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { ThemeModeToggle } from "../toggles";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center flex-col md:flex-row h-full p-4 overflow-hidden">
      <div className="bg-green-600 h-full max-w-[50%] rounded-2xl hidden md:flex flex-col items-center justify-center p-8 lg:p-16 space-y-4 text-center dark:bg-card">
        <Image src={payment} alt="Payment" width={500} height={500} />
        <h1 className="text-4xl font-bold pt-8 text-gray-50 dark:text-primary">
          Track Your Finances Effortlessly!
        </h1>
        <p className="text-lg text-gray-900 dark:text-gray-500">
          Manage your income, expenses, and investments all in one place. Get
          insights to make better financial decisions.
        </p>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeModeToggle />
      </div>
      <Card className="mx-auto max-w-lg w-full border-2 bg-transparent shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
