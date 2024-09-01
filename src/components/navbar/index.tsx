"use client";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
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
import { LogoutModal } from "../modals";
import { ThemeModeToggle } from "../toggles";

type NavbarProps = {
  email?: string;
};

const LINKS = [
  { label: "Dashboard", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "Add transaction", href: "/transactions/create" },
];

/**
 * Navbar component
 * @param props.email
 * @returns
 */
export function Navbar({ email }: NavbarProps) {
  // ----- Path ----- //
  const path = usePathname();

  // ----- State ----- //
  const [open, setOpen] = useState(false);

  // ----- Render ----- //
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
          <li className="text-gray-500 px-4 py-2 flex justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Avatar
                style={{
                  width: "2rem",
                  height: "2rem",
                  fontSize: "1rem",
                }}
              >
                <AvatarFallback>{email?.[0]}</AvatarFallback>
              </Avatar>
              {email}
            </div>
            <ThemeModeToggle />
          </li>
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
          <LogoutModal />
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
