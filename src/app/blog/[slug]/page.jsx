import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { stripHtml } from "@/lib/sanitize";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(value));

const toExcerpt = (html) => {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 100 ? `${text.slice(0, 100)}…` : text;
};

const getBlogBySlug = async (slug) =>
  prisma.blog.findFirst({ where: { slug, status: "published" } });

const getRecommended = async (currentId, tags = []) => {
  // Try tag-matching first, then fall back to latest
  let posts = [];

  if (tags.length > 0) {
    posts = await prisma.blog.findMany({
      where: {
        id: { not: currentId },
        status: "published",
        tags: { hasSome: tags },
      },
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        title: true,
        slug: true,
        tags: true,
        coverImage: true,
        createdAt: true,
        content: true,
        metaDescription: true,
      },
    });
  }

  if (posts.length < 4) {
    const existingIds = [currentId, ...posts.map((p) => p.id)];
    const extras = await prisma.blog.findMany({
      where: { id: { notIn: existingIds }, status: "published" },
      orderBy: { createdAt: "desc" },
      take: 4 - posts.length,
      select: {
        id: true,
        title: true,
        slug: true,
        tags: true,
        coverImage: true,
        createdAt: true,
        content: true,
        metaDescription: true,
      },
    });
    posts = [...posts, ...extras];
  }

  return posts;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const title = blog.metaTitle || blog.title;
  const description =
    blog.metaDescription || stripHtml(blog.content).slice(0, 160);
  const image = blog.ogImage || blog.coverImage || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const recommended = await getRecommended(blog.id, blog.tags ?? []);
  const allTags = blog.tags ?? [];

  const rawCover = blog.coverImage?.trim();
  const isExternalCover = Boolean(
    rawCover && /^(https?:)?\/\//i.test(rawCover)
  );

  return (
    <main className={styles.page} id="main-content" role="main">

      {/* ── Article Hero ── */}
      <header className={styles.articleHero}>
        <div className={styles.articleHeroGlow} aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* Back navigation */}
          <Link href="/blogs" className={styles.backNav}>
            ← All Articles
          </Link>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className={styles.heroTags}>
              {allTags.map((tag) => (
                <span key={tag} className={styles.heroTag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className={styles.heroTitle}>{blog.title}</h1>

          {/* Meta */}
          <div className={styles.heroMeta}>
            <span>{formatDate(blog.createdAt)}</span>
            {allTags.length > 0 && (
              <>
                <span className={styles.heroMetaDot} aria-hidden="true" />
                <span>{allTags.slice(0, 2).join(" · ")}</span>
              </>
            )}
          </div>

          {/* Divider */}
          <div className={styles.heroDivider} aria-hidden="true">
            <div className={styles.heroDividerLine} />
            <div className={styles.heroDividerDiamond} />
            <div className={styles.heroDividerLine} />
          </div>
        </div>
      </header>

      {/* ── Cover Image ── */}
      {rawCover && (
        <div className={styles.coverWrap}>
          <Image
            src={rawCover}
            alt={blog.title}
            fill
            sizes="(max-width: 900px) 100vw, 1000px"
            unoptimized={isExternalCover}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      {/* ── Two-column layout ── */}
      <div className={styles.contentLayout}>

        {/* Article content */}
        <div className={styles.article}>
          <div className={styles.articleInner}>
            <section
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <footer className={styles.articleFooter}>
              <span className={styles.footerDate}>
                Published {formatDate(blog.createdAt)}
              </span>
              <span className={styles.shareLine}>DigitalAdda Agency</span>
            </footer>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>

          {/* Recommended Posts */}
          {recommended.length > 0 && (
            <div className={styles.recommendedPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelHeaderDot} aria-hidden="true" />
                <span className={styles.panelHeaderLabel}>Recommended</span>
                <div className={styles.panelHeaderLine} />
              </div>

              {recommended.map((rec) => {
                const recCover = rec.coverImage?.trim();
                const recIsExternal = Boolean(
                  recCover && /^(https?:)?\/\//i.test(recCover)
                );

                return (
                  <Link
                    key={rec.id}
                    href={`/blog/${rec.slug}`}
                    className={styles.recCard}
                  >
                    <div className={styles.recImageWrap}>
                      <Image
                        src={recCover || "/placeholder.svg"}
                        alt={rec.title}
                        fill
                        sizes="72px"
                        unoptimized={recIsExternal}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className={styles.recBody}>
                      {rec.tags?.[0] && (
                        <span className={styles.recTag}>{rec.tags[0]}</span>
                      )}
                      <span className={styles.recTitle}>{rec.title}</span>
                      <span className={styles.recDate}>
                        {formatDate(rec.createdAt)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Tags cloud */}
          {allTags.length > 0 && (
            <div className={styles.tagsPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelHeaderDot} aria-hidden="true" />
                <span className={styles.panelHeaderLabel}>Topics</span>
                <div className={styles.panelHeaderLine} />
              </div>
              <div className={styles.tagsCloud}>
                {allTags.map((tag) => (
                  <span key={tag} className={styles.tagChip}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to all blogs CTA */}
          <Link href="/blogs" className={styles.moreCTA}>
            View All Articles →
          </Link>
        </aside>
      </div>

      {/* Schema markup */}
      {blog.schemaJson ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schemaJson }}
        />
      ) : null}
    </main>
  );
}
