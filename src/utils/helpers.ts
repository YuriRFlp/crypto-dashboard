import type { MarketChartResponse } from "../interfaces";

export const formatMarketCap = (marketCap: number): string => {
  if (!marketCap) return '0';
  if (marketCap >= 1e12) return (marketCap / 1e12).toFixed(2) + ' T';
  if (marketCap >= 1e9) return (marketCap / 1e9).toFixed(3) + ' B';
  if (marketCap >= 1e6) return (marketCap / 1e6).toFixed(2) + ' M';
  return marketCap.toLocaleString();
}

export const formatPriceHistoricalData = (apiResponse: MarketChartResponse): { x: Date; y: number }[] => {
  if (!apiResponse || !apiResponse.prices) return [];

  return apiResponse.prices.map(([timestamp, price]) => {
    return {
      x: new Date(timestamp),
      y: price
    };
  });
}