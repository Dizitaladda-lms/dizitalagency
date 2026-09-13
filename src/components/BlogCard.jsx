import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

const toExcerpt = (html) => {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > 140 ? `${text.slice(0, 140)}…` : text;
};

const BlogCard = ({ blog }) => {
  if (!blog) return null;
  const rawCover = blog.coverImage?.trim();
  const isExternalCover = Boolean(rawCover && /^(https?:)?\/\//i.test(rawCover));
  const hasCover = Boolean(rawCover);
  const cover = hasCover ? rawCover : "/placeholder.svg";
  const description = blog.metaDescription || blog.excerpt || "";
  const primaryTag = blog.tags?.[0];

  return (
    <article className={styles.card}>
      {/* Cover image */}
      <Link
        href={`/blog/${blog.slug}`}
        className={`${styles.imageWrap} ${hasCover ? "" : styles.placeholder}`}
        aria-label={`Read ${blog.title}`}
        tabIndex={-1}
      >
        <Image
          src={cover}
          alt={blog.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 380px, 420px"
          priority={false}
          style={{ objectFit: "cover" }}
          unoptimized={isExternalCover}
        />
        {!hasCover ? <span className={styles.placeholderText}>No cover image</span> : null}
      </Link>

      {/* Card body */}
      <div className={styles.body}>

        {/* Meta row */}
        <div className={styles.meta}>
          <span>{formatDate(blog.createdAt)}</span>
          {primaryTag && (
            <>
              <span className={styles.metaDot} />
              <span className={styles.tagPill}>{primaryTag}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3>
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        {/* Excerpt */}
        {description && <p>{description}</p>}

        {/* CTA */}
        <Link href={`/blog/${blog.slug}`} className={styles.cta} aria-label={`Read more about ${blog.title}`}>
          Read Article <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
