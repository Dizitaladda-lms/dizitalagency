import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { generateArticleSchema } from '@/lib/schema-generator'
import { calculateReadTime, calculateWordCount } from '@/lib/utils'
import { verifyAuthRequest } from '@/lib/auth-jwt'
import { ensureAdminApi } from '@/lib/auth'
import { sanitizeContent } from '@/lib/sanitize'

const postInsertSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional().default(''),
  content: z.string().min(1, 'Content is required'),
  cover_image_url: z.string().optional().default(''),
  cover_image_alt: z.string().optional().default(''),
  status: z.enum(['draft', 'published', 'archived']),
  category: z.string().optional().default(''),
  tags: z.array(z.string()).default([]),
  meta_title: z.string().optional().default(''),
  meta_description: z.string().optional().default(''),
  meta_keywords: z.string().optional().default(''),
  canonical_url: z.string().optional().default(''),
  og_title: z.string().optional().default(''),
  og_description: z.string().optional().default(''),
  og_image_url: z.string().optional().default(''),
  twitter_title: z.string().optional().default(''),
  twitter_description: z.string().optional().default(''),
  twitter_image_url: z.string().optional().default(''),
  robots_directive: z.string().default('index, follow'),
  schema_json: z.string().optional().default(''),
  author_name: z.string().default('Admin'),
  author_url: z.string().optional().default(''),
  published_at: z.string().optional().nullable(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const requestedStatus = searchParams.get('status')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)))
    const skip = (page - 1) * limit

    const session = await verifyAuthRequest(request)
    const isAdmin = Boolean(session)

    const where: any = {}
    
    if (isAdmin) {
      if (requestedStatus) where.status = requestedStatus
    } else {
      // 🔒 Public visitors only get published posts (Prevents Draft Leaks)
      where.status = 'published'
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category) {
      where.category = { equals: category, mode: 'insensitive' }
    }

    const [data, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({ data, total, page, totalPages })
  } catch (error) {
    console.error("GET /api/posts error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 🔒 1. Strict JWT Authentication Gate
    const session = await ensureAdminApi(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid Admin session required to create posts' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const parsed = postInsertSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Validation failed' },
        { status: 400 }
      )
    }

    const data = parsed.data
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Check slug uniqueness
    const existing = await prisma.blog.findUnique({
      where: { slug: data.slug },
      select: { id: true }
    })

    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    // Sanitize HTML Content against XSS
    const sanitizedHtml = sanitizeContent(data.content)
    const wordCount = calculateWordCount(sanitizedHtml)
    const readTime = calculateReadTime(sanitizedHtml)

    const publishedAt = data.status === 'published'
      ? (data.published_at ? new Date(data.published_at) : new Date())
      : (data.published_at ? new Date(data.published_at) : null)

    const postData: any = {
      title: data.title.trim(),
      slug: data.slug.trim(),
      excerpt: data.excerpt ? data.excerpt.trim() : null,
      content: sanitizedHtml,
      status: data.status,
      coverImage: data.cover_image_url || null,
      coverImageAlt: data.cover_image_alt || null,
      category: data.category || null,
      tags: data.tags,
      metaTitle: data.meta_title || null,
      metaDescription: data.meta_description || null,
      metaKeywords: data.meta_keywords || null,
      canonicalUrl: data.canonical_url || null,
      ogTitle: data.og_title || null,
      ogDescription: data.og_description || null,
      ogImage: data.og_image_url || null,
      twitterTitle: data.twitter_title || null,
      twitterDescription: data.twitter_description || null,
      twitterImage: data.twitter_image_url || null,
      robotsDirective: data.robots_directive,
      schemaJson: '',
      authorName: data.author_name || 'Admin',
      authorUrl: data.author_url || null,
      wordCount: wordCount,
      readTime: readTime,
      publishedAt
    }

    postData.schemaJson = generateArticleSchema({
      ...postData,
      og_image_url: postData.ogImage,
      cover_image_url: postData.coverImage
    }, siteUrl)

    const created = await prisma.blog.create({
      data: postData
    })

    return NextResponse.json({ data: created }, { status: 201 })
  } catch (error) {
    console.error("POST /api/posts error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
