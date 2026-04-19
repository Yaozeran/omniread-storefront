/* Copyright (c) 2026 Yao Zeran
 * 
 * The mart pages' header component. */


"use client";


import Link from "next/link";

import styles from "./MartHeader.module.css";
import { useAuthContext } from "@/features/auth/context/AuthProvider";


function MartHeader() {

  const auth = useAuthContext();

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
          {auth.user?.metadata.name ?? "User"}
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
