import { Badge, Spark } from "../Common";
import { useApp } from "../../hooks/useApp";
import { formatPrice, formatBigNumber } from "../../utils/formatters";

export function CoinRow({ coin, rank, onSelect, sym, t }) {
  const { state, dispatch } = useApp();
  const pos = coin.price_change_percentage_24h >= 0;
  const inW = state.watchlist.includes(coin.id);

  return (
    <div
      className="row-h"
      onClick={() => onSelect(coin)}
      style={{
        display: "grid",
        gridTemplateColumns:
          "28px 24px minmax(120px,2fr) 90px 80px minmax(90px,1fr) 100px",
        gap: 8,
        padding: "10px 14px",
        borderBottom: `1px solid ${t.border}`,
        alignItems: "center",
        cursor: "pointer",
        transition: "background .12s",
      }}
    >
      <button
        className="ibtn"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "WATCH", payload: coin.id });
        }}
        style={{
          background: "none",
          border: "none",
          fontSize: 13,
          cursor: "pointer",
          color: inW ? t.yellow : t.border2,
          padding: 0,
        }}
      >
        {inW ? "★" : "☆"}
      </button>
      <span style={{ color: t.textFaint, fontSize: 11, fontWeight: 600 }}>
        {rank}
      </span>
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}
      >
        <img
          src={coin.image}
          alt=""
          width={22}
          height={22}
          style={{ borderRadius: "50%", flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              color: t.text,
              fontSize: 13,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {coin.name}
          </div>
          <div style={{ color: t.textMuted, fontSize: 10 }}>
            {coin.symbol.toUpperCase()}
          </div>
        </div>
      </div>
      <span style={{ fontWeight: 700, color: t.text, fontSize: 13 }}>
        {formatPrice(coin.current_price, sym)}
      </span>
      <Badge val={coin.price_change_percentage_24h} t={t} />
      <span style={{ color: t.textMuted, fontSize: 12 }}>
        {formatBigNumber(coin.market_cap, sym)}
      </span>
      <Spark data={coin.sparkline_in_7d?.price} pos={pos} t={t} h={38} />
    </div>
  );
}
