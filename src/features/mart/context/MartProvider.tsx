/* Copyright (c) 2026, Yao Zeran
 * 
 * The mart pages' context */


"use client";


import { createContext, useContext, useState, type ReactNode } from "react";

import { Category } from "@/types/book";


export const sampleCategories: Category[] = [
  { id: 1, name: 'Fiction', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Science', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'History', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Fantasy', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Biography', image: 'https://via.placeholder.com/150' },
];


interface MartContext {
  categories: Category[];
}
const MartContext = createContext<MartContext | null>(null);


interface MartProviderProps {
  children: ReactNode;
}


const MartProvider: React.FC<MartProviderProps> = ({ 
  children 
}: Readonly<{
  children: ReactNode
}>) => {
  const [categories] = useState<Category[]>(sampleCategories);
  return (
    <MartContext.Provider value={{ categories }}>
      {children}
    </MartContext.Provider>
  );
};


const useMartContext = () => {
  const context = useContext(MartContext);
  if (!context) {
    throw new Error("useMart must be used within a MartProvider");
  }
  return context;
};


export { useMartContext };
export default MartProvider;
