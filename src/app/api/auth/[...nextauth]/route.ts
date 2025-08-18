import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export async function GET(request: Request) {
  // Forward GET requests to NextAuth handler
  return handler(request as unknown as Request);
}

export async function POST(request: Request) {
  // Forward POST requests to NextAuth handler
  return handler(request as unknown as Request);
}
