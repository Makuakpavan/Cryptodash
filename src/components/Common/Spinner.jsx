export function Spinner({ t, size = 30 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `3px solid ${t.border}`,
        borderTop: `3px solid ${t.accent}`,
        borderRadius: "50%",
        animation: "spin .8s linear infinite",
      }}
    />
  );
}
