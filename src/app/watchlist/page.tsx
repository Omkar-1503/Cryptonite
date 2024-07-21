"use client";

import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { removeItem } from '@/store/watchlistSlice';
import Image from 'next/image';

const WatchlistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.watchlist.items);

  const removeFromWatchlist = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFEFEF] to-[#EFEFEF] p-16 text-[#1C1C1C]">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#FF3B3F]">Watchlist</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((coin) => (
          <div
            key={coin.id}
            className="bg-[#EFEFEF] shadow-md rounded-lg p-6 hover:bg-[#A9A9A9] transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={coin.image}
                alt={coin.name}
                width={60}
                height={60}
              />
              <div className="flex-1">
                <Link href={`/explore/${coin.id}`} className="text-xl font-semibold text-[#FF3B3F] block truncate">
                  {coin.name}
                </Link>
                <button
                  onClick={() => removeFromWatchlist(coin.id)}
                  className="ml-auto text-[#FF3B3F] hover:text-[#1C1C1C]"
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
