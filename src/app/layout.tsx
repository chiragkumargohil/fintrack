import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Track your money easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex flex-col h-screen justify-between overflow-scroll">
          <div className="flex-1">{children}</div>
          <Navbar />
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
