import { useState } from "react";
import { useApp } from "../../hooks/useApp";
import { NAVIGATION, CURRENCY_SYMBOLS, CURRENCIES } from "../../constants/api";

function formatBigNumber(n, s = "$") {
  if (!n) return "N/A";
  if (n >= 1e12) return `${s}${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${s}${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${s}${(n / 1e6).toFixed(2)}M`;
  return `${s}${n.toFixed(2)}`;
}

export function Header({ mcap, gainers, total, sym, t }) {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const isDark = state.theme === "dark";

  return (
    <header
      style={{
        background: t.surface,
        borderBottom: `1px solid ${t.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: t.shadow,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "11px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            ◈
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: 17,
              color: t.text,
              letterSpacing: "-0.3px",
            }}
          >
            CryptoDash
          </span>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 3, marginLeft: 8, flex: 1 }}>
          {NAVIGATION.map((p) => (
            <button
              key={p.id}
              className="nav-h"
              onClick={() => dispatch({ type: "PAGE", payload: p.id })}
              style={{
                background: state.page === p.id ? t.surface3 : "transparent",
                border: "none",
                color: state.page === p.id ? t.accentSoft : t.textMuted,
                padding: "6px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                textTransform: "capitalize",
                transition: "all .15s",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>{p.icon}</span>
              <span className="nav-label">{p.id}</span>
            </button>
          ))}
        </nav>

        {/* Right cluster */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {mcap > 0 && (
            <div className="hstats" style={{ display: "flex", gap: 6 }}>
              <div
                style={{
                  background: t.surface2,
                  border: `1px solid ${t.border}`,
                  borderRadius: 8,
                  padding: "4px 9px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ color: t.textFaint, fontSize: 9, fontWeight: 700 }}
                >
                  MCAP
                </div>
                <div style={{ color: t.text, fontWeight: 700, fontSize: 12 }}>
                  {formatBigNumber(mcap, sym)}
                </div>
              </div>
              <div
                style={{
                  background: t.surface2,
                  border: `1px solid ${t.border}`,
                  borderRadius: 8,
                  padding: "4px 9px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ color: t.textFaint, fontSize: 9, fontWeight: 700 }}
                >
                  GAIN
                </div>
                <div style={{ color: t.green, fontWeight: 700, fontSize: 12 }}>
                  {gainers}/{total}
                </div>
              </div>
            </div>
          )}
          <select
            value={state.currency}
            onChange={(e) =>
              dispatch({ type: "CURRENCY", payload: e.target.value })
            }
            style={{
              padding: "5px 8px",
              background: t.surface2,
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              color: t.text,
              fontSize: 12,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
          {/* Theme toggle */}
          <button
            onClick={() =>
              dispatch({ type: "THEME", payload: isDark ? "light" : "dark" })
            }
            title="Toggle theme"
            className="ibtn"
            style={{
              background: t.surface2,
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              padding: "5px 9px",
              cursor: "pointer",
              fontSize: 15,
              color: t.text,
              lineHeight: 1,
              transition: "background .2s",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          {/* Hamburger */}
          <button
            className="ham-btn ibtn"
            onClick={() => setOpen(!open)}
            style={{
              background: t.surface2,
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              padding: "5px 9px",
              cursor: "pointer",
              color: t.textMuted,
              fontSize: 17,
              lineHeight: 1,
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div
          style={{
            borderTop: `1px solid ${t.border}`,
            padding: "10px 16px",
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            background: t.surface,
            animation: "fadeUp .15s",
          }}
        >
          {NAVIGATION.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                dispatch({ type: "PAGE", payload: p.id });
                setOpen(false);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 9,
                border: `1.5px solid ${state.page === p.id ? t.accent : t.border}`,
                background: state.page === p.id ? t.accent + "18" : t.surface2,
                color: state.page === p.id ? t.accentSoft : t.textMuted,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {p.icon} {p.id}
            </button>
          ))}
        </div>
      )}

      {/* Responsive rules */}
      <style>{`
        .ham-btn { display: none !important; }
        .nav-label { display: inline; }
        .hstats { display: flex !important; }
        @media(max-width: 768px) {
          .ham-btn  { display: flex !important; }
          nav       { display: none !important; }
          .hstats   { display: none !important; }
        }
        @media(max-width: 480px) {
          .nav-label { display: none !important; }
        }
      `}</style>
    </header>
  );
}
