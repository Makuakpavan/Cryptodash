export function Chip({ children, active, color, t, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 13px",
        borderRadius: 20,
        border: `1.5px solid ${active ? color || t.accent : t.border}`,
        background: active ? (color || t.accent) + "18" : t.surface2,
        color: active ? color || t.accent : t.textMuted,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all .15s",
      }}
    >
      {children}
    </button>
  );
}
