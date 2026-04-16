/* Copyright (c) 2026, Yao Zeran
 * 
 * The book card component that recommend a book to the user, used in the 
 *   recommendation section of home page. */


import Link from "next/link";
import Image from "next/image";

import styles from "./BookCard.module.css";

import { Book } from "@/types/book";


function BookCard({ book }: Readonly<{ book: Book; }>) {
  
  const href = `/book/${book.id}`;

  return (
    <Link className={styles.cardLink} href={href}>
      <div className={styles.coverContainer}>
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          sizes="150px"
          className={styles.coverImage}
        />
      </div>
      <div className={styles.content}>
        <div>

          <div className={styles.titleRow}>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.price}>
              Paper: ${book.paperPrice} / Digital: ${book.digitalPrice}
            </p>
          </div>

          <p className={styles.meta}>
            Author: {book.authorName} | Publisher: {book.publisherName} | Date: {book.publishDate}
          </p>

          <p className={styles.description}>{book.description}</p>

        </div>
        {book.isSoldOut && <p className={styles.soldOut}>Sold Out</p>}
      </div>
    </Link>
  );
};


export default BookCard;
