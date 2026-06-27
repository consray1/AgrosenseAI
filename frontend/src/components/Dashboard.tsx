"use client";

import { useState } from "react";

export default function Dashboard() {
  const [activeLayer, setActiveLayer] = useState<string[]>([
    "Satellite",
    "Weather",
    "NDVI",
  ]);

  const toggleLayer = (layer: string) => {
    setActiveLayer((prev) =>
      prev.includes(layer)
        ? prev.filter((l) => l !== layer)
        : [...prev, layer]
    );
  };

  return (
    <section id="dashboard" className="py-24 px-12" style={{ background: "var(--bg2)" }}>
      <div className="container mx-auto">
        <div
          className="dash-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
          }}
        >
          <div>
            <div className="section-eyebrow">🗺 Live Dashboard</div>
            <h2 className="section-title">
              Everything in one
              <br />
              intelligent view
            </h2>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span className="tag-pill pill-green">● Live Data</span>
            <span className="tag-pill pill-yellow">⚠ 3 Active Alerts</span>
            <a href="#" className="btn btn-primary">
              Open Dashboard →
            </a>
          </div>
        </div>

        <div
          className="dash-preview"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border2)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "var(--glow2), 0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="dash-titlebar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 20px",
              background: "rgba(0,0,0,0.25)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="dot-win" style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F57" }} />
            <div className="dot-win" style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }} />
            <div className="dot-win" style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28CA41" }} />
            <span
              className="dash-titlebar-name"
              style={{ marginLeft: "8px", fontSize: "13px", color: "var(--muted)", fontWeight: 500 }}
            >
              AgroSense AI — Farm Intelligence Dashboard
            </span>
            <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--muted)" }}>
              Wed 25 Jun · 14:32 EAT
            </span>
          </div>

          <div
            className="dash-body"
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr 260px",
              height: "560px",
            }}
          >
            <DashboardSidebar />
            <DashboardMap activeLayer={activeLayer} toggleLayer={toggleLayer} />
            <DashboardRightPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardSidebar() {
  const [active, setActive] = useState("Farm Map");

  const navItems = [
    { icon: "🗺", label: "Farm Map" },
    { icon: "⚡", label: "Alerts" },
    { icon: "🌾", label: "Crop Advisory" },
    { icon: "🤖", label: "AI Advisor" },
  ];

  const analyticsItems = [
    { icon: "📊", label: "Yield Forecast" },
    { icon: "🛰", label: "Satellite" },
    { icon: "🌡", label: "Climate" },
    { icon: "🐛", label: "Pest Risk" },
  ];

  const commItems = [
    { icon: "📱", label: "SMS Alerts" },
    { icon: "👥", label: "Farmers" },
    { icon: "⚙", label: "Settings" },
  ];

  return (
    <div
      className="dash-sidebar"
      style={{
        background: "rgba(0,0,0,0.2)",
        borderRight: "1px solid var(--border)",
        padding: "20px 16px",
      }}
    >
      <div
        className="sidebar-section-label"
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "rgba(139,168,158,0.5)",
          padding: "12px 12px 6px",
        }}
      >
        Main
      </div>
      {navItems.map((item) => (
        <div
          key={item.label}
          onClick={() => setActive(item.label)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            color: active === item.label ? "var(--secondary)" : "var(--muted)",
            background: active === item.label ? "rgba(46,125,50,0.2)" : "transparent",
            border: active === item.label ? "1px solid rgba(46,125,50,0.25)" : "1px solid transparent",
            cursor: "pointer",
            marginBottom: "2px",
          }}
        >
          <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      <div className="sidebar-section-label" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(139,168,158,0.5)", padding: "12px 12px 6px" }}>
        Analytics
      </div>
      {analyticsItems.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--muted)",
            cursor: "pointer",
            marginBottom: "2px",
          }}
        >
          <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      <div className="sidebar-section-label" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(139,168,158,0.5)", padding: "12px 12px 6px" }}>
        Communications
      </div>
      {commItems.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--muted)",
            cursor: "pointer",
            marginBottom: "2px",
          }}
        >
          <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

