/* Copyright (c) 2026, Yao Zeran
 *
 * The section that renders checkout summary. */


import styles from "./CheckoutSection.module.css";

import { CartItem } from "@/types/ecommerce/cart";


function Checkout({ items }: Readonly<{ items: CartItem[] }>) {
	
	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const shipping = subtotal >= 40 ? 0 : 4.99;
	
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	return (
		<div className={styles.card}>
			<h2 className={styles.heading}>Checkout Summary</h2>

			<div className={styles.summaryList}>
				<div className={styles.summaryRow}>
					<span>Subtotal</span>
					<span>${subtotal.toFixed(2)}</span>
				</div>
				<div className={styles.summaryRow}>
					<span>Shipping</span>
					<span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
				</div>
				<div className={styles.summaryRow}>
					<span>Tax</span>
					<span>${tax.toFixed(2)}</span>
				</div>
			</div>

			<div className={styles.divider} />

			<div className={styles.totalRow}>
				<span className={styles.totalLabel}>Order Total</span>
				<span className={styles.totalValue}>${total.toFixed(2)}</span>
			</div>

			<button className={styles.checkoutButton} type="button">
				Proceed to Checkout
			</button>

			<p className={styles.note}>Secure payment is powered by Stripe. You can review your order before final confirmation.</p>
		</div>
	);
};


function CheckoutSection({ items }: Readonly<{ items: CartItem[] }>) {
	return (
		<section className={styles.section}>
			<Checkout items={items} />
		</section>
	);
};

export default CheckoutSection;
