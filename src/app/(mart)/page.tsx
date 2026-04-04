/* Copyright (c) 2026, Yao Zeran
 * 
 * The home page of the book mart, it consists of the following sections
 *   the trending book 
 *   the recommened book for user
 *   the search by categories section  */


import HomeProvider from "@/features/home/context/HomeProvider";

import CategorySection from "@/features/home/CategorySection";
import RecommendationSection from "@/features/home/RecommendationSection";
import TrendingSection from "@/features/home/TrendingSection";


const Home: React.FC = () => {
  return (
    <main className="flex flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <HomeProvider>
        <TrendingSection />
        <RecommendationSection />
        <div>
          <CategorySection />
        </div>
      </HomeProvider>
    </main>
  );
}


export default Home;
