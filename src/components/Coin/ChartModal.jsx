import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Spinner, Chip } from "../Common";
import { useApp } from "../../hooks/useApp";
import { formatPrice, formatPercent } from "../../utils/formatters";
import { API, PRICE_RANGES, CHART_TYPES } from "../../constants/api";

export function ChartModal({ coin, onClose, sym, t }) {
  const [data, setData] = useState([]);
  const [busy, setBusy] = useState(true);
  const [range, setRange] = useState(7);
  const [ctype, setCtype] = useState("area");
  const { dispatch } = useApp();

  useEffect(() => {
    fetch(
      `${API}/coins/${coin.id}/market_chart?vs_currency=usd&days=${range}`
    )
      .then((r) => r.json())
      .then((d) => {
        const step = Math.ceil(d.prices.length / 80);
        setData(
          d.prices
            .filter((_, i) => i % step === 0)
            .map(([ts, p]) => ({
              date:
                range <= 1
                  ? new Date(ts).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : new Date(ts).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    }),
              price: parseFloat(p.toFixed(coin.current_price < 1 ? 6 : 2)),
            })),
        );
        setBusy(false);
      })
      .catch(() => {
        setBusy(false);
      });
  }, [coin.id, range, coin.current_price]);

  const pos = coin.price_change_percentage_24h >= 0;
  const color = pos ? t.green : t.red;
  const btnSt = (active) => ({
    padding: "5px 12px",
    borderRadius: 8,
    border: `1.5px solid ${active ? t.accent : t.border}`,
    background: active ? t.accent : t.surface2,
    color: active ? "#fff" : t.textMuted,
    fontSize: 12,
    cursor: "pointer",
    transition: "all .15s",
    fontWeight: 500,
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backdropFilter: "blur(6px)",
        animation: "fadeIn .2s",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.surface,
          border: `1px solid ${t.border2}`,
          borderRadius: 18,
          padding: "20px",
          width: "100%",
          maxWidth: 720,
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "fadeUp .2s",
          boxShadow: t.shadow,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={coin.image}
              alt=""
              width={36}
              height={36}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  color: t.text,
                  lineHeight: 1,
                }}
              >
                {coin.name}
              </div>
              <div style={{ color: t.textMuted, fontSize: 12, marginTop: 3 }}>
                {coin.symbol.toUpperCase()}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => dispatch({ type: "WATCH", payload: coin.id })}
              style={{ ...btnSt(false), color: t.yellow }}
            >
              ★ Watch
            </button>
            <button
              onClick={onClose}
              style={{
                background: t.surface2,
                border: `1px solid ${t.border}`,
                borderRadius: 8,
                color: t.textMuted,
                width: 30,
                height: 30,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))",
            gap: 9,
            marginBottom: 16,
          }}
        >
          {[
            { l: "Price", v: formatPrice(coin.current_price, sym) },
            {
              l: "24h",
              v: formatPercent(coin.price_change_percentage_24h),
              c: pos ? t.green : t.red,
            },
            { l: "MCap", v: formatPrice(coin.market_cap, sym) },
            { l: "Volume", v: formatPrice(coin.total_volume, sym) },
            { l: "ATH", v: formatPrice(coin.ath, sym) },
            {
              l: "Supply",
              v: coin.circulating_supply
                ? `${(coin.circulating_supply / 1e6).toFixed(1)}M`
                : "N/A",
            },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                background: t.surface2,
                borderRadius: 10,
                padding: "9px 11px",
              }}
            >
              <div
                style={{ color: t.textFaint, fontSize: 10, marginBottom: 3 }}
              >
                {s.l}
              </div>
              <div
                style={{
                  color: s.c || t.text,
                  fontWeight: 700,
                  fontSize: 13,
                  wordBreak: "break-word",
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {PRICE_RANGES.map((r) => (
              <button
                key={r.v}
                onClick={() => setRange(r.v)}
                style={{
                  ...btnSt(range === r.v),
                }}
              >
                {r.l}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {CHART_TYPES.map((tp) => (
              <button
                key={tp}
                onClick={() => setCtype(tp)}
                style={{ ...btnSt(ctype === tp), textTransform: "capitalize" }}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        {busy ? (
          <div
            style={{
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner t={t} size={32} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            {ctype === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: t.textFaint, fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: t.textFaint, fontSize: 10 }}
                  domain={["auto", "auto"]}
                  tickFormatter={(v) =>
                    v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
                  }
                  width={58}
                />
                <Tooltip
                  contentStyle={{
                    background: t.tooltipBg,
                    border: `1px solid ${t.border2}`,
                    borderRadius: 8,
                    color: t.text,
                    fontSize: 12,
                  }}
                  formatter={(v) => [formatPrice(v), "Price"]}
                />
                <Bar dataKey="price" fill={color} radius={[3, 3, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: t.textFaint, fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: t.textFaint, fontSize: 10 }}
                  domain={["auto", "auto"]}
                  tickFormatter={(v) =>
                    v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
                  }
                  width={58}
                />
                <Tooltip
                  contentStyle={{
                    background: t.tooltipBg,
                    border: `1px solid ${t.border2}`,
                    borderRadius: 8,
                    color: t.text,
                    fontSize: 12,
                  }}
                  formatter={(v) => [formatPrice(v), "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  dot={false}
                  strokeWidth={2}
                  stroke={color}
                  fill="url(#cg)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
