import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui";
import { Navbar } from "@/components/navbar";

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
          <nav className="sticky bottom-0 w-full">
            <Navbar />
          </nav>
        </main>
      </body>
      <Toaster position="top-right" />
    </html>
  );
}
