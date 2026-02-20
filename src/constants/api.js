export const API = "https://api.coingecko.com/api/v3";

export const CURRENCIES = ["usd", "eur", "gbp", "jpy"];

export const CURRENCY_SYMBOLS = {
  usd: "$",
  eur: "€",
  gbp: "£",
  jpy: "¥",
};

export const SORT_OPTIONS = [
  { l: "MCap ↓", v: "market_cap_desc" },
  { l: "MCap ↑", v: "market_cap_asc" },
  { l: "Price ↓", v: "price_desc" },
  { l: "Price ↑", v: "price_asc" },
  { l: "24h ↓", v: "change_desc" },
  { l: "24h ↑", v: "change_asc" },
  { l: "Volume ↓", v: "volume_desc" },
];

export const NAVIGATION = [
  { id: "dashboard", icon: "⊞" },
  { id: "watchlist", icon: "★" },
  { id: "portfolio", icon: "◎" },
  { id: "alerts", icon: "⚑" },
];

export const PAGE_METADATA = {
  dashboard: {
    title: "Market Overview",
    sub: "Live crypto prices & market data",
  },
  watchlist: { title: "My Watchlist", sub: "Your starred coins" },
  portfolio: { title: "Portfolio Tracker", sub: "Track holdings & P&L" },
  alerts: { title: "Price Alerts", sub: "Monitor price movements" },
};

export const PRICE_RANGES = [
  { l: "24H", v: 1 },
  { l: "7D", v: 7 },
  { l: "1M", v: 30 },
  { l: "3M", v: 90 },
  { l: "1Y", v: 365 },
];

export const CHART_TYPES = ["area", "bar"];
