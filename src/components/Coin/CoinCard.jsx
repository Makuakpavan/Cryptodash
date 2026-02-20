import { Badge, Spark } from "../Common";
import { useApp } from "../../hooks/useApp";
import { formatPrice, formatBigNumber } from "../../utils/formatters";

export function CoinCard({ coin, onSelect, sym, t }) {
  const { state, dispatch } = useApp();
  const pos = coin.price_change_percentage_24h >= 0;
  const inW = state.watchlist.includes(coin.id);

  return (
    <div
      className="card-h"
      onClick={() => onSelect(coin)}
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 16,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <img
            src={coin.image}
            alt=""
            width={34}
            height={34}
            style={{ borderRadius: "50%", flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                fontWeight: 700,
                color: t.text,
                fontSize: 14,
                lineHeight: 1.2,
              }}
            >
              {coin.name}
            </div>
            <div style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>
              {coin.symbol.toUpperCase()}
            </div>
          </div>
        </div>
        <button
          className="ibtn"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "WATCH", payload: coin.id });
          }}
          style={{
            background: "none",
            border: "none",
            fontSize: 17,
            cursor: "pointer",
            color: inW ? t.yellow : t.border2,
            lineHeight: 1,
            padding: 2,
            flexShrink: 0,
          }}
        >
          {inW ? "★" : "☆"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span style={{ fontWeight: 800, color: t.text, fontSize: 16 }}>
          {formatPrice(coin.current_price, sym)}
        </span>
        <Badge val={coin.price_change_percentage_24h} t={t} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: t.textMuted,
          fontSize: 11,
          marginBottom: 10,
        }}
      >
        <span>
          MCap{" "}
          <b style={{ color: t.text, fontWeight: 600 }}>
            {formatBigNumber(coin.market_cap, sym)}
          </b>
        </span>
        <span>
          Vol{" "}
          <b style={{ color: t.text, fontWeight: 600 }}>
            {formatBigNumber(coin.total_volume, sym)}
          </b>
        </span>
      </div>
      <Spark data={coin.sparkline_in_7d?.price} pos={pos} t={t} />
    </div>
  );
}
