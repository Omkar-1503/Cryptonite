"use client";

import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
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

interface MarketCapData {
  market_caps: [number, number][];
}

const GlobalMarketCapChart = () => {
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatNumber = (num: number) => {
    if (num >= 1e12) {
      return `${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M`;
    }
    return num.toString();
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const cryptocurrencies = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'solana'];
        const days = '365'; // Fetch data for 1 year

        const promises = cryptocurrencies.map((crypto) =>
          axios.get<MarketCapData>(
            `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart`,
            {
              params: {
                vs_currency: 'usd',
                days: days,
                localization: 'false'
              },
            }
          )
        );

        const responses = await Promise.all(promises);

        const datasets = responses.map((response, index) => {
          const { market_caps } = response.data;
          // Aggregate data to monthly
          const monthlyData = market_caps.reduce((acc: { x: string; y: number }[], [timestamp, marketCap], idx) => {
            const month = dayjs(timestamp).startOf('month').format('YYYY-MM-DD');
            if (!acc.length || acc[acc.length - 1].x !== month) {
              acc.push({ x: month, y: marketCap });
            }
            return acc;
          }, []);

          const colors = [
            '#FF4B5C', // Bitcoin
            '#6C5B7B', // Ethereum
            '#C06C84', // Tether
            '#F67280', // Binance Coin
            '#F8B400'  // Solana
          ];

          return {
            label: cryptocurrencies[index],
            data: monthlyData,
            borderColor: colors[index],
            backgroundColor: colors[index].replace('rgb', 'rgba').replace(')', ', 0.2)'),
            fill: false,
          };
        });

        setChartData({
          datasets: datasets,
        });

        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, []);

  if (loading) return <div className="text-gray-900">Loading...</div>;
  if (error) return <div className="text-gray-900">Error loading data: {error}</div>;

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month', // Group data by month
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
          text: 'Market Cap (USD)',
          color: '#1C1C1C',
        },
        ticks: {
          color: '#1C1C1C',
          callback: (value) => formatNumber(value as number),
          stepSize: 10000000000, // Set step size to 10 billion
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
            const value = (tooltipItem.raw as { y: number }).y;
            return `${tooltipItem.dataset.label}: $${formatNumber(value)}`;
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
    <div className="bg-[#EFEFEF] shadow-lg rounded-lg p-4 w-full max-w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#1C1C1C]">Global Market Cap Chart</h2>
      <div className="relative h-80 md:h-96"> {/* Adjusted height */}
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GlobalMarketCapChart;
