"use client";

/* Copyright (c) 2026 Yao Zeran
 * 
 * The mart pages' footer component. */


import Link from "next/link";

import { useMartContext } from "@/features/mart/context/MartProvider";


const Twitter = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-current"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.658l-5.226-6.828-5.976 6.828H1.658l7.73-8.84L1.233 2.25h6.827l4.713 6.231 5.471-6.231Zm-1.16 17.718h1.833L7.064 4.126H5.098l11.986 15.842Z" />
  </svg>
);


const Instagram = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-current"
  >
    <path d="M7 2.5A4.5 4.5 0 0 0 2.5 7v10A4.5 4.5 0 0 0 7 21.5h10A4.5 4.5 0 0 0 21.5 17V7A4.5 4.5 0 0 0 17 2.5H7Zm10 2A2.5 2.5 0 0 1 19.5 7v10A2.5 2.5 0 0 1 17 19.5H7A2.5 2.5 0 0 1 4.5 17V7A2.5 2.5 0 0 1 7 4.5h10Zm-5 2.75A4.75 4.75 0 1 0 16.75 12 4.76 4.76 0 0 0 12 5.25Zm0 2A2.75 2.75 0 1 1 9.25 10 2.75 2.75 0 0 1 12 7.25Zm5.5-2.5a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25Z" />
  </svg>
);


const Mail = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-current"
  >
    <path d="M4 5.5A2.5 2.5 0 0 0 1.5 8v8A2.5 2.5 0 0 0 4 18.5h16A2.5 2.5 0 0 0 22.5 16V8A2.5 2.5 0 0 0 20 5.5H4Zm16 2-8 5.25L4 7.5h16ZM4 16.5V9.02l7.45 4.89a1 1 0 0 0 1.1 0L20 9.02v7.48H4Z" />
  </svg>
);


const MartFooter = () => {
  const { categories } = useMartContext();

  return (
    <footer className="bg-gray-800 text-white py-8">

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start">
          <div className="flex space-x-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Book Store</h3>
              <p className="text-gray-400">
                Your favorite place to find and read books.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="flex flex-row space-x-4">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/home?category=${category.id}`}
                      className="hover:text-gray-300"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Twitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Instagram />
              </a>
              <a
                href="mailto:support@bookstore.com"
                className="hover:text-gray-300"
              >
                <Mail />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          <p>&copy; 2026 Book Store. All rights reserved.</p>
          <p>Built by Yao Zeran</p>
        </div>
      </div>
    </footer>
  );
};


export default MartFooter;
