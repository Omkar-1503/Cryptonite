"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

interface Coin {
  id: string;
  name: string;
  large: string;
}

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Coin[]>([]);
  const router = useRouter();

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
        setSuggestions(response.data.coins as Coin[]);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (id: string) => {
    setSearchQuery('');
    setSuggestions([]);
    router.push(`/explore/${id}`);
  };

  return (
    <nav className="bg-gradient-to-r from-[#EFEFEF] to-[#EFEFEF] p-4 shadow-md">
      <div className="container mx-auto flex justify-evenly px-16 items-center space-x-6">
        <div className="text-[#FF3B3F] text-2xl font-extrabold tracking-wider">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-[#FF3B3F]">Cryptonite</span>
          </Link>
        </div>
        <div className="container mx-auto flex justify-end items-center space-x-6">
            <div className="flex space-x-8">
            <Link href="/" className="text-[#FF3B3F] text-lg hover:text-[#A9A9A9] transition-colors">
                Home
            </Link>
            <Link href="/explore" className="text-[#FF3B3F] text-lg hover:text-[#A9A9A9] transition-colors">
                Explore
            </Link>
            <Link href="/watchlist" className="text-[#FF3B3F] text-lg hover:text-[#A9A9A9] transition-colors">
                Watchlist
            </Link>
            </div>
            <div className="relative flex-1 max-w-[25%] lg:max-w-[25%]">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for a cryptocurrency..."
                className="w-full p-3 border border-[#A9A9A9] rounded-lg bg-[#EFEFEF] text-[#1C1C1C] placeholder-[#A9A9A9] focus:outline-none focus:ring-2 focus:ring-[#FF3B3F]"
            />
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 bg-[#EFEFEF] border border-[#A9A9A9] rounded-lg mt-1 w-full max-h-60 overflow-y-auto z-10 text-[#1C1C1C]">
                {suggestions.map((coin) => (
                    <li
                    key={coin.id}
                    onClick={() => handleSelectSuggestion(coin.id)}
                    className="p-3 cursor-pointer hover:bg-[#A9A9A9] flex items-center space-x-2"
                    >
                    <Image src={coin.large} alt={coin.name} width={24} height={24} className="rounded" />
                    <span>{coin.name}</span>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
