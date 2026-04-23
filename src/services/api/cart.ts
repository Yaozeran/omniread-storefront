/* Copyright (c) 2026, Yao Zeran 
 * 
 * The api services that fetch cart data. */


import { CartItem } from "@/types/ecommerce/cart";

import { fetchJson } from "@/services/http";


const sampleBooksInCart: CartItem[] = [
	{
		id: 1,
		itemId: 101,
		title: "Dune",
		author: {
			name: "Frank Herbert",
			url: "https://en.wikipedia.org/wiki/Frank_Herbert",
		},
		coverImage: "/sample/cover/dune-cover.jpg",
		price: 9.99,
		quantity: 1,
		type: "digital",
	},
	{
		id: 2,
		itemId: 102,
		title: "Spice and Wolf",
		author: {
			name: "Isuna Hasekura",
			url: "https://en.wikipedia.org/wiki/Isuna_Hasekura",
		},
		coverImage: "/sample/cover/spice-and-wolf-cover.jpg",
		price: 15.99,
		quantity: 1,
		type: "paper",
	},
	{
		id: 3,
		itemId: 103,
		title: "Solo Leveling",
		author: {
			name: "Chugong",
			url: "https://en.wikipedia.org/wiki/Chugong",
		},
		coverImage: "/sample/cover/solo-leveling-cover.jpg",
		price: 8.99,
		quantity: 2,
		type: "digital",
	},
];


export async function addBookToCart(userId: string, bookId: string) {
	return await fetchJson("/cart/add", {
		query: { userId: userId, bookId: bookId, },
	})
}

export async function fetchCartItems(userId: string) {
  try {
    const items = await fetchJson<CartItem[]>("/cart", {
      query: { userId: userId, },
    })
		return items;
  } catch (e) {
		return sampleBooksInCart;
  }
};
