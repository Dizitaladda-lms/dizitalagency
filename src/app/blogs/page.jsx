import BlogCard from "@/components/BlogCard";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";

// Keep the public listing responsive while allowing new posts to appear shortly
// after publication instead of querying the database on every navigation.
export const revalidate = 60;

export const metadata = {
  title: "Blog — DigitalAdda Agency",
  description: "Expert insights, playbooks, and strategies from the DigitalAdda editorial team. Stay ahead with actionable digital marketing advice."
};

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      metaDescription: true,
      tags: true,
      coverImage: true,
      excerpt: true,
      createdAt: true
    }
  });

  return (
    <main className={styles.page} id="main-content" role="main">

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <span className={styles.heroEyebrow}>
          <span className={styles.heroDot} />
          Editorial Hub
          <span className={styles.heroDot} />
        </span>

        <h1 className={styles.heroTitle}>
          Insights &amp; <span>Playbooks</span>
        </h1>

        <p className={styles.heroSub}>
          Expert strategies, real-world case studies, and actionable marketing
          advice — curated by the DigitalAdda team.
        </p>

        <div className={styles.heroDivider} aria-hidden="true">
          <div className={styles.heroDividerLine} />
          <div className={styles.heroDividerDiamond} />
          <div className={styles.heroDividerLine} />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      {blogs.length > 0 && (
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{blogs.length}</span>
            <span className={styles.statLabel}>Articles</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>
              {[...new Set(blogs.flatMap((b) => b.tags ?? []))].length}
            </span>
            <span className={styles.statLabel}>Topics</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>Free</span>
            <span className={styles.statLabel}>Always</span>
          </div>
        </div>
      )}

      {/* ── Blog Grid ── */}
      <div className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLine} />
          <span className={styles.sectionHeaderLabel}>Latest Articles</span>
          <div className={styles.sectionHeaderLine} />
        </div>

        {blogs.length ? (
          <section className={styles.grid}>
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
        ) : (
          <div className={styles.empty}>
            <p>No posts published yet — check back soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}
