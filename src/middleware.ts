import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/superbase/middleware";
import { createClient } from "./lib/superbase/server";

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  // If the user is not logged in, redirect to the login page
  if (
    (error || !data?.user) &&
    !request.nextUrl.pathname.startsWith("/login")
  ) {
    return Response.redirect(new URL("/login", request.url));
  }
  // If the user is logged in, and they try to access the login page, redirect to the home page
  else if (request.nextUrl.pathname.startsWith("/login") && data?.user) {
    return Response.redirect(new URL("/", request.url));
  }
  // If the user is logged in, allow them to access the requested page
  else {
    return updateSession(request);
  }
}

export const config = {
  // The middleware will not run on these paths
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/login",
  ],
};
