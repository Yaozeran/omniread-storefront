/* Copyright (c) 2026, Yao Zeran
 * 
 * The ecommerce merchandise types and interfaces. */


export type MerchandiseType = "book";

export type MerchandiseForm = "digital" | "physical";


export interface MerchandiseMetadata {
  id: string;
  ref: string;

  type: MerchandiseType;
  title: string;
  thumbnail?: string;

  variants: MerchandiseVariant[];
}


export type MerchandiseVariant =
  | DigitalVariant
  | PhysicalVariant;


interface MerchandiseVariantBase {
  id: string; // sku id
  
  form: MerchandiseForm;

  price: number;
  currency: string;
}


export interface DigitalVariant extends MerchandiseVariantBase {
  form: "digital";

  ownerId: string;
}


export interface PhysicalVariant extends MerchandiseVariantBase {
  form: "physical";

  publisherId: string; 
  
  stock: number;
}


