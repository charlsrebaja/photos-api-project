import { searchImages } from "@/lib/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const source = searchParams.get("source") as
    | "unsplash"
    | "pexels"
    | "pixabay"
    | undefined;

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const results = await searchImages(query, page, source);
    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
