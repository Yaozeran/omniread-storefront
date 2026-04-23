/* Copyright (c) 2026, Yao Zeran
 *
 * The cart page with two-column layout:
 *   left: books in cart
 *   right: checkout summary */

"use client";

import { useEffect, useState } from "react";

import { CartItem } from "@/types/ecommerce/cart";

import CartSection from "@/features/cart/components/CartSection";
import CheckoutSection from "@/features/cart/components/CheckoutSection";
import { useAuthContext } from "@/features/auth/context/AuthProvider";
import { fetchCartItemsByUserId } from "@/services/api/cart";


function CartPage() {

	const auth = useAuthContext();

	const [items, setItems] = useState<CartItem[]>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!auth?.user?.id) return;

		async function loadItemsInCart() {
			try {
				const data = await fetchCartItemsByUserId(auth.user.id);
				setItems(data);
			} catch (err) {
				console.error("Failed to load items in cart.", err);
			} finally {
				setLoading(false);
			}
		}
		setLoading(true);
		loadItemsInCart();
	}, [auth?.user?.id]) 

	if (!items) return undefined;

	return (
		<main className="w-full px-4 py-6 md:px-6 md:py-8">
			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
				<CartSection items={items} />
				<CheckoutSection items={items} />
			</div>
		</main>
	);
};


export default CartPage;
