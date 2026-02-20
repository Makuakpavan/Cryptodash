export const formatPrice = (n, s = "$") =>
  n == null
    ? "N/A"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: n < 1 ? 6 : 2,
      })
        .format(n)
        .replace("$", s);

export const formatBigNumber = (n, s = "$") =>
  !n
    ? "N/A"
    : n >= 1e12
      ? `${s}${(n / 1e12).toFixed(2)}T`
      : n >= 1e9
        ? `${s}${(n / 1e9).toFixed(2)}B`
        : n >= 1e6
          ? `${s}${(n / 1e6).toFixed(2)}M`
          : `${s}${n.toFixed(2)}`;

export const formatPercent = (n) =>
  n == null ? "N/A" : `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

export const generateUID = () => Math.random().toString(36).slice(2);
