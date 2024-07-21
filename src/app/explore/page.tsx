"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { addItem, removeItem } from '@/store/watchlistSlice';

const ExplorePage = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const watchlistItems = useSelector((state: RootState) => state.watchlist.items);

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
        setLoading(false);
      } catch (error) {
        console.error(error);
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
    <div className="min-h-screen bg-gradient-to-b from-[#EFEFEF] to-[#EFEFEF] p-16 text-[#1C1C1C]">
      <h1 className="text-3xl font-bold mb-6 text-[#FF3B3F]">Explore Cryptocurrencies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coins.map((coin) => {
          const isInWatchlist = watchlistItems.some(item => item.id === coin.id);
          return (
            <div key={coin.id} className="bg-[#EFEFEF] shadow-md rounded-lg p-4 hover:bg-[#A9A9A9] transition duration-300">
              <div className="flex items-center space-x-4">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={40}
                  height={40}
                />
                <div>
                  <h2 className="text-xl font-semibold text-[#1C1C1C]">
                    <Link href={`/explore/${coin.id}`}>
                      {coin.name}
                    </Link>
                  </h2>
                  <p className="text-[#1C1C1C]">${coin.current_price.toLocaleString()}</p>
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
          className="bg-[#FF3B3F] text-[#EFEFEF] px-4 py-2 rounded hover:bg-[#CAEBF2] hover:text-[#1C1C1C] transition duration-300"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-[#FF3B3F] text-[#EFEFEF] px-4 py-2 rounded hover:bg-[#CAEBF2] hover:text-[#1C1C1C] transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;
