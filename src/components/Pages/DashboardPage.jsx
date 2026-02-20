import { Controls } from "../Layout";
import { CoinCard, CoinRow } from "../Coin";
import { SkeletonCard } from "../Common";
import { useApp } from "../../hooks/useApp";

export function DashboardPage({
  filtered,
  onSelect,
  sym,
  onRefresh,
  spinning,
  loading,
  error,
  t,
}) {
  const { state } = useApp();

  if (error)
    return (
      <div
        style={{
          background: t.redBg,
          border: `1px solid ${t.red}40`,
          borderRadius: 12,
          padding: "13px 16px",
          color: t.red,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span>⚠ {error}</span>
        <button
          onClick={onRefresh}
          style={{
            background: t.red,
            border: "none",
            borderRadius: 8,
            color: "#fff",
            padding: "6px 14px",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Retry
        </button>
      </div>
    );

  return (
    <>
      <Controls onRefresh={onRefresh} spinning={spinning} t={t} />
      {state.view === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
            gap: 13,
          }}
        >
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} t={t} />
            ))
          ) : filtered.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: 60,
                color: t.textFaint,
              }}
            >
              No results for "{state.search}"
            </div>
          ) : (
            filtered.map((c) => (
              <CoinCard
                key={c.id}
                coin={c}
                onSelect={onSelect}
                sym={sym}
                t={t}
              />
            ))
          )}
        </div>
      ) : (
        <div
          style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "28px 24px minmax(120px,2fr) 90px 80px minmax(90px,1fr) 100px",
              gap: 8,
              padding: "9px 14px",
              borderBottom: `1px solid ${t.border}`,
              color: t.textFaint,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {["", "#", "Coin", "Price", "24h", "MCap", "7D"].map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "28px 24px minmax(120px,2fr) 90px 80px minmax(90px,1fr) 100px",
                  gap: 8,
                  padding: "11px 14px",
                  borderBottom: `1px solid ${t.border}`,
                  alignItems: "center",
                }}
              >
                {/* Skeleton loaders */}
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: 50, color: t.textFaint }}
            >
              No results
            </div>
          ) : (
            filtered.map((c, i) => (
              <CoinRow
                key={c.id}
                coin={c}
                rank={i + 1}
                onSelect={onSelect}
                sym={sym}
                t={t}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}
