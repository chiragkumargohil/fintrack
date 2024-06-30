import { getOverview } from "@/api/transaction.api";
import { auth } from "@/lib/auth/auth";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  try {
    noStore();
    const { user } = (await auth()) || {};
    if (!user || !user.email) {
      return Response.error();
    }

    const data = await getOverview(user.email);

    return Response.json(data);
  } catch (error) {
    return Response.error();
  }
}
