import React from 'react';

const PublicCompaniesHoldings = () => {
  const btcHoldings = [
    { company: 'MicroStrategy Inc.', symbol: 'NASDAQ:MSTR', total: '226,331 BTC', todaysValue: '$15.08B', percent: '1.078%' },
    { company: 'Marathon Digital Holdings', symbol: 'NASDAQ:MARA', total: '17,320 BTC', todaysValue: '$1.15B', percent: '0.082%' },
    { company: 'Galaxy Digital Holdings', symbol: 'TSE: GLXY', total: '15,449 BTC', todaysValue: '$1.03B', percent: '0.074%' },
    { company: 'Tesla, Inc.', symbol: 'NASDAQ:TSLA', total: '11,509 BTC', todaysValue: '$766.68M', percent: '0.055%' },
    { company: 'Coinbase Global, Inc', symbol: 'NASDAQ:COIN', total: '9,183 BTC', todaysValue: '$611.73M', percent: '0.044%' },
  ];

  const ethHoldings = [
    { company: 'Coinbase Global, Inc', symbol: 'NASDAQ:COIN', total: '96,086 ETH', todaysValue: '$335.19M', percent: '0.080%' },
    { company: 'Meitu Inc', symbol: 'HKG:1357', total: '31,000 ETH', todaysValue: '$108.14M', percent: '0.026%' },
    { company: 'Bit Digital, Inc', symbol: 'NASDAQ:BTBT', total: '20,241 ETH', todaysValue: '$70.61M', percent: '0.017%' },
    { company: 'Exodus Movement Inc', symbol: 'EXOD:OTCMKTS', total: '2,550 ETH', todaysValue: '$8.90M', percent: '0.002%' },
    { company: 'Mogo Inc.', symbol: 'NASDAQ:MOGO', total: '146 ETH', todaysValue: '$509.31K', percent: '0.000%' },
  ];

  const renderHoldings = (holdings: any[], key: string) => (
    <div className="relative overflow-hidden">
      <h3 className="text-2xl font-semibold mb-4 text-[#FF3B3F]">{key} Holdings</h3>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee">
          {holdings.concat(holdings).map((holding, index) => (
            <div key={index} className="bg-[#A9A9A9] rounded-lg shadow-lg p-4 w-64 h-40 mx-2">
              <h4 className="text-lg font-medium text-[#1C1C1C]">{holding.company}</h4>
              <p className="text-sm text-[#1C1C1C]">{holding.symbol}</p>
              <p><strong>Total {key === 'Bitcoin' ? 'Bitcoin' : 'Ethereum'}:</strong> {holding.total}</p>
              <p><strong>Value:</strong> {holding.todaysValue}</p>
              <p><strong>% of Total {key === 'Bitcoin' ? 'BTC' : 'ETH'} Supply:</strong> {holding.percent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#EFEFEF] text-[#1C1C1C] py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold mb-6 text-[#FF3B3F]">Public Companies Holdings</h2>
      <div className="flex flex-col gap-8">
        {renderHoldings(btcHoldings, 'Bitcoin')}
        {renderHoldings(ethHoldings, 'Ethereum')}
      </div>
    </div>
  );
};

export default PublicCompaniesHoldings;
