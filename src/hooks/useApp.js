import { useContext } from "react";
import { AppCtx } from "../context/AppContext";

export function useApp() {
  const context = useContext(AppCtx);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
