/* Copyright (c) 2026, Yao Zeran
 * 
 * The recommendation section component of the home page */


"use client";

import { useEffect, useState } from "react";

import styles from "./RecommendationSection.module.css";

import { useAuthContext } from "@/features/auth/context/AuthProvider";

import { Book } from "@/types/book";

import { fetchBooksRecommendedByUserId } from "@/services";

import BookCard from "@/features/home/components/BookCard";


function RecommendedSection() {

  const auth = useAuthContext(); 

  const [books, setBooks] = useState<Book[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    if (!auth?.user?.id) return;

    async function loadRecommendedBooks() {
      try {
        const data = await fetchBooksRecommendedByUserId(auth.user.id);
        setBooks(data);
      } catch (err) {
        console.error("Failed to load recommended books", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedBooks();

  }, [books])
  

  if (!books || books.length === 0) {
    return null;
  }
  
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Recommended</h2>
      <div className={styles.scrollRow}>
        <BookCard book={books[0]} />
      </div>
    </section>
  );
};


export default RecommendedSection;
