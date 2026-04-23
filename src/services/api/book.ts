/* Copyright (c) 2026, Yao Zeran 
 * 
 * The api services that fetch book data from the backend server. */


import { Book, BookMetadata, BookSaleInfo, Category } from "@/types/book";

import { fetchJson } from "@/services/http";


export const sampleBookMetadata: BookMetadata[] = [
  {
    id: "1",
    coverImage: '/sample/cover/dune-cover.jpg',
    title: 'Dune',
    authorIds: ["1"],
    publisherId: "1",
    publishedDate: '1965-08-01',
    description:
      `
      Set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs.
      Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis.
      While the planet is an inhospitable and sparsely populated desert wasteland, it is the only source of melange, or "the spice", a drug that extends life and enhances mental abilities.
      `
  },
  {
    id: "2",
    coverImage: '/sample/cover/eminence-in-shadow-cover.jpg',
    title: 'The Eminence in Shadow',
    authorIds: ["2"],
    publisherId: "2",
    publishedDate: '2018-11-05',
    description:
      `
      Great accomplishments and immense power mean nothing to the men and women who pull the strings of society from the shadows.
      That is a truth that Cid Kagenou has come to understand.
      In his past life, he was an ordinary, if slightly unhinged, Japanese student who trained his body to superhuman levels in hopes of becoming a hero.
      But, after a fatal encounter with a truck, he is reborn in a world of magic.
      `,
  },
  {
    id: "3",
    coverImage: '/sample/cover/solo-leveling-cover.jpg',
    title: 'Solo Leveling',
    authorIds: ["3"],
    publisherId: "3",
    publishedDate: '2018-07-26',
    description:
      `
      In a world where hunters — human warriors who possess supernatural abilities — must battle deadly monsters to protect the human race from certain annihilation.
      A notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.
      After narrowly surviving an overwhelmingly powerful double dungeon that nearly wipes out his entire party, a mysterious program called the System chooses him as its sole player.
      In turn, it gives him the extremely rare ability to level up in strength, possibly beyond any known limits.
      Jinwoo then decides to use this new power to become the strongest hunter in the world.
      `,
  },
  {
    id: "4",
    coverImage: '/sample/cover/spice-and-wolf-cover.jpg',
    title: 'Spice and Wolf',
    authorIds: ["4"],
    publisherId: "4",
    publishedDate: '2006-02-10',
    description:
      `
      The story revolves around Kraft Lawrence, a 25-year-old traveling merchant who peddles various goods from town to town to make a living in a stylized, fictional world with a historical setting with European influences.
      His main goal in life is to gather enough money to start his own shop, and he has already been traveling for seven years while gaining experience in the trade.
      One night when stopped at the town of Pasloe, he finds in his wagon a pagan wolf-deity girl named Holo who is over 600 years old.
      `,
  },
];

export const sampleBookSaleInfo: Record<string, BookSaleInfo> = {
  "1": { paperPrice: 18.99, digitalPrice: 14.99, paperInventory: 12, digitalInventory: 9999 },
  "2": { paperPrice: 14.99, digitalPrice: 9.99, paperInventory: 8, digitalInventory: 9999 },
  "3": { paperPrice: 24.99, digitalPrice: 19.99, paperInventory: 16, digitalInventory: 9999 },
  "4": { paperPrice: 12.99, digitalPrice: 8.99, paperInventory: 0, digitalInventory: 9999 },
};

export const sampleAuthorInfos: Record<string, string> = {
  "1": "Frank Herbert",
  "2": "Daisuke Aizawa",
  "3": "Chugong",
  "4": "Isuna Hasekura",
};

export const samplePublisherInfos: Record<string, string> = {
  "1": "Chilton Books",
  "2": "Enterbrain",
  "3": "D&C Media",
  "4": "ASCII Media Works",
};

export const sampleCategories: Category[] = [
  { id: "1", name: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: "2", name: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: "3", name: 'Science', image: 'https://via.placeholder.com/150' },
  { id: "4", name: 'History', image: 'https://via.placeholder.com/150' },
  { id: "5", name: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: "6", name: 'Biography', image: 'https://via.placeholder.com/150' },
];

export const sampleBooks: Record<string, Book> = {
  "1": { 
    metadata: sampleBookMetadata[1],
    saleinfo: sampleBookSaleInfo["1"],
   },
}


export async function fetchBookMetadata(bookId: string): Promise<BookMetadata> {
  try {
    return await fetchJson<BookMetadata>(`/books/metadata/${bookId}`);
  } catch (e) {
    return sampleBookMetadata[0];
  }
}


export async function fetchBookSaleInfo(bookId: string): Promise<BookSaleInfo> {
  try {
    return await fetchJson<BookMetadata & BookSaleInfo>(`/books/${bookId}/saleinfo`);
  } catch (e) {
    return sampleBookSaleInfo["1"];
  }
}


export async function fetchBook(bookId: string) {

}


export async function fetchCategories() {
  try {
    const categories = await fetchJson<Category[]>(`/categories`);
    return categories;
  } catch (e) {
    return sampleCategories;
  }
}


export async function fetchBooksByCategoryName(categoryName: string): Promise<BookMetadata[]> {
  try {
    return await fetchJson<BookMetadata[]>('/books', {
      query: { category: categoryName },
    });
  } catch (e) {
    return sampleBookMetadata;
  }
}


export async function fetchTrendingBooksMetadata(): Promise<BookMetadata[]> {
  try {
    const books = await fetchJson<BookMetadata[]>('/books/trending');
    return books;
  } catch (e) {
    return sampleBookMetadata;
  }
}


export async function fetchBooksRecommended(userId: string): Promise<Record<string, Book>> {
  try {
    const books = await fetchJson<Record<string, Book>>('/books/recommended', {
      query: { userId: userId },
    });
    return books;
  } catch (e) {
    return sampleBooks;
  }
}


export async function fetchAuthorDisplayName(bookId: string, authorId: string): Promise<string | null> {
  try {
    const result = await fetchJson<{ displayName: string }>(`/books/${bookId}/authors/${authorId}/display-name`);
    return result.displayName;
  } catch (e) {
    return sampleAuthorInfos[String(authorId)] ?? "Unknown Author";
  }
}


export async function fetchAuthorDisplayNames(bookId: string, authorIds: string[]): Promise<string[]> {
  const names = await Promise.all(authorIds.map((authorId) => fetchAuthorDisplayName(bookId, authorId)));
  return names.filter((name): name is string => Boolean(name && name.trim().length > 0));
}


export async function fetchPublisherDisplayName(bookId: string, publisherId: string): Promise<string> {
  
  try {
    const result = await fetchJson<{ displayName: string }>(`/books/${bookId}/publisher/${publisherId}/display-name`);
    return result.displayName;
  } catch (e) {
    return samplePublisherInfos[String(publisherId)] ?? "Unknown Publisher";
  }
}
