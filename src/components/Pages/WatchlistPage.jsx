import { CoinCard } from "../Coin";
import { useApp } from "../../hooks/useApp";

export function WatchlistPage({ onSelect, sym, t }) {
  const { state } = useApp();
  const w = state.coins.filter((c) => state.watchlist.includes(c.id));

  if (!w.length)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "70px 20px",
          color: t.textFaint,
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 12 }}>☆</div>
        <div style={{ fontWeight: 600, color: t.textMuted, fontSize: 16 }}>
          Your watchlist is empty
        </div>
        <div style={{ fontSize: 13, marginTop: 7 }}>
          Click ☆ on any coin to add it here
        </div>
      </div>
    );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
        gap: 13,
      }}
    >
      {w.map((c) => (
        <CoinCard key={c.id} coin={c} onSelect={onSelect} sym={sym} t={t} />
      ))}
    </div>
  );
}
