import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatBox } from "../Common";
import { useApp } from "../../hooks/useApp";
import { formatPrice, formatPercent } from "../../utils/formatters";

export function PortfolioPage({ sym, t }) {
  const { state, dispatch } = useApp();
  const [form, setForm] = useState({ coinId: "", amount: "", buyPrice: "" });

  const inp = {
    width: "100%",
    marginBottom: 9,
    padding: "8px 10px",
    background: t.surface2,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    color: t.text,
    fontSize: 13,
    outline: "none",
  };

  const holdings = state.portfolio
    .map((h) => {
      const coin = state.coins.find((c) => c.id === h.id);
      if (!coin) return null;
      const value = coin.current_price * h.amount,
        cost = h.buyPrice * h.amount,
        pnl = value - cost;
      return {
        ...h,
        coin,
        value,
        cost,
        pnl,
        pnlPct: cost > 0 ? (pnl / cost) * 100 : 0,
      };
    })
    .filter(Boolean);

  const tv = holdings.reduce((s, h) => s + h.value, 0),
    tc = holdings.reduce((s, h) => s + h.cost, 0),
    tp = tv - tc;
  const chartData = holdings.map((h) => ({
    name: h.coin.symbol.toUpperCase(),
    value: +h.value.toFixed(2),
  }));

  return (
    <div>
      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
          gap: 11,
          marginBottom: 18,
        }}
      >
        <StatBox
          label="Portfolio Value"
          value={formatPrice(tv, sym)}
          color={t.accentSoft}
          t={t}
        />
        <StatBox label="Cost Basis" value={formatPrice(tc, sym)} t={t} />
        <StatBox
          label="Total P&L"
          value={formatPrice(tp, sym)}
          color={tp >= 0 ? t.green : t.red}
          t={t}
        />
        <StatBox
          label="P&L %"
          value={formatPercent(tc > 0 ? (tp / tc) * 100 : 0)}
          color={tp >= 0 ? t.green : t.red}
          t={t}
        />
      </div>

      {/* Add form + chart */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 14,
          marginBottom: 18,
        }}
      >
        {chartData.length > 0 && (
          <div
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              padding: 18,
            }}
          >
            <div
              style={{
                fontWeight: 600,
                color: t.textMuted,
                fontSize: 13,
                marginBottom: 12,
              }}
            >
              Allocation by Value
            </div>
            <ResponsiveContainer width="100%" height={175}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: t.textMuted, fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: t.textMuted, fontSize: 11 }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    background: t.tooltipBg,
                    border: `1px solid ${t.border2}`,
                    borderRadius: 8,
                    color: t.text,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" fill={t.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div
          style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            padding: 18,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: t.textMuted,
              fontSize: 13,
              marginBottom: 13,
            }}
          >
            ➕ Add Holding
          </div>
          <select
            style={{ ...inp }}
            value={form.coinId}
            onChange={(e) => setForm({ ...form, coinId: e.target.value })}
          >
            <option value="">Select coin…</option>
            {state.coins.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.symbol.toUpperCase()})
              </option>
            ))}
          </select>
          <input
            style={inp}
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            style={{ ...inp, marginBottom: 14 }}
            placeholder="Buy price (USD)"
            type="number"
            value={form.buyPrice}
            onChange={(e) => setForm({ ...form, buyPrice: e.target.value })}
          />
          <button
            onClick={() => {
              if (!form.coinId || !form.amount) return;
              dispatch({
                type: "ADD_H",
                payload: {
                  id: form.coinId,
                  amount: +form.amount,
                  buyPrice: +form.buyPrice || 0,
                },
              });
              setForm({ coinId: "", amount: "", buyPrice: "" });
            }}
            style={{
              width: "100%",
              padding: "9px",
              background: t.accent,
              border: "none",
              borderRadius: 9,
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Add to Portfolio
          </button>
        </div>
      </div>

      {/* Holdings table */}
      {holdings.length > 0 && (
        <div
          style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            overflow: "auto",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${t.border}`,
              fontWeight: 600,
              color: t.textMuted,
              fontSize: 13,
            }}
          >
            Holdings
          </div>
          <div style={{ minWidth: 520 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 32px",
                gap: 10,
                padding: "8px 14px",
                borderBottom: `1px solid ${t.border}`,
                color: t.textFaint,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {["Coin", "Qty", "Price", "Value", "Cost", "P&L", ""].map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
            {holdings.map((h) => (
              <div
                key={h.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 32px",
                  gap: 10,
                  padding: "10px 14px",
                  borderBottom: `1px solid ${t.border}`,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src={h.coin.image}
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%" }}
                    alt=""
                  />
                  <span
                    style={{
                      color: t.text,
                      fontWeight: 600,
                      fontSize: 13,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h.coin.name}
                  </span>
                </div>
                <span style={{ color: t.textMuted, fontSize: 13 }}>
                  {h.amount}
                </span>
                <span style={{ color: t.textMuted, fontSize: 13 }}>
                  {formatPrice(h.coin.current_price, sym)}
                </span>
                <span style={{ color: t.text, fontWeight: 700, fontSize: 13 }}>
                  {formatPrice(h.value, sym)}
                </span>
                <span style={{ color: t.textMuted, fontSize: 13 }}>
                  {formatPrice(h.cost, sym)}
                </span>
                <div>
                  <div
                    style={{
                      color: h.pnl >= 0 ? t.green : t.red,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {formatPrice(h.pnl, sym)}
                  </div>
                  <div
                    style={{
                      color: h.pnl >= 0 ? t.green : t.red,
                      fontSize: 10,
                    }}
                  >
                    {formatPercent(h.pnlPct)}
                  </div>
                </div>
                <button
                  onClick={() => dispatch({ type: "DEL_H", payload: h.id })}
                  className="ibtn"
                  style={{
                    background: "none",
                    border: "none",
                    color: t.textFaint,
                    cursor: "pointer",
                    fontSize: 14,
                    padding: 0,
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
