/* Copyright (c) 2026, Yao Zeran
 * 
 * The cart items related types and interfaces. */


import { MerchandiseMetadata } from "./merchandise";


/* The ecommerce merchandise obj 
 *   
 *   userId: the owner of this cart item
 *   merchandise: the item's complete sale info 
 *   promotion: any promotion plan to this user  */
export interface CartItem {
  userId: string;

  merchandise: MerchandiseMetadata;

  promotion?: any;
}
