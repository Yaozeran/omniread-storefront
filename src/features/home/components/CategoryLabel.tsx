/* Copyright (c) 2026, Yao Zeran
 * 
 * The book category label */


import Link from "next/link";

import styles from "./CategoryLabel.module.css";

import { Category } from "@/types/book";


function CategoryLabel ({ category }: Readonly<{ category: Category }>) {

  const href = `/category/${category.name.toLowerCase()}`;

  return (
    <Link href={href} className={styles.link}>
      <h4 className={styles.title}>
        {category.name}
      </h4>
      <img src={category.image} alt={category.name} className={styles.image}/>
    </Link>
  );
};


export default CategoryLabel;
