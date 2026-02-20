import { Skeleton } from "./Skeleton";

export function SkeletonCard({ t }) {
  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Skeleton w={34} h={34} r={17} t={t} />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}
        >
          <Skeleton w="55%" h={12} t={t} />
          <Skeleton w="35%" h={10} t={t} />
        </div>
        <Skeleton w={20} h={20} r={4} t={t} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Skeleton w="45%" h={16} t={t} />
        <Skeleton w={60} h={20} r={6} t={t} />
      </div>
      <Skeleton h={10} t={t} />
      <div style={{ marginTop: 12 }}>
        <Skeleton h={52} t={t} />
      </div>
    </div>
  );
}
