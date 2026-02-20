import { formatPercent } from "../../utils/formatters";

export function Badge({ val, t }) {
  const pos = val >= 0;
  return (
    <span
      style={{
        background: pos ? t.greenBg : t.redBg,
        color: pos ? t.green : t.red,
        padding: "3px 8px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {formatPercent(val)}
    </span>
  );
}
