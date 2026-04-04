/* Copyright (c) 2026, Yao Zeran
 * 
 * The book category label */


const CategoryLabel = ({ name, image }: Readonly<{name: string, image: string}>) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <h4 className="relative z-10 text-sm font-semibold text-slate-900">
        {name}
      </h4>
      <img
        src={image}
        alt={name}
        className="absolute -right-6 top-0 h-24 w-24 rotate-45 object-cover opacity-25 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};


export default CategoryLabel;
