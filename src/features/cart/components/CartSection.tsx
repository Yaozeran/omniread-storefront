/* Copyright (c) 2026, Yao Zeran
 *
 * The section that renders books in cart. */


import Image from "next/image";

import styles from "./CartSection.module.css";

import { CartItem } from "@/types/ecommerce/cart";


function Cart({ items }: Readonly<{ items: CartItem[] }>) {
	return (
		<div className={styles.list}>
			{items.map((item) => (
				<article key={item.merchandise.id} className={styles.card}>
					<div className={styles.coverFrame}>
						<Image
							src={item.merchandise.thumbnail ?? "https://via.placeholder.com/150"}
							alt={item.merchandise.title}
							fill
							sizes="80px"
							className={styles.coverImage}
						/>
					</div>

					<div className={styles.content}>
						<div className={styles.headerRow}>
							<div>
								<h3 className={styles.title}>{item.merchandise.title}</h3>
								<p className={styles.author}>{item.merchandise.}</p>
								<p className={styles.typeBadge}>
									{item.type}
								</p>
							</div>

							<p className={styles.price}>${(item.price * item.quantity).toFixed(2)}</p>
						</div>

						<div className={styles.footerRow}>
							<div className={styles.quantityControl}>
								<button className={styles.quantityButton} aria-label="Decrease quantity" type="button">
									-
								</button>
								<span className={styles.quantity}>{item.quantity}</span>
								<button className={styles.quantityButton} aria-label="Increase quantity" type="button">
									+
								</button>
							</div>

							<button className={styles.removeButton} type="button">
								Remove
							</button>
						</div>
					</div>
				</article>
			))}
		</div>
	);
};


function CartSection({ items }: Readonly<{ items: CartItem[] }>) {
	return (
		<section className={styles.section}>

			<div>
				<p className={styles.kicker}>Cart</p>
				<h1 className={styles.title}>Books in your cart</h1>
				<p className={styles.description}>Review your items before checkout.</p>
			</div>

			<Cart items={items} />

		</section>
	);
};


export default CartSection;
