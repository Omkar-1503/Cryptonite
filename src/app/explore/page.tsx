"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { addItem, removeItem } from '@/store/watchlistSlice';
import { useTheme } from '@/context/theme-context';

const ExplorePage = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const watchlistItems = useSelector((state: RootState) => state.watchlist.items);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 20,
              page: page,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page > 1 ? page - 1 : 1);
  };

  const toggleWatchlist = (coin: any) => {
    const isInWatchlist = watchlistItems.some(item => item.id === coin.id);
    if (isInWatchlist) {
      dispatch(removeItem(coin.id));
    } else {
      dispatch(addItem({ id: coin.id, name: coin.name, image: coin.image }));
    }
  };

  if (loading) return <div className="text-gray-900">Loading...</div>;

  return (
    <div className={`min-h-screen p-20 ${isDarkMode ? 'bg-[#1C1C1C] text-[#EFEFEF]' : 'bg-gradient-to-b from-[#EFEFEF] to-[#EFEFEF] text-[#1C1C1C]'}`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-[#FF3B3F]' : 'text-[#FF3B3F]'}`}>Explore Cryptocurrencies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coins.map((coin) => {
          const isInWatchlist = watchlistItems.some(item => item.id === coin.id);
          return (
            <div key={coin.id} className={`shadow-md rounded-lg p-4 transition duration-300 ${isDarkMode ? 'bg-[#333333] hover:bg-[#444444]' : 'bg-[#EFEFEF] hover:bg-[#A9A9A9]'}`}>
              <div className="flex items-center space-x-4">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={40}
                  height={40}
                />
                <div>
                  <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-[#EFEFEF]' : 'text-[#1C1C1C]'}`}>
                    <Link href={`/explore/${coin.id}`}>
                      {coin.name}
                    </Link>
                  </h2>
                  <p className={`${isDarkMode ? 'text-[#EFEFEF]' : 'text-[#1C1C1C]'}`}>${coin.current_price.toLocaleString()}</p>
                </div>
                <button onClick={() => toggleWatchlist(coin)}>
                  {isInWatchlist ? '⭐' : '☆'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded transition duration-300 ${isDarkMode ? 'bg-[#FF3B3F] text-[#1C1C1C] hover:bg-[#CAEBF2] hover:text-[#1C1C1C]' : 'bg-[#FF3B3F] text-[#EFEFEF] hover:bg-[#CAEBF2] hover:text-[#1C1C1C]'}`}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded transition duration-300 ${isDarkMode ? 'bg-[#FF3B3F] text-[#1C1C1C] hover:bg-[#CAEBF2] hover:text-[#1C1C1C]' : 'bg-[#FF3B3F] text-[#EFEFEF] hover:bg-[#CAEBF2] hover:text-[#1C1C1C]'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;
