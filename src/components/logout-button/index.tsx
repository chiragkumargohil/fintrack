"use server";

import { signOut } from "@/lib/auth/auth";
import { Button } from "../ui";

export default async function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        variant="link"
        className="block w-full text-gray-500 text-start"
        type="submit"
      >
        Logout
      </Button>
    </form>
  );
}
