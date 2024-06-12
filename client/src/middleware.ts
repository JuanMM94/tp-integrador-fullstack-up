import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "./constants/constants";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");
  console.log(jwt?.value);

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(jwt?.value, secretKey);
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/profile"],
};
