import { useApp } from "../../hooks/useApp";
import { SORT_OPTIONS } from "../../constants/api";

export function Controls({ onRefresh, spinning, t }) {
  const { state, dispatch } = useApp();
  const inp = {
    padding: "8px 10px",
    background: t.surface2,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    color: t.text,
    fontSize: 13,
    outline: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 9,
        marginBottom: 18,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", flex: "1 1 180px", minWidth: 150 }}>
        <span
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: t.textFaint,
            fontSize: 15,
            pointerEvents: "none",
          }}
        >
          ⌕
        </span>
        <input
          {...{ style: { ...inp, paddingLeft: 32, width: "100%" } }}
          placeholder="Search coins…"
          value={state.search}
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }
        />
      </div>
      <select
        style={{ ...inp, cursor: "pointer", flex: "0 0 auto" }}
        value={state.sort}
        onChange={(e) => dispatch({ type: "SORT", payload: e.target.value })}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "flex",
          background: t.surface2,
          border: `1px solid ${t.border}`,
          borderRadius: 9,
          padding: 3,
          gap: 2,
          flexShrink: 0,
        }}
      >
        {[
          ["⊞", "grid"],
          ["≡", "list"],
        ].map(([icon, v]) => (
          <button
            key={v}
            onClick={() => dispatch({ type: "VIEW", payload: v })}
            style={{
              background: state.view === v ? t.surface3 : "transparent",
              border: "none",
              color: state.view === v ? t.accentSoft : t.textFaint,
              padding: "5px 11px",
              borderRadius: 7,
              cursor: "pointer",
              fontSize: 15,
              transition: "all .15s",
            }}
          >
            {icon}
          </button>
        ))}
      </div>
      <button
        onClick={onRefresh}
        style={{
          padding: "8px 13px",
          background: t.surface2,
          border: `1px solid ${t.border}`,
          borderRadius: 9,
          color: t.textMuted,
          fontSize: 13,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 5,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            display: "inline-block",
            animation: spinning ? "spin .8s linear infinite" : "none",
            fontSize: 14,
          }}
        >
          ↻
        </span>{" "}
        Refresh
      </button>
    </div>
  );
}
