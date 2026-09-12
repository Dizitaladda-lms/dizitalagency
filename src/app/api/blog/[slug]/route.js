import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;
  // 🔒 Redirect public visitors to /blog/:slug instead of exposing raw JSON
  const url = new URL(`/blog/${slug}`, request.url);
  return NextResponse.redirect(url, 307);
}
