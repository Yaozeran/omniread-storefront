/* Copyright (c) 2026, Yao Zeran
 *
 * The listed book component used in book sales page. */


import Image from "next/image";

import type { Book } from "@/types/book";
import styles from "./ListedBook.module.css";


function ListedBook({ book }: Readonly<{ book: Book} >) {

	return (
		<section className={styles.section}>

			<div className={styles.coverPanel}>
				<div className={styles.coverFrame}>
					<Image
						src={book.coverImage}
						alt={book.title}
						fill
						className={styles.coverImage}
						sizes="(max-width: 1024px) 70vw, 260px"
					/>
				</div>
			</div>

			<div className={styles.details}>
				<div>
					<p className={styles.kicker}>Book Detail</p>
					<h1 className={styles.title}>{book.title}</h1>
					<p className={styles.authorLine}>by {book.authorName}</p>
				</div>

				<p className={styles.description}>
					{book.description ??
						"A highly rated title with strong storytelling and immersive world building. Perfect for readers who enjoy rich characters and layered plots."}
				</p>

				<div className={styles.metaGrid}>
					<p>
						<span className={styles.metaLabel}>Author:</span> {book.authorName}
					</p>
					<p>
						<span className={styles.metaLabel}>Publisher:</span> {book.publisherName}
					</p>
					<p>
						<span className={styles.metaLabel}>Publish Date:</span> {book.publishDate}
					</p>
					<p>
						<span className={styles.metaLabel}>ISBN:</span> {book.id}
					</p>
				</div>
			</div>

			<aside className={styles.aside}>
				<h2 className={styles.asideTitle}>Purchase Options</h2>
				<div className={styles.optionCardPrimary}>
					<p className={styles.optionKickerPrimary}>Digital Edition</p>
					<p className={styles.price}>${(book.digitalPrice ?? 0).toFixed(2)}</p>
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
					<p className={styles.price}>${(book.paperPrice ?? 0).toFixed(2)}</p>
					<p className={styles.optionDescription}>
						Stock: <span className={styles.stockLabel}>{book.isSoldOut ? "Sold Out" : "In Stock"}</span>
					</p>
					<div className={styles.buttonGrid}>
						<button
							type="button"
							disabled={book.isSoldOut}
							className={styles.secondaryButton}
						>
							Add to Cart
						</button>
						<button
							type="button"
							disabled={book.isSoldOut}
							className={styles.primaryButton}
						>
							Buy Now
						</button>
					</div>
				</div>
			</aside>
		</section>
	);
};

export default ListedBook;
