/* Copyright (c) 2026, Yao Zeran
 * 
 * The category section that allows user to search books by categories */


"use client";


import { useMartContext } from '@/features/mart/context/MartProvider';

import CategoryLabel from './components/CategoryLabel';


const CategorySection = () => {

  const { categories } = useMartContext();

  return (
    <section className="text-left">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">
        Find by Categories
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <CategoryLabel key={category.id} name={category.name} image={category.image}
          />
        ))}
      </div>
    </section>
  );
};


export default CategorySection;
