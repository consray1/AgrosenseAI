"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const yieldData = [
  { month: "Jul", forecast: 60, actual: 65 },
  { month: "Aug", forecast: 45, actual: 50 },
  { month: "Sep", forecast: 50, actual: 55 },
  { month: "Oct", forecast: 30, actual: 38 },
  { month: "Nov", forecast: 35, actual: 42 },
  { month: "Dec", forecast: 25, actual: 32 },
  { month: "Jan", forecast: 30, actual: 36 },
  { month: "Feb", forecast: 20, actual: 26 },
  { month: "Mar", forecast: 25, actual: 30 },
];

const diseaseData = [
  { county: "Marsabit", risk: 75 },
  { county: "Turkana", risk: 52 },
  { county: "Nakuru", risk: 38 },
  { county: "Wajir", risk: 62 },
  { county: "Kisumu", risk: 22 },
  { county: "Meru", risk: 45 },
];

const rainfallData = [
  { month: "Jan", anomaly: 50 },
  { month: "Feb", anomaly: 35 },
  { month: "Mar", anomaly: 20 },
  { month: "Apr", anomaly: 45 },
  { month: "May", anomaly: 55 },
  { month: "Jun", anomaly: 70 },
  { month: "Jul", anomaly: 60 },
  { month: "Aug", anomaly: 40 },
  { month: "Sep", anomaly: 30 },
];

const engagementData = [
  { week: "W1", sent: 40 },
  { week: "W2", sent: 55 },
  { week: "W3", sent: 72 },
  { week: "W4", sent: 88 },
];

export default function Analytics() {
  return (
    <section id="analytics" className="py-24 px-12" style={{ background: "var(--bg2)" }}>
      <div className="container mx-auto">
        <div
          className="dash-header"
          style={{
            marginBottom: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div className="section-eyebrow">📊 Analytics</div>
            <h2 className="section-title">
              Data-driven
              <br />
              crop intelligence
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            className="chart-card"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              Monthly Yield Forecast vs Actual
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
              Maize yield index — Rift Valley, 2024–25
            </div>
            <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--muted)" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--secondary)" }} />
                Forecast
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--muted)" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)" }} />
                Actual
              </div>
            </div>
            <div style={{ height: "120px", borderBottom: "1px solid var(--border)" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldData}>
                  <defs>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#66BB6A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#66BB6A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00BFA5" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="#00BFA5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#8BA89E", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "#102A23",
                      border: "1px solid rgba(0,191,165,0.22)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#66BB6A"
                    strokeWidth={2}
                    fill="url(#forecastGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#00BFA5"
                    strokeWidth={1.5}
                    strokeDasharray="5 3"
                    fill="url(#actualGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                <span key={m} style={{ fontSize: "11px", color: "var(--muted)" }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div
            className="chart-card"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              Disease Probability by County
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
              Late blight risk index — this week
            </div>
            <div style={{ height: "120px", marginTop: "16px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diseaseData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="county"
                    type="category"
                    tick={{ fill: "#8BA89E", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={55}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#102A23",
                      border: "1px solid rgba(0,191,165,0.22)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="risk"
                    fill="url(#diseaseGradient)"
                    radius={[0, 4, 4, 0]}
                  />
                  <defs>
                    <linearGradient id="diseaseGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FF5252" stopOpacity={0.8} />
                      <stop offset="50%" stopColor="#FFC107" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#66BB6A" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            className="chart-card"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              Rainfall Anomaly Index
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
              % deviation from long-term mean (ICPAC data)
            </div>
            <div style={{ height: "120px", borderBottom: "1px solid var(--border)" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rainfallData}>
                  <defs>
                    <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00BFA5" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#00BFA5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#8BA89E", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "#102A23",
                      border: "1px solid rgba(0,191,165,0.22)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="anomaly"
                    stroke="#00BFA5"
                    strokeWidth={2}
                    fill="url(#rainfallGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((m) => (
                <span key={m} style={{ fontSize: "11px", color: "var(--muted)" }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div
            className="chart-card"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
              Farmer Engagement
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
              Advice sent vs feedback received — 30-day trend
            </div>
            <div style={{ height: "120px", marginTop: "16px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#8BA89E", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "#102A23",
                      border: "1px solid rgba(0,191,165,0.22)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="sent" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}