import React from "react";
import { auth } from "@/lib/auth/auth";
import { Navbar as NavbarComponent } from "@/components/navbar";

export default async function Navbar() {
  const user = await auth();

  if (user) {
    return (
      <nav className="sticky bottom-0 w-full">
        <NavbarComponent email={user.user?.email || undefined} />
      </nav>
    );
  } else {
    return null;
  }
}
