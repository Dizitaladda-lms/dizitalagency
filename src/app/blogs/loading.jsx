import styles from "./page.module.css";

export default function BlogsLoading() {
  return (
    <main className={styles.page} id="main-content" role="main" aria-busy="true" aria-label="Loading articles">
      <section className={styles.hero}>
        <span className={styles.heroEyebrow}>Editorial Hub</span>
        <h1 className={styles.heroTitle}>Insights &amp; <span>Playbooks</span></h1>
        <p className={styles.heroSub}>Loading the latest articles...</p>
      </section>

      <div className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLine} />
          <span className={styles.sectionHeaderLabel}>Latest Articles</span>
          <div className={styles.sectionHeaderLine} />
        </div>
        <section className={styles.grid} aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className={styles.loadingCard}>
              <div className={styles.loadingImage} />
              <div className={styles.loadingBody}>
                <div className={`${styles.loadingLine} ${styles.loadingLineShort}`} />
                <div className={styles.loadingLine} />
                <div className={`${styles.loadingLine} ${styles.loadingLineMedium}`} />
                <div className={`${styles.loadingLine} ${styles.loadingLineShort}`} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
