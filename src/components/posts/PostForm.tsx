'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import { Save, RefreshCw } from 'lucide-react'
import { BlogPost, PostFormData } from '@/types/blog'
import { generateSlug, calculateReadTime } from '@/lib/utils'
import { generateArticleSchema } from '@/lib/schema-generator'
import SlugInput from '@/components/ui/SlugInput'
import TagInput from '@/components/ui/TagInput'
import ImageUploader from '@/components/ui/ImageUploader'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { withAdminCsrf } from '@/lib/client-csrf'

const TiptapEditor = dynamic(() => import('@/components/editor/TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] border border-gray-300 rounded-lg animate-pulse bg-gray-50" />
  ),
})

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(1, 'Content is required'),
  cover_image_url: z.string().optional(),
  cover_image_alt: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  category: z.string().optional(),
  tags: z.array(z.string()),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
  meta_keywords: z.string().optional(),
  canonical_url: z.string().optional(),
  og_title: z.string().optional(),
  og_description: z.string().optional(),
  og_image_url: z.string().optional(),
  twitter_title: z.string().optional(),
  twitter_description: z.string().optional(),
  twitter_image_url: z.string().optional(),
  robots_directive: z.string(),
  schema_json: z.string().optional(),
  author_name: z.string(),
  author_url: z.string().optional(),
  published_at: z.string().optional(),
})

interface PostFormProps {
  initialData?: BlogPost
  postId?: string
  mode: 'create' | 'edit'
}

const CONTENT_FIELDS = ['title', 'slug', 'content', 'status'] as const
const SEO_FIELDS = [
  'meta_title', 'meta_description', 'canonical_url',
] as const

