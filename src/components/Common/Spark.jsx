import { AreaChart, Area, ResponsiveContainer } from "recharts";

export function Spark({ data = [], pos, t, h = 52 }) {
  const pts = data.map((v, i) => ({ i, v }));
  const c = pos ? t.green : t.red;
  return (
    <ResponsiveContainer width="100%" height={h}>
      <AreaChart data={pts} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
        <defs>
          <linearGradient id={`sg${pos ? 1 : 0}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={c} stopOpacity={0.3} />
            <stop offset="95%" stopColor={c} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          dot={false}
          strokeWidth={1.5}
          stroke={c}
          fill={`url(#sg${pos ? 1 : 0})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
