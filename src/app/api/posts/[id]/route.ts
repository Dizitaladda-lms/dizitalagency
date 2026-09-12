import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateArticleSchema } from '@/lib/schema-generator'
import { calculateReadTime, calculateWordCount } from '@/lib/utils'
import { verifyAuthRequest } from '@/lib/auth-jwt'
import { ensureAdminApi } from '@/lib/auth'
import { sanitizeContent } from '@/lib/sanitize'
import { recordAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/request-info'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await prisma.blog.findUnique({
      where: { id }
    })

    if (!data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // 🔒 If post is draft, only allow if admin session exists
    if (data.status !== 'published') {
      const session = await verifyAuthRequest(request)
      if (!session) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🔒 1. Strict JWT Authentication Gate
    const session = await ensureAdminApi(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin login required to edit posts' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const current = await prisma.blog.findUnique({
      where: { id },
      select: { publishedAt: true, status: true, title: true }
    })

    if (!current) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const sanitizedHtml = body.content ? sanitizeContent(body.content) : ''
    const wordCount = calculateWordCount(sanitizedHtml)
    const readTime = calculateReadTime(sanitizedHtml)

    let publishedAt = current.publishedAt
    if (body.status === 'published' && !publishedAt) {
      publishedAt = body.published_at ? new Date(body.published_at) : new Date()
    } else if (body.published_at) {
      publishedAt = new Date(body.published_at)
    }

    const updateData: any = {
      title: (body.title || current.title).trim(),
      slug: body.slug ? body.slug.trim() : undefined,
      excerpt: body.excerpt ? body.excerpt.trim() : null,
      content: sanitizedHtml,
      status: body.status,
      coverImage: body.cover_image_url || null,
      coverImageAlt: body.cover_image_alt || null,
      category: body.category || null,
      tags: body.tags ?? [],
      metaTitle: body.meta_title || null,
      metaDescription: body.meta_description || null,
      metaKeywords: body.meta_keywords || null,
      canonicalUrl: body.canonical_url || null,
      ogTitle: body.og_title || null,
      ogDescription: body.og_description || null,
      ogImage: body.og_image_url || null,
      twitterTitle: body.twitter_title || null,
      twitterDescription: body.twitter_description || null,
      twitterImage: body.twitter_image_url || null,
      robotsDirective: body.robots_directive ?? 'index, follow',
      authorName: body.author_name ?? 'Admin',
      authorUrl: body.author_url || null,
      wordCount: wordCount,
      readTime: readTime,
      publishedAt,
      schemaJson: '',
    }

    updateData.schemaJson = generateArticleSchema({
      ...updateData,
      og_image_url: updateData.ogImage,
      cover_image_url: updateData.coverImage
    }, siteUrl)

    const updated = await prisma.blog.update({
      where: { id },
      data: updateData
    })

    const ip = await getClientIp(request)
    await recordAudit("post.update", {
      actor: (session.email as string) || "admin",
      entity: "Blog",
      entityId: id,
      ip,
      metadata: { title: updated.title, slug: updated.slug }
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error("PUT /api/posts/[id] error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🔒 1. Strict JWT Authentication Gate
    const session = await ensureAdminApi(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin login required to delete posts' },
        { status: 401 }
      )
    }

    const { id } = await params
    
    const postToDelete = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, title: true, slug: true }
    })

    if (!postToDelete) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    await prisma.blog.delete({
      where: { id }
    })

    const ip = await getClientIp(request)
    await recordAudit("post.delete", {
      actor: (session.email as string) || "admin",
      entity: "Blog",
      entityId: id,
      ip,
      metadata: { title: postToDelete.title, slug: postToDelete.slug }
    })

    return NextResponse.json({ success: true, message: 'Post deleted successfully' })
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
