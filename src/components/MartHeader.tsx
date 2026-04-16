/* Copyright (c) 2026 Yao Zeran
 * 
 * The mart pages' header component. */


import Link from "next/link";
import styles from "./MartHeader.module.css";


function MartHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <input
        type="search"
        placeholder="Search for books"
        className={styles.searchInput}
      />
      <div className={styles.linkGroup}>
        <Link href="/space" className={styles.link}>
          User
        </Link>
      </div>
      <div className={styles.linkGroup}>
        <Link href="/cart" className={styles.link}>
          Cart
        </Link>
      </div>
    </header>
  )
}


export default MartHeader;
