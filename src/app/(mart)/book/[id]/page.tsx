/* Copyright (c) 2026, Yao Zeran
 *
 * The book details and sales info page. */


import { fetchBookMetadata } from "@/services";

import ListedBook from "@/features/book/components/ListedBook";


async function BookPage({ params }: Readonly<{ params : { id : string } }>) {

  const book = await fetchBookMetadata(params.id);

  return (
    <main className="w-full px-4 py-6 md:px-6 md:py-8">
      <ListedBook book={book} />
    </main>
  );
}


export default BookPage;
