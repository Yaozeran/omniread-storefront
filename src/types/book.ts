/* Copyright (c) 2026, Yao Zeran
 * 
 * The book related types and interfaces. */


import type { EpubIdentifier, EpubMetadata, EpubPackage, EpubLocation } from "@/types/epub";


export interface BookMetadata {
  /* identifier
   * 
   *   id: system unique identifier
   *   epubIdentifier: point to epub file  */

  id: string, 
  epubIdentifier?: EpubIdentifier,
  badgeIdentifier?: string,

  /* meta info 
   * 
   *   coverImage: url string  */

  title: string,
  coverImage?: string,
  description?: string,
  
  authorIds: string[],
  contributorIds?: string[],

  publisherId?: string,

  edition?: string,
  publishedDate?: string,

  seriesId?: string,
}


export interface Series {
  id: string,

  name: string,
  coverImage?: string,
  description?: string,

  authorIds: string[],

  publisherId?: string,
}


export interface Category {
  id: string;

  name: string;
  image?: string;
}


export interface BookSaleInfo {
  paperPrice?: number;
  paperInventory?: number;

  digitalPrice?: number;
  digitalInventory?: number;
}


export interface EpubInfo {
  metadata: EpubMetadata;
  sourcePath?: string;
  document?: EpubPackage;
}


export interface Book {
  metadata: BookMetadata;
  saleinfo: BookSaleInfo;
  epubinfo: EpubInfo;
}
