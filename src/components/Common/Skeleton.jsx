export function Skeleton({ w = "100%", h = 14, r = 6, t }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: r,
        background: `linear-gradient(90deg,${t.shimmer1} 25%,${t.shimmer2} 50%,${t.shimmer1} 75%)`,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}
