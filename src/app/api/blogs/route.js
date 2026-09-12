import { NextResponse } from "next/server";

export async function GET(request) {
  // 🔒 Redirect public visitors to the visual /blogs page instead of exposing raw JSON
  const url = new URL("/blogs", request.url);
  return NextResponse.redirect(url, 307);
}
