"use client";
import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

const LINKS = [
  { label: "Dashboard", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "New transaction", href: "/transactions/new" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="sticky bottom-0 w-full py-4">
        <Button className="w-full h-auto text-lg justify-between">
          Dashboard <ChevronsUpDown size={18} strokeWidth={3} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ul className="space-y-2 pt-4 px-4">
          {LINKS.map(({ label, href }) => (
            <li key={label} className="text-gray-500 block">
              <Link href={href} className="block">
                <Button variant="link">{label}</Button>
              </Link>
            </li>
          ))}
        </ul>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
