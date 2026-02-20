import { createContext, useReducer } from "react";
import React from "react";

export const AppCtx = createContext();

export const INITIAL_STATE = {
  coins: [],
  loading: true,
  error: null,
  lastUpdated: null,
  search: "",
  sort: "market_cap_desc",
  currency: "usd",
  watchlist: [],
  portfolio: [],
  alerts: [],
  selectedCoin: null,
  view: "grid",
  page: "dashboard",
  theme: "dark",
};

export function appReducer(state, { type, payload }) {
  switch (type) {
    case "COINS":
      return {
        ...state,
        coins: payload,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };
    case "LOADING":
      return { ...state, loading: payload };
    case "ERROR":
      return { ...state, error: payload, loading: false };
    case "SEARCH":
      return { ...state, search: payload };
    case "SORT":
      return { ...state, sort: payload };
    case "CURRENCY":
      return { ...state, currency: payload };
    case "VIEW":
      return { ...state, view: payload };
    case "PAGE":
      return { ...state, page: payload };
    case "THEME":
      return { ...state, theme: payload };
    case "COIN":
      return { ...state, selectedCoin: payload };
    case "WATCH":
      return {
        ...state,
        watchlist: state.watchlist.includes(payload)
          ? state.watchlist.filter((x) => x !== payload)
          : [...state.watchlist, payload],
      };
    case "ADD_H":
      return {
        ...state,
        portfolio: [
          ...state.portfolio.filter((p) => p.id !== payload.id),
          payload,
        ],
      };
    case "DEL_H":
      return {
        ...state,
        portfolio: state.portfolio.filter((p) => p.id !== payload),
      };
    case "ADD_A":
      return { ...state, alerts: [...state.alerts, payload] };
    case "DEL_A":
      return { ...state, alerts: state.alerts.filter((a) => a.id !== payload) };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  return React.createElement(
    AppCtx.Provider,
    { value: { state, dispatch } },
    children,
  );
}
