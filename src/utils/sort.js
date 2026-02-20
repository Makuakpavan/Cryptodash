export const sortCoins = (coins, key) => {
  const c = [...coins];
  switch (key) {
    case "market_cap_asc":
      return c.sort((a, b) => a.market_cap - b.market_cap);
    case "price_desc":
      return c.sort((a, b) => b.current_price - a.current_price);
    case "price_asc":
      return c.sort((a, b) => a.current_price - b.current_price);
    case "change_desc":
      return c.sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
      );
    case "change_asc":
      return c.sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
      );
    case "volume_desc":
      return c.sort((a, b) => b.total_volume - a.total_volume);
    default:
      return c.sort((a, b) => b.market_cap - a.market_cap);
  }
};
