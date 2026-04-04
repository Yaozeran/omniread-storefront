/* Copyright (c) 2026, Yao Zeran
 * 
 * The book card component that recommend a book to the user, used in the 
 *   recommendation section of home page */


import Image from "next/image";

import { Book } from "@/types/book";


interface BookCardProps {
  book: Book;
}


const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="flex min-w-[400px] gap-4 border border-slate-300 rounded-lg bg-white p-4 shadow-sm">
      <div className="relative h-auto w-[150px] shrink-0 overflow-hidden rounded">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          sizes="150px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="font-semibold text-slate-900">{book.title}</h3>
            <p className="whitespace-nowrap text-sm text-slate-600">
              Paper: ${book.paperPrice} / Digital: ${book.digitalPrice}
            </p>
          </div>
          <p className="mb-3 text-sm text-slate-700">
            Author: {book.authorName} | Publisher: {book.publisherName} | Date: {book.publishDate}
          </p>
          <p className="text-sm text-slate-600">{book.description}</p>
        </div>
        {book.isSoldOut && <p className="mt-3 font-semibold text-red-600">Sold Out</p>}
      </div>
    </div>
  );
};


export default BookCard;