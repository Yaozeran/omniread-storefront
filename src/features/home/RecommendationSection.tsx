/* Copyright (c) 2026, Yao Zeran
 * 
 * The recommendation section component of the home page */


"use client";


import { useHomeContext } from "@/features/home/context/HomeProvider";

import BookCard from "./components/BookCard";


const RecommendedSection = () => {
  const { books } = useHomeContext();
  if (!books || books.length === 0) {
    return null;
  }
  return (
    <section className="text-left">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">Recommended</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <BookCard book={books[0]} />
      </div>
    </section>
  );
};


export default RecommendedSection;
