"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) return <div className="text-gray-900">Loading...</div>;
  if (!coin) return <div className="text-gray-900">No data found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-#CAEBF2 to-#A9A9A9 p-6 text-#1C1C1C">
      <h1 className="text-3xl font-bold mb-6">{coin.name}</h1>
      <div className="bg-#EFEFEF shadow-md rounded-lg p-4">
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={80}
          height={80}
          className="mb-4"
        />
        <p className="text-#1C1C1C">{coin.description.en}</p>
      </div>
    </div>
  );
};

export default ProductPage;
