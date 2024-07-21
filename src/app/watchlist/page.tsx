"use client";

import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { removeItem } from '@/store/watchlistSlice';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';

const WatchlistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.watchlist.items);
  const { isDarkMode } = useTheme();

  const removeFromWatchlist = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className={`min-h-screen p-20 ${isDarkMode ? 'bg-[#1C1C1C] text-[#EFEFEF]' : 'bg-[#EFEFEF] text-[#1C1C1C]'}`}>
      <header className="text-center mb-8">
        <h1 className={`text-3xl md:text-5xl font-extrabold ${isDarkMode ? 'text-[#FF3B3F]' : 'text-[#FF3B3F]'}`}>Watchlist</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((coin) => (
          <div
            key={coin.id}
            className={`shadow-md rounded-lg p-6 transition duration-300 ${isDarkMode ? 'bg-[#333333] hover:bg-[#444444] text-[#EFEFEF]' : 'bg-[#EFEFEF] hover:bg-[#A9A9A9] text-[#1C1C1C]'}`}
          >
            <div className="flex items-center space-x-4">
              <Image
                src={coin.image}
                alt={coin.name}
                width={60}
                height={60}
              />
              <div className="flex-1">
                <Link href={`/explore/${coin.id}`} className={`text-xl font-semibold block truncate ${isDarkMode ? 'text-[#FF3B3F]' : 'text-[#FF3B3F]'}`}>
                  {coin.name}
                </Link>
                <button
                  onClick={() => removeFromWatchlist(coin.id)}
                  className={`ml-auto ${isDarkMode ? 'text-[#FF3B3F] hover:text-[#EFEFEF]' : 'text-[#FF3B3F] hover:text-[#1C1C1C]'}`}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default WatchlistPage;
