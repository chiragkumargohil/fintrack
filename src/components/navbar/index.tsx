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
import { usePathname } from "next/navigation";
import LogoutButton from "../logout-button";

const LINKS = [
  { label: "Dashboard", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "New transaction", href: "/transactions/create" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  // PATH
  const path = usePathname();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="w-full py-4">
        <Button className="w-full h-auto text-lg justify-between rounded-l-none rounded-r-none">
          {LINKS.find(({ href }) => href === path)?.label || "Menu"}
          <ChevronsUpDown size={18} strokeWidth={3} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ul className="space-y-2 pt-4 px-4">
          {LINKS.map(({ label, href }) => (
            <li key={label} className="text-gray-500 block">
              <Button variant="link" asChild className="w-full justify-start">
                <Link href={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </Button>
            </li>
          ))}
          <hr />
          {/* LOGOUT */}
          {/* <LogoutButton /> */}
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
