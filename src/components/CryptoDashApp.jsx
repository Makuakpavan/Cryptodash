import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useApp } from "../hooks/useApp";
import { Header } from "../components/Layout";
import { GlobalStyles, Spinner } from "../components/Common";
import { ChartModal } from "../components/Coin";
import { THEMES } from "../constants/themes";
import { API, CURRENCY_SYMBOLS } from "../constants/api";
import { sortCoins } from "../utils/sort";
import { PAGE_METADATA } from "../constants/api";

// Lazy load page components
const DashboardPage = lazy(() =>
  import("../components/Pages").then((m) => ({ default: m.DashboardPage })),
);
const WatchlistPage = lazy(() =>
  import("../components/Pages").then((m) => ({ default: m.WatchlistPage })),
);
const PortfolioPage = lazy(() =>
  import("../components/Pages").then((m) => ({ default: m.PortfolioPage })),
);
const AlertsPage = lazy(() =>
  import("../components/Pages").then((m) => ({ default: m.AlertsPage })),
);

function PageLoader({ t }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 20px",
      }}
    >
      <Spinner t={t} size={40} />
    </div>
  );
}

function CryptoDashApp() {
  const { state, dispatch } = useApp();
  const [spinning, setSpin] = useState(false);
  const t = THEMES[state.theme];
  const sym = CURRENCY_SYMBOLS[state.currency] || "$";

  // Fetch top 50 coins
  const fetch50 = useCallback(
    async (silent = false) => {
      if (!silent) dispatch({ type: "LOADING", payload: true });
      setSpin(true);
      try {
        const r = await fetch(
          `${API}/coins/markets?vs_currency=${state.currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`,
        );
        if (!r.ok)
          throw new Error(
            `API ${r.status}${r.status === 429 ? " – rate limited" : ""}`,
          );
        dispatch({ type: "COINS", payload: await r.json() });
      } catch (e) {
        dispatch({ type: "ERROR", payload: e.message });
      } finally {
        setSpin(false);
      }
    },
    [state.currency, dispatch],
  );

  // Initial fetch
  useEffect(() => {
    fetch50();
  }, [fetch50]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const iv = setInterval(() => fetch50(true), 60000);
    return () => clearInterval(iv);
  }, [fetch50]);

  // Compute filtered coins
  const filtered = useMemo(
    () =>
      sortCoins(
        state.coins.filter(
          (c) =>
            c.name.toLowerCase().includes(state.search.toLowerCase()) ||
            c.symbol.toLowerCase().includes(state.search.toLowerCase()),
        ),
        state.sort,
      ),
    [state.coins, state.search, state.sort],
  );

  // Compute market stats
  const mcap = useMemo(
    () => state.coins.reduce((s, c) => s + (c.market_cap || 0), 0),
    [state.coins],
  );
  const gainers = useMemo(
    () => state.coins.filter((c) => c.price_change_percentage_24h > 0).length,
    [state.coins],
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        transition: "background .25s,color .25s",
      }}
    >
      <GlobalStyles t={t} />
      <Header
        mcap={mcap}
        gainers={gainers}
        total={state.coins.length}
        sym={sym}
        t={t}
      />
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 16px" }}>
        <div style={{ marginBottom: 16 }}>
          <h2
            style={{
              color: t.text,
              fontWeight: 800,
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            {PAGE_METADATA[state.page].title}
          </h2>
          <p style={{ color: t.textFaint, fontSize: 13, marginTop: 5 }}>
            {PAGE_METADATA[state.page].sub}
          </p>
        </div>

        {/* Lazy loaded pages with Suspense */}
        <Suspense fallback={<PageLoader t={t} />}>
          {state.page === "dashboard" && (
            <DashboardPage
              filtered={filtered}
              onSelect={(c) => dispatch({ type: "COIN", payload: c })}
              sym={sym}
              onRefresh={() => fetch50()}
              spinning={spinning}
              loading={state.loading}
              error={state.error}
              t={t}
            />
          )}
          {state.page === "watchlist" && (
            <WatchlistPage
              onSelect={(c) => dispatch({ type: "COIN", payload: c })}
              sym={sym}
              t={t}
            />
          )}
          {state.page === "portfolio" && <PortfolioPage sym={sym} t={t} />}
          {state.page === "alerts" && <AlertsPage sym={sym} t={t} />}
        </Suspense>
      </main>

      {/* Chart modal */}
      {state.selectedCoin && (
        <ChartModal
          coin={state.selectedCoin}
          onClose={() => dispatch({ type: "COIN", payload: null })}
          sym={sym}
          t={t}
        />
      )}
    </div>
  );
}

export default CryptoDashApp;
