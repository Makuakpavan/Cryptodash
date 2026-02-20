export function StatBox({ label, value, color, t, sub }) {
  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: "13px 16px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          color: t.textFaint,
          fontSize: 11,
          marginBottom: 5,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: color || t.text,
          fontWeight: 800,
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ color: t.textMuted, fontSize: 11, marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
