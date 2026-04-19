/* Copyright (c) 2026, Yao Zeran
 * 
 * The cart and sale item related types and interfaces. */


export type SaleType = 'paper' | 'digital';


export interface CartItem {
  id: string;

  type: SaleType;
  price: number;
	quantity: number;

  /* meta info */

	title: string;
  coverImage?: string;
  
  authorIds: string[];
}
