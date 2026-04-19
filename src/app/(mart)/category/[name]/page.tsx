/* Copyright (c) 2026, Yao Zeran
 *
 * The list of books classified based on category page. */


import { fetchBooksByCategoryName } from "@/services/api/book";


async function CategoryPage({ params }: Readonly<{ params : { name : string } }>) {

  const books = await fetchBooksByCategoryName(params.name);

  return (
    <main className="w-full px-4 py-6 md:px-6 md:py-8">
      
    </main>
  );
}


export default CategoryPage;
