
import { MerchandiseMetadata, MerchandiseVariant } from "@/types/ecommerce/merchandise";

import { BookMetadata, BookSaleInfo } from "@/types/book";


export interface BookToMerchandiseConfig {
  digitalPrice: number;
  physicalPrice: number;

  currency: string;

  defaultStock?: number;
}


export function mapBookToMerchandise(book: BookMetadata, sale?: BookSaleInfo): MerchandiseMetadata {
  const variants: MerchandiseVariant[] = [];

  if (sale?.digitalPrice != null) {
    variants.push({
      id: `${book.id}-digital`,
      form: "digital",
      price: sale.digitalPrice,
      currency: "USD",
      ownerId: book.authorIds[0],
    });
  }

  if (sale?.paperPrice != null) {
    variants.push({
      id: `${book.id}-paper`,
      form: "physical",
      price: sale.paperPrice,
      currency: "USD",
      publisherId: book.publisherId ?? "unknown",
      stock: sale.paperInventory ?? 0,
    });
  }

  if (variants.length === 0) {
    throw new Error(
      `Book "${book.title}" (id=${book.id}) is not available for sale`
    );
  }

  return {
    id: `merch-${book.id}`,
    ref: `${book.id}`,
    
    type: "book",
    title: book.title,
    thumbnail: book.coverImage,

    variants,
  };
}