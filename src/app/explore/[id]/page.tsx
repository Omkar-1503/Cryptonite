"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useTheme } from '@/context/theme-context';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [coin, setCoin] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(response.data);

        const marketChartResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: '365',
              interval: 'daily',
            },
          }
        );

        const { prices } = marketChartResponse.data;
        const formattedChartData = {
          labels: prices.map((price: [number, number]) => new Date(price[0]).toISOString().split('T')[0]),
          datasets: [
            {
              label: 'Price',
              data: prices.map((price: [number, number]) => price[1]),
              borderColor: '#FF3B3F',
              backgroundColor: '#A9193A',
              fill: false,
            },
          ],
        };
        setChartData(formattedChartData);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) return <div className={isDarkMode ? 'text-[#EFEFEF]' : 'text-[#1C1C1C]'}>Loading...</div>;
  if (!coin) return <div className={isDarkMode ? 'text-[#EFEFEF]' : 'text-[#1C1C1C]'}>No data found</div>;

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: true,
          text: 'Date',
          color: isDarkMode ? '#EFEFEF' : '#1C1C1C',
        },
        ticks: {
          color: isDarkMode ? '#EFEFEF' : '#1C1C1C',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
          color: isDarkMode ? '#EFEFEF' : '#1C1C1C',
        },
        ticks: {
          color: isDarkMode ? '#EFEFEF' : '#1C1C1C',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#EFEFEF' : '#1C1C1C',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = (tooltipItem.raw as number).toFixed(2);
            return `${tooltipItem.dataset.label}: $${value}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 3,
      },
    },
  };

  return (
    <div className={`min-h-screen p-16 ${isDarkMode ? 'bg-[#1C1C1C] text-[#EFEFEF]' : 'bg-[#EFEFEF] text-[#1C1C1C]'}`}>
      <h1 className="text-3xl font-bold mb-6">{coin.name}</h1>
      <div className={`shadow-md rounded-lg p-4 ${isDarkMode ? 'bg-[#333333]' : 'bg-[#EFEFEF]'}`}>
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={80}
          height={80}
        />
        <p className={`mt-4 ${isDarkMode ? 'text-[#EFEFEF]' : 'text-[#1C1C1C]'}`}>{coin.description.en}</p>
        <p className={`mt-4 ${isDarkMode ? 'text-[#EFEFEF]' : 'text-[#1C1C1C]'}`}>Current Price: ${coin.market_data.current_price.usd}</p>
      </div>
      <div className={`shadow-md rounded-lg p-4 mt-6 ${isDarkMode ? 'bg-[#333333]' : 'bg-[#EFEFEF]'}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-[#FF3B3F]' : 'text-[#FF3B3F]'}`}>Price Chart</h2>
        <div className="relative h-80">
          {chartData && <Line data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
