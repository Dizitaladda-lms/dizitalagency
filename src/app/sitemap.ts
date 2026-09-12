import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'
import servicesData from '@/app/Data/services.json'
import industriesData from '@/app/Data/industries.json'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitaladdaagency.com'
  const currentDate = new Date()

  // 1. Static Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/Aboutus`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/Portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // 2. Dynamic 14 Service Pages
  const serviceSlugs = Object.keys(servicesData.serviceSlugMap || {})
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // 3. Dynamic 15 Industry Pages
  const industrySlugs = Object.keys(industriesData.industrySlugMap || {})
  const industryPages: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // 4. Dynamic Blog Articles from Database
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const publishedBlogs = await prisma.blog.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true, publishedAt: true },
    })

    blogPages = publishedBlogs.map((post: { slug: string; updatedAt: Date; publishedAt: Date | null }) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    }))
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
  }

  return [...staticPages, ...servicePages, ...industryPages, ...blogPages]
}
