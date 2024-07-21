"use client";

import React from 'react';
import GlobalMarketCapChart from '@/components/GlobalMarketCapChart';
import PublicCompaniesHoldings from '@/components/PublicCompaniesHoldings';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const router = useRouter();

  const handleExploreMoreClick = () => {
    router.push('/explore');
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      <main className="flex flex-col md:flex-row justify-evenly items-start gap-8 mb-6">
        <div className="hero-content py-10 max-w-xl text-[#1C1C1C]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF3B3F]">
            Track Your Crypto Portfolio Like Never Before
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Real-time data, market insights, and personalized alerts<br></br>
            -- all at your fingertips.
          </p>
          <button
            className="bg-[#FF3B3F] text-[#EFEFEF] py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-[#CAEBF2] hover:text-[#1C1C1C] transition duration-300"
            onClick={handleExploreMoreClick}
          >
            Explore More
          </button>
        </div>
        <div className="chart-container w-full md:w-1/2">
          <GlobalMarketCapChart />
        </div>
      </main>
      <section className="mt-6">
        <PublicCompaniesHoldings />
      </section>
    </div>
  );
};

export default Homepage;
