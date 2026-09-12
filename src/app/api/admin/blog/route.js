import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdminApi } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slugify";
import { blogInputSchema } from "@/lib/blog-validation";
import { normalizeKeywords, normalizeSchemas, normalizeTags } from "@/lib/tags";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

export async function POST(request) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();
    const parsed = blogInputSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    const data = parsed.data;
    const slug = await generateUniqueSlug(data.slug || data.title);

    const blog = await prisma.blog.create({
      data: {
        title: data.title.trim(),
        slug,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: normalizeKeywords(data.keywords),
        schemaJson: normalizeSchemas(data.schemas),
        tags: normalizeTags(data.tags),
        coverImage: data.coverImage || null,
        ogImage: data.ogImage || null,
        content: sanitizeBlogHtml(data.content)
      }
    });

    const ip = await getClientIp(request);
    await recordAudit("blog.create", {
      actor: session.email || session.sub || "admin",
      entity: "Blog",
      entityId: blog.id,
      ip,
      metadata: { slug: blog.slug, title: blog.title }
    });

    return NextResponse.json({ data: blog }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in schemas field" }, { status: 400 });
    }
    console.error("POST /api/admin/blog failed", error);
    return NextResponse.json({ error: "Unable to create blog" }, { status: 500 });
  }
}
