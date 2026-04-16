/* Copyright (c) 2026, Yao Zeran
 *
 * The book details and sales info page. */


import { fetchBookById } from "@/services";

import ListedBook from "@/features/book/components/ListedBook";


type Props = {
  params : {
    id: string,
  },
};


async function BookPage({ params }: Props) {

  const book = await fetchBookById(params.id);

  return (
    <main className="w-full px-4 py-6 md:px-6 md:py-8">
      <ListedBook book={book} />
    </main>
  );
}


export default BookPage;