export default function PostForm({ initialData, postId, mode }: PostFormProps) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit')
  const [schemaManualEdit, setSchemaManualEdit] = useState(false)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      slug: initialData?.slug ?? '',
      excerpt: initialData?.excerpt ?? '',
      content: initialData?.content ?? '',
      cover_image_url: initialData?.cover_image_url ?? '',
      cover_image_alt: initialData?.cover_image_alt ?? '',
      status: initialData?.status ?? 'draft',
      category: initialData?.category ?? '',
      tags: initialData?.tags ?? [],
      meta_title: initialData?.meta_title ?? '',
      meta_description: initialData?.meta_description ?? '',
      meta_keywords: initialData?.meta_keywords ?? '',
      canonical_url: initialData?.canonical_url ?? '',
      og_title: initialData?.og_title ?? '',
      og_description: initialData?.og_description ?? '',
      og_image_url: initialData?.og_image_url ?? '',
      twitter_title: initialData?.twitter_title ?? '',
      twitter_description: initialData?.twitter_description ?? '',
      twitter_image_url: initialData?.twitter_image_url ?? '',
      robots_directive: initialData?.robots_directive ?? 'index, follow',
      schema_json: initialData?.schema_json ?? '',
      author_name: initialData?.author_name ?? 'Admin',
      author_url: initialData?.author_url ?? '',
      published_at: initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : '',
    },
  })

  // Warn before unload if dirty
  if (typeof window !== 'undefined') {
    window.onbeforeunload = isDirty ? () => 'You have unsaved changes.' : null
  }

  const watchedTitle = watch('title')
  const watchedSlug = watch('slug')
  const watchedContent = watch('content')
  const watchedStatus = watch('status')
  const watchedExcerpt = watch('excerpt')
  const watchedMetaTitle = watch('meta_title')
  const watchedMetaDesc = watch('meta_description')
  const watchedCoverImage = watch('cover_image_url')
  const watchedSchemaJson = watch('schema_json')

  const readTime = calculateReadTime(watchedContent || '')

  // Auto-generate slug from title in create mode
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (mode === 'create' && !slugManuallyEdited) {
      setValue('slug', generateSlug(val))
    }
  }

  // Auto-fill canonical URL
  const handleSlugChange = (slug: string) => {
    setValue('slug', slug)
    const currentCanonical = watch('canonical_url')
    if (!currentCanonical || currentCanonical.startsWith(siteUrl + '/blog/')) {
      setValue('canonical_url', `${siteUrl}/blog/${slug}`)
    }
  }

  const regenerateSchema = () => {
    const formValues = watch()
    const schema = generateArticleSchema(
      {
        title: formValues.title,
        slug: formValues.slug,
        excerpt: formValues.excerpt || null,
        meta_title: formValues.meta_title || null,
        meta_description: formValues.meta_description || null,
        og_image_url: formValues.og_image_url || null,
        cover_image_url: formValues.cover_image_url || null,
        author_name: formValues.author_name,
        author_url: formValues.author_url || null,
        canonical_url: formValues.canonical_url || null,
        meta_keywords: formValues.meta_keywords || null,
        tags: formValues.tags,
        word_count: formValues.content ? formValues.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length : 0,
      },
      siteUrl
    )
    setValue('schema_json', schema)
    setSchemaManualEdit(false)
  }

  const onSubmit = async (data: PostFormData) => {
    setSubmitError(null)
    try {
      const url = mode === 'create' ? '/api/posts' : `/api/posts/${postId}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, withAdminCsrf({
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }))

      const json = await res.json()

      if (!res.ok) {
        setSubmitError(json.error || 'Failed to save post')
        return
      }

      // Clear dirty guard before navigating
      if (typeof window !== 'undefined') window.onbeforeunload = null
      router.push('/admin/blogs')
    } catch {
      setSubmitError('An unexpected error occurred')
    }
  }

  // Check which tabs have errors
  const contentTabHasError = CONTENT_FIELDS.some((f) => !!errors[f])
  const seoTabHasError = SEO_FIELDS.some((f) => !!errors[f])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {submitError}
        </div>
      )}

      <TabGroup>
        <TabList className="flex gap-1 border-b border-gray-200 mb-6">
          {[
            { label: 'Content', hasError: contentTabHasError },
            { label: 'SEO', hasError: seoTabHasError },
            { label: 'Schema / JSON-LD', hasError: false },
          ].map(({ label, hasError }) => (
            <Tab
              key={label}
              className={({ selected }: { selected: boolean }) =>
                `flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none ${
                  selected
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`
              }
            >
              {label}
              {hasError && (
                <span className="w-2 h-2 rounded-full bg-red-500" title="This tab has errors" />
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {/* ─── TAB 1: Content ─── */}
          <TabPanel className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register('title')}
                onChange={(e) => {
                  register('title').onChange(e)
                  handleTitleChange(e)
                }}
                placeholder="Post title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug <span className="text-red-500">*</span>
              </label>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <SlugInput
                    value={field.value ?? ''}
                    onChange={(slug) => {
                      setSlugManuallyEdited(true)
                      handleSlugChange(slug)
                    }}
                    postId={postId}
                  />
                )}
              />
              {errors.slug && (
                <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                {...register('excerpt')}
                maxLength={300}
                rows={3}
                placeholder="Brief description of the post..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="mt-1 text-xs text-gray-400 text-right">
                {(watchedExcerpt ?? '').length}/300
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TiptapEditor
                    content={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.content && (
                <p className="mt-1 text-xs text-red-600">{errors.content.message}</p>
              )}
            </div>

            {/* Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Controller
                  name="cover_image_url"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      label="Cover Image"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image Alt Text
                </label>
                <input
                  {...register('cover_image_alt')}
                  placeholder="Describe the image..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  {...register('category')}
                  placeholder="e.g. Technology"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TagInput value={field.value ?? []} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>

            {/* Status & Published At */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('status')}
                  onChange={(e) => {
                    register('status').onChange(e)
                    if (e.target.value === 'published') {
                      const currentPub = watch('published_at')
                      if (!currentPub) {
                        const now = new Date()
                        now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
                        setValue('published_at', now.toISOString().slice(0, 16))
                      }
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Published At
                </label>
                <input
                  type="datetime-local"
                  {...register('published_at')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  {...register('author_name')}
                  placeholder="Admin"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author URL
                </label>
                <input
                  {...register('author_url')}
                  placeholder="https://example.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Read Time Badge */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Estimated read time:</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {readTime} min read
              </span>
            </div>
          </TabPanel>

          {/* ─── TAB 2: SEO ─── */}
          <TabPanel className="space-y-6">
            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                {...register('meta_title')}
                maxLength={60}
                placeholder="SEO title (max 60 chars)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p
                className={`mt-1 text-xs text-right ${
                  (watchedMetaTitle ?? '').length >= 60
                    ? 'text-red-600'
                    : (watchedMetaTitle ?? '').length >= 50
                    ? 'text-orange-500'
                    : 'text-gray-400'
                }`}
              >
                {(watchedMetaTitle ?? '').length}/60
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                {...register('meta_description')}
                maxLength={160}
                rows={3}
                placeholder="SEO description (max 160 chars)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p
                className={`mt-1 text-xs text-right ${
                  (watchedMetaDesc ?? '').length >= 160
                    ? 'text-red-600'
                    : (watchedMetaDesc ?? '').length >= 140
                    ? 'text-orange-500'
                    : 'text-gray-400'
                }`}
              >
                {(watchedMetaDesc ?? '').length}/160
              </p>
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Keywords
              </label>
              <input
                {...register('meta_keywords')}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Canonical URL
              </label>
              <input
                {...register('canonical_url')}
                placeholder={`${siteUrl}/blog/${watchedSlug}`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Robots Directive */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Robots Directive
              </label>
              <select
                {...register('robots_directive')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="index, follow">index, follow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, follow">noindex, follow</option>
              </select>
            </div>

            {/* OG Fields */}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700">Open Graph</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                <input
                  {...register('og_title')}
                  onBlur={(e) => {
                    if (!e.target.value && watchedMetaTitle) {
                      setValue('og_title', watchedMetaTitle)
                    }
                  }}
                  placeholder="Auto-fills from Meta Title on blur"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                <textarea
                  {...register('og_description')}
                  onBlur={(e) => {
                    if (!e.target.value && watchedMetaDesc) {
                      setValue('og_description', watchedMetaDesc)
                    }
                  }}
                  rows={2}
                  placeholder="Auto-fills from Meta Description on blur"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <Controller
                name="og_image_url"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value || watchedCoverImage || ''}
                    onChange={field.onChange}
                    label="OG Image"
                  />
                )}
              />
            </div>

            {/* Twitter Fields */}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700">Twitter Card</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Title</label>
                <input
                  {...register('twitter_title')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Description</label>
                <textarea
                  {...register('twitter_description')}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <Controller
                name="twitter_image_url"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    label="Twitter Image"
                  />
                )}
              />
            </div>
          </TabPanel>

          {/* ─── TAB 3: Schema / JSON-LD ─── */}
          <TabPanel className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">JSON-LD Schema</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSchemaManualEdit((v) => !v)}
                  className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {schemaManualEdit ? 'View' : 'Edit Manually'}
                </button>
                <button
                  type="button"
                  onClick={regenerateSchema}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </button>
              </div>
            </div>

            {schemaManualEdit ? (
              <textarea
                {...register('schema_json')}
                rows={20}
                className="w-full font-mono text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            ) : (
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-auto text-xs font-mono max-h-[500px]">
                <code>
                  {watchedSchemaJson ||
                    '// Click "Regenerate" to generate schema from current content'}
                </code>
              </pre>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* Submit */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/blogs')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {mode === 'create' ? 'Create Post' : 'Save Changes'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