function DashboardMap({
  activeLayer,
  toggleLayer,
}: {
  activeLayer: string[];
  toggleLayer: (layer: string) => void;
}) {
  const layers = ["Satellite", "Weather", "NDVI", "Flood Risk", "Soil Moisture", "Pest Risk"];

  return (
    <div
      className="dash-map"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0b1f18",
      }}
    >
      <svg className="map-svg" viewBox="0 0 500 480" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <rect width="500" height="480" fill="#0b1f18" />
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,191,165,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="480" fill="url(#grid)" />

        <polygon
          className="kenya-outline"
          points="200,60 230,50 270,55 310,45 340,60 360,80 370,110 365,140 380,165 375,200 360,220 345,250 330,270 310,290 300,310 280,330 260,340 240,345 220,335 200,320 185,300 170,280 175,255 165,230 155,210 145,190 150,165 140,140 150,115 165,95 185,75 200,60"
          fill="rgba(46,125,50,0.12)"
          stroke="rgba(102,187,106,0.4)"
          strokeWidth="1.5"
        />

        <ellipse
          className="drought-zone"
          cx="285"
          cy="100"
          rx="60"
          ry="40"
          fill="rgba(255,193,7,0.25)"
          stroke="rgba(255,193,7,0.6)"
          strokeWidth="1"
          style={{ animation: "zone-pulse 3s ease-in-out infinite" }}
        />

        <ellipse
          className="flood-zone"
          cx="175"
          cy="220"
          rx="35"
          ry="50"
          fill="rgba(0,191,165,0.2)"
          stroke="rgba(0,191,165,0.5)"
          strokeWidth="1"
          style={{ animation: "zone-pulse 3s ease-in-out 1.5s infinite" }}
        />

        <circle cx="285" cy="100" r="8" fill="#FFC107" opacity="0.9">
          <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="175" cy="220" r="7" fill="#00BFA5" opacity="0.9">
          <animate attributeName="r" values="7;12;7" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="280" r="6" fill="#00E676" opacity="0.8">
          <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="200" r="6" fill="#FF5252" opacity="0.9">
          <animate attributeName="r" values="6;11;6" dur="2.2s" repeatCount="indefinite" />
        </circle>

        <text x="270" y="95" fill="rgba(255,193,7,0.9)" fontSize="9" fontWeight="700" fontFamily="Inter">
          MARSABIT
        </text>
        <text x="155" y="218" fill="rgba(0,191,165,0.9)" fontSize="9" fontWeight="700" fontFamily="Inter">
          TURKANA
        </text>
        <text x="225" y="285" fill="rgba(0,230,118,0.9)" fontSize="9" fontFamily="Inter">
          NAIROBI
        </text>

        <rect x="10" y="10" width="8" height="40" fill="rgba(0,230,118,0.6)" rx="2" />
        <rect x="10" y="52" width="8" height="30" fill="rgba(102,187,106,0.5)" rx="2" />
        <rect x="10" y="84" width="8" height="25" fill="rgba(255,193,7,0.5)" rx="2" />
        <rect x="10" y="111" width="8" height="20" fill="rgba(255,82,82,0.5)" rx="2" />
        <text x="22" y="22" fill="rgba(255,255,255,0.5)" fontSize="8">
          High NDVI
        </text>
        <text x="22" y="128" fill="rgba(255,255,255,0.5)" fontSize="8">
          Low NDVI
        </text>

        <text x="460" y="24" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle">
          N
        </text>
        <text x="460" y="38" fill="rgba(255,255,255,0.2)" fontSize="8" textAnchor="middle">
          ↑
        </text>
      </svg>

      <div
        className="map-overlay-cards"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="map-chip"
          style={{
            position: "absolute",
            top: "16%",
            left: "52%",
            background: "rgba(16,42,35,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border2)",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--highlight)", flexShrink: 0 }} />
          <span style={{ color: "var(--highlight)", fontWeight: 700 }}>Drought HIGH</span>
        </div>
        <div
          className="map-chip"
          style={{
            position: "absolute",
            top: "46%",
            left: "24%",
            background: "rgba(16,42,35,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border2)",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
          <span style={{ color: "var(--accent)", fontWeight: 700 }}>Flood Watch</span>
        </div>
        <div
          className="map-chip"
          style={{
            position: "absolute",
            top: "68%",
            left: "44%",
            background: "rgba(16,42,35,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border2)",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)", flexShrink: 0 }} />
          <span style={{ color: "var(--success)" }}>Good moisture</span>
        </div>
      </div>

      <div
        className="map-layers"
        style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          right: "12px",
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {layers.map((layer) => (
          <div
            key={layer}
            onClick={() => toggleLayer(layer)}
            style={{
              background: activeLayer.includes(layer)
                ? "rgba(46,125,50,0.25)"
                : "rgba(16,42,35,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--border2)",
              borderRadius: "20px",
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              color: activeLayer.includes(layer) ? "var(--secondary)" : "var(--text)",
              borderColor: activeLayer.includes(layer)
                ? "var(--secondary)"
                : "var(--border2)",
              transition: "all 0.2s",
            }}
          >
            {layer === "Satellite" && "🛰 "}
            {layer === "Weather" && "🌦 "}
            {layer === "NDVI" && "🌿 "}
            {layer === "Flood Risk" && "🌊 "}
            {layer === "Soil Moisture" && "🌡 "}
            {layer === "Pest Risk" && "🐛 "}
            {layer}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardRightPanel() {
  return (
    <div
      className="dash-right"
      style={{
        borderLeft: "1px solid var(--border)",
        padding: "16px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div
        className="ai-insight-card"
        style={{
          background: "linear-gradient(135deg, rgba(46,125,50,0.15), rgba(0,191,165,0.08))",
          border: "1px solid rgba(46,125,50,0.3)",
          borderRadius: "12px",
          padding: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--secondary)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--success)",
              animation: "pulse-dot 1.5s infinite",
            }}
          />
          AI Insight
        </div>
        <div style={{ fontSize: "13px", color: "var(--text)", lineHeight: 1.5 }}>
          Marsabit maize farmers at <strong>grain-fill stage</strong> face critical
          drought stress over the next 14 days. Recommend early harvest advisory to
          1,240 registered farmers.
        </div>
      </div>

      <div
        className="risk-meter"
        style={{
          background: "rgba(0,0,0,0.2)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "14px",
        }}
      >
        <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600, marginBottom: "10px" }}>
          CROP RISK INDEX — CURRENT
        </div>
        {[
          { crop: "Maize", risk: 82, color: "var(--danger)" },
          { crop: "Beans", risk: 65, color: "var(--highlight)" },
          { crop: "Sorghum", risk: 34, color: "var(--secondary)" },
          { crop: "Millet", risk: 18, color: "var(--success)" },
        ].map((item) => (
          <div
            key={item.crop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div style={{ fontSize: "12px", color: "var(--text)", width: "60px", flexShrink: 0 }}>
              {item.crop}
            </div>
            <div
              style={{
                flex: 1,
                height: "6px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${item.risk}%`,
                  borderRadius: "3px",
                  background: item.color,
                }}
              />
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                width: "32px",
                textAlign: "right",
                color: item.color,
              }}
            >
              {item.risk}%
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--secondary)" }}>2,847</div>
          <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>Alerts sent today</div>
        </div>
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--highlight)" }}>3</div>
          <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>Active high alerts</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent)" }}>93%</div>
          <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>Delivery rate</div>
        </div>
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--success)" }}>4.2★</div>
          <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>Farmer rating</div>
        </div>
      </div>

      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "14px",
        }}
      >
        <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>
          RAINFALL FORECAST (7-DAY)
        </div>
        <svg className="sparkline" viewBox="0 0 200 44" style={{ width: "100%", height: "44px", position: "relative", overflow: "visible" }}>
          <polygon
            points="0,44 0,30 28,22 56,28 84,10 112,18 140,6 168,14 200,8 200,44"
            fill="rgba(0,191,165,0.12)"
          />
          <polyline
            points="0,30 28,22 56,28 84,10 112,18 140,6 168,14 200,8"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}