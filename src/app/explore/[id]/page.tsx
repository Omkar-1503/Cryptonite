"use client"; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation for client-side routing
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Import useParams for accessing route parameters
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
import dayjs from 'dayjs';

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
  const { id } = useParams(); // Get the dynamic route parameter from useParams
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
          labels: prices.map((price: [number, number]) => dayjs(price[0]).format('YYYY-MM-DD')),
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

  if (loading) return <div className="text-gray-900">Loading...</div>;
  if (!coin) return <div className="text-gray-900">No data found</div>;

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
          color: '#1C1C1C',
        },
        ticks: {
          color: '#1C1C1C',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
          color: '#1C1C1C',
        },
        ticks: {
          color: '#1C1C1C',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1C1C1C',
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
    <div className="min-h-screen bg-gradient-to-b from-#CAEBF2 to-#A9A9A9 p-16 text-#1C1C1C">
      <h1 className="text-3xl font-bold mb-6">{coin.name}</h1>
      <div className="bg-#EFEFEF shadow-md rounded-lg p-4">
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={80}
          height={80}
        />
        <p className="text-#1C1C1C mt-4">{coin.description.en}</p>
        <p className="text-#1C1C1C mt-4">Current Price: ${coin.market_data.current_price.usd}</p>
      </div>
      <div className="bg-#EFEFEF shadow-md rounded-lg p-4 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Price Chart</h2>
        <div className="relative h-80">
          {chartData && <Line data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
