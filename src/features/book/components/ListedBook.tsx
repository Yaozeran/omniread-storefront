/* Copyright (c) 2026, Yao Zeran
 *
 * The listed book component used in book sales page. */


import Image from "next/image";

import styles from "./ListedBook.module.css";

import {
  fetchAuthorDisplayNames,
  fetchBookMetadata,
  fetchBookSaleInfo,
  fetchPublisherDisplayName,
} from "@/services/api/book";


async function ListedBook({ bookId }: Readonly<{ bookId: string }>) {

  const metadata = await fetchBookMetadata(bookId);
  const saleinfo = await fetchBookSaleInfo(bookId);

  const authors = await fetchAuthorDisplayNames(bookId, metadata.authorIds);
  const authorLine = authors.length > 0 ? authors.join(", ") : "Unknown Author";

  const publisher = metadata.publisherId
    ? await fetchPublisherDisplayName(bookId, metadata.publisherId)
    : "Not published";

  const publishDate = metadata.publishedDate ?? "Unknown";
  const description =
    metadata.description ??
    "A highly rated title with strong storytelling and immersive world building. Perfect for readers who enjoy rich characters and layered plots.";

  const paperPrice = saleinfo.paperPrice ?? 0;
  const digitalPrice = saleinfo.digitalPrice ?? 0;
  const paperInventory = saleinfo.paperInventory ?? 0;
  const isSoldOut = paperInventory <= 0;

  return (
    <section className={styles.section}>
      <div className={styles.coverPanel}>
        <div className={styles.coverFrame}>
          <Image
            src={metadata.coverImage ?? "https://via.placeholder.com/150"}
            alt={metadata.title}
            fill
            className={styles.coverImage}
            sizes="(max-width: 1024px) 70vw, 260px"
          />
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.kicker}>Book Detail</p>
          <h1 className={styles.title}>{metadata.title}</h1>
          <p className={styles.authorLine}>by {authorLine}</p>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.metaGrid}>
          <p>
            <span className={styles.metaLabel}>Author:</span> {authorLine}
          </p>
          <p>
            <span className={styles.metaLabel}>Publisher:</span> {publisher}
          </p>
          <p>
            <span className={styles.metaLabel}>Publish Date:</span> {publishDate}
          </p>
          <p>
            <span className={styles.metaLabel}>ISBN:</span> {metadata.id}
          </p>
        </div>
      </div>

      <aside className={styles.aside}>
        <h2 className={styles.asideTitle}>Purchase Options</h2>

        <div className={styles.optionCardPrimary}>
          <p className={styles.optionKickerPrimary}>Digital Edition</p>
          <p className={styles.price}>${digitalPrice.toFixed(2)}</p>
          <p className={styles.optionDescription}>Instant delivery after purchase.</p>
          <div className={styles.buttonGrid}>
            <button type="button" className={styles.secondaryButton}>
              Add to Cart
            </button>
            <button type="button" className={styles.primaryButton}>
              Buy Now
            </button>
          </div>
        </div>

        <div className={styles.optionCardSecondary}>
          <p className={styles.optionKickerSecondary}>Paper Edition</p>
          <p className={styles.price}>${paperPrice.toFixed(2)}</p>
          <p className={styles.optionDescription}>
            Stock: <span className={styles.stockLabel}>{isSoldOut ? "Sold Out" : "In Stock"}</span>
          </p>
          <div className={styles.buttonGrid}>
            <button type="button" disabled={isSoldOut} className={styles.secondaryButton}>
              Add to Cart
            </button>
            <button type="button" disabled={isSoldOut} className={styles.primaryButton}>
              Buy Now
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
}


export default ListedBook;
