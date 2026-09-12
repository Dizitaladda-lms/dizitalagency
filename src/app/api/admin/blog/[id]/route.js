import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdminApi } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slugify";
import { blogInputSchema } from "@/lib/blog-validation";
import { normalizeKeywords, normalizeSchemas, normalizeTags } from "@/lib/tags";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

export async function PUT(request, { params }) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const payload = await request.json();
    const parsed = blogInputSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    const current = await prisma.blog.findUnique({ where: { id } });
    if (!current) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const data = parsed.data;
    const slug = await generateUniqueSlug(data.slug || data.title, id);

    const updated = await prisma.blog.update({
      where: { id },
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
    await recordAudit("blog.update", {
      actor: session.email || session.sub || "admin",
      entity: "Blog",
      entityId: updated.id,
      ip,
      metadata: { slug: updated.slug, title: updated.title }
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in schemas field" }, { status: 400 });
    }
    console.error("PUT /api/admin/blog/[id] failed", error);
    return NextResponse.json({ error: "Unable to update blog" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await prisma.blog.delete({ where: { id } });

    const ip = await getClientIp(request);
    await recordAudit("blog.delete", {
      actor: session.email || session.sub || "admin",
      entity: "Blog",
      entityId: deleted.id,
      ip,
      metadata: { slug: deleted.slug, title: deleted.title }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    console.error("DELETE /api/admin/blog/[id] failed", error);
    return NextResponse.json({ error: "Unable to delete blog" }, { status: 500 });
  }
}
