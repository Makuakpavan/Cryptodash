import { useState } from "react";
import { useApp } from "../../hooks/useApp";
import { formatPrice } from "../../utils/formatters";
import { generateUID } from "../../utils/formatters";

export function AlertsPage({ sym, t }) {
  const { state, dispatch } = useApp();
  const [form, setForm] = useState({ coinId: "", cond: "above", price: "" });

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

  const isTrig = (a) => {
    const c = state.coins.find((x) => x.id === a.coinId);
    return c
      ? a.cond === "above"
        ? c.current_price >= a.price
        : c.current_price <= a.price
      : false;
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 14,
          marginBottom: 18,
        }}
      >
        {/* Create */}
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
            ⚑ Create Alert
          </div>
          <select
            style={inp}
            value={form.coinId}
            onChange={(e) => setForm({ ...form, coinId: e.target.value })}
          >
            <option value="">Select coin…</option>
            {state.coins.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            style={inp}
            value={form.cond}
            onChange={(e) => setForm({ ...form, cond: e.target.value })}
          >
            <option value="above">Price rises above</option>
            <option value="below">Price drops below</option>
          </select>
          <input
            style={{ ...inp, marginBottom: 14 }}
            placeholder="Target price (USD)"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button
            onClick={() => {
              if (!form.coinId || !form.price) return;
              const coin = state.coins.find((c) => c.id === form.coinId);
              dispatch({
                type: "ADD_A",
                payload: {
                  id: generateUID(),
                  coinId: form.coinId,
                  coinName: coin?.name,
                  coinImage: coin?.image,
                  cond: form.cond,
                  price: +form.price,
                },
              });
              setForm({ coinId: "", cond: "above", price: "" });
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
            Set Alert
          </button>
        </div>

        {/* Triggered */}
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
              color: t.green,
              fontSize: 13,
              marginBottom: 13,
            }}
          >
            ✓ Triggered ({state.alerts.filter(isTrig).length})
          </div>
          {state.alerts.filter(isTrig).length === 0 ? (
            <div
              style={{
                color: t.textFaint,
                fontSize: 13,
                textAlign: "center",
                padding: "24px 0",
              }}
            >
              No triggered alerts
            </div>
          ) : (
            state.alerts.filter(isTrig).map((a) => (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 11px",
                  background: t.greenBg,
                  borderRadius: 10,
                  marginBottom: 8,
                  border: `1px solid ${t.green}40`,
                  flexWrap: "wrap",
                }}
              >
                {a.coinImage && (
                  <img
                    src={a.coinImage}
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%" }}
                    alt=""
                  />
                )}
                <div style={{ flex: 1, fontSize: 13, minWidth: 100 }}>
                  <b style={{ color: t.text }}>{a.coinName}</b>
                  <span style={{ color: t.green }}>
                    {" "}
                    {a.cond === "above" ? "↑" : "↓"} {formatPrice(a.price, sym)}
                  </span>
                </div>
                <span style={{ color: t.green, fontSize: 10, fontWeight: 800 }}>
                  HIT
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* All alerts */}
      {state.alerts.length > 0 && (
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
            All Alerts ({state.alerts.length})
          </div>
          {state.alerts.map((a) => {
            const coin = state.coins.find((c) => c.id === a.coinId),
              trig = isTrig(a);
            return (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  background: t.surface2,
                  borderRadius: 10,
                  marginBottom: 8,
                  border: `1px solid ${trig ? t.green + "50" : t.border}`,
                  flexWrap: "wrap",
                }}
              >
                {a.coinImage && (
                  <img
                    src={a.coinImage}
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%" }}
                    alt=""
                  />
                )}
                <div style={{ flex: 1, fontSize: 13, minWidth: 100 }}>
                  <b style={{ color: t.text }}>{a.coinName}</b>
                  <span style={{ color: t.textMuted }}>
                    {" "}
                    — {a.cond === "above" ? "Above" : "Below"}{" "}
                    {formatPrice(a.price, sym)}
                  </span>
                </div>
                {coin && (
                  <span style={{ color: t.textMuted, fontSize: 12 }}>
                    Now: {formatPrice(coin.current_price, sym)}
                  </span>
                )}
                <span
                  style={{
                    background: trig ? t.greenBg : t.surface3,
                    color: trig ? t.green : t.textFaint,
                    padding: "2px 8px",
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {trig ? "✓ HIT" : "WATCHING"}
                </span>
                <button
                  className="ibtn"
                  onClick={() => dispatch({ type: "DEL_A", payload: a.id })}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
