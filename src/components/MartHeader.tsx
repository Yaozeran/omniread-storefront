/* Copyright (c) 2026 Yao Zeran
 * 
 * The mart pages' header component. */


import Link from "next/link";


const MartHeader: React.FC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-300 px-4 py-4">
      <div>Logo</div>
      <input
        type="search"
        placeholder="Search for books"
        className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none md:w-[300px]"
      />
      <div>
        <Link href="/space">User</Link>
      </div>
      <div>
        <Link href="/cart">Cart</Link>
      </div>
    </header>
  )
}


export default MartHeader;
