import { NextRequest, NextResponse } from "next/server";
import { joseVerify } from "./lib/actions";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await joseVerify(jwt?.value);

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};
