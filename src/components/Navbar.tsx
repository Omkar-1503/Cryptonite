"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { useTheme } from '@/context/theme-context';

interface Coin {
  id: string;
  name: string;
  large: string;
}

const Navbar = () => {
  const { isDarkMode } = useTheme();
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
    <nav className={`p-4 px-20 shadow-md ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-900'}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className={`text-${isDarkMode ? 'red-400' : 'red-600'} text-2xl font-extrabold tracking-wider`}>
          <Link href="/" className="flex items-center space-x-2">
            <span>Cryptonite</span>
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link href="/" className={`text-${isDarkMode ? 'red-400' : 'red-600'} text-lg hover:text-${isDarkMode ? 'gray-200' : 'gray-700'} transition-colors`}>
            Home
          </Link>
          <Link href="/explore" className={`text-${isDarkMode ? 'red-400' : 'red-600'} text-lg hover:text-${isDarkMode ? 'gray-200' : 'gray-700'} transition-colors`}>
            Explore
          </Link>
          <Link href="/watchlist" className={`text-${isDarkMode ? 'red-400' : 'red-600'} text-lg hover:text-${isDarkMode ? 'gray-200' : 'gray-700'} transition-colors`}>
            Watchlist
          </Link>
        </div>
        <div className="relative flex-1 max-w-[25%] lg:max-w-[25%]">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for a cryptocurrency..."
            className={`w-full p-3 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-600'} focus:outline-none focus:ring-2 focus:ring-red-400`}
          />
          {suggestions.length > 0 && (
            <ul className={`absolute top-full left-0 border rounded-lg mt-1 w-full max-h-60 overflow-y-auto z-10 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
              {suggestions.map((coin) => (
                <li
                  key={coin.id}
                  onClick={() => handleSelectSuggestion(coin.id)}
                  className={`p-3 cursor-pointer hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center space-x-2`}
                >
                  <Image src={coin.large} alt={coin.name} width={24} height={24} className="rounded" />
                  <span>{coin.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
