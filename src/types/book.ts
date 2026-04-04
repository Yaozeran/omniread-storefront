/* Copyright (c) 2026, Yao Zeran
 * 
 * The book related types and interfaces */


import type { StaticImageData } from "next/image";


export interface Book {
  // the ibsn of the book
  id: number, 

  // basic info
  title: string,
  coverImage: string | StaticImageData,
  description?: string,
  
  authorId: number,
  authorName: string,

  publisherId: number,
  publisherName: string,

  edition?: number,
  publishDate: string,

  // series
  seriesId?: number,
  
  // market info
  paperPrice: number,
  digitalPrice: number,  

  isSoldOut: boolean,
}


export interface Series {
  id: number,

  name: string,

  authorId: number,
  authorName: string,
}


export interface Category {
  id: number,
  name: string,
  image: string,
}


export interface Bookshelf {
  books: Book[],
  bookCategoryMap: Record<number, Category>,
}
