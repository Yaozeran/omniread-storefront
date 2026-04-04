/* Copyright (c) 2026, Yao Zeran
 * 
 * The trending book section of the home page */


"use client";


import Image from "next/image";

import { useHomeContext } from "./context/HomeProvider";


const TrendingSection = () => {

  const { books } = useHomeContext();

  return (
    <section className="text-left">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-700">
            Trending now
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Trending Books
          </h2>
        </div>
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {books.map((book) => (
          <article
            key={book.id}
            className="group w-[150px] shrink-0 snap-start"
          >
            <div className="relative h-[225px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                sizes="150px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 line-clamp-2 text-center text-sm font-medium text-slate-700">
              {book.title}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};


export default TrendingSection;
