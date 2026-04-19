/* Copyright (c) 2026, Yao Zeran
 *
 * The book details and sales info page. */


import { fetchBook } from "@/services";

import ListedBook from "@/features/book/components/ListedBook";


function BookPage({ params }: Readonly<{ params : { id : string } }>) {

  return (
    <main className="w-full px-4 py-6 md:px-6 md:py-8">
      <ListedBook bookId={params.id} />
    </main>
  );
}


export default BookPage;
