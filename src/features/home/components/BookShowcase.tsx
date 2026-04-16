/* Copyright (c) 2026, Yao Zeran
 * 
 * The book showcase with a cover image and title. */


import Link from "next/link";
import Image from "next/image";

import styles from "./BookShowcase.module.css";

import { Book } from "@/types/book";


function BookShowcase({ book }: Readonly<{ book: Book; }>) {

  const href = `/book/${book.id}`;

  return (
    <Link href={href} className={styles.link}>
      <article key={book.id} className={styles.article}>
        <div className={styles.coverFrame}>
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="150px"
            className={styles.coverImage}
          />
        </div>
        <p className={styles.title}>
          {book.title}
        </p>
      </article>
    </Link>
  )
}


export default BookShowcase;
