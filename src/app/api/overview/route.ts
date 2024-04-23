import { getOverview } from "@/api/transaction.api";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  try {
    noStore();
    const data = await getOverview();

    return Response.json(data);
  } catch (error) {
    return Response.error();
  }
}
