"use client";

export default function Features() {
  const features = [
    {
      icon: "🌾",
      iconClass: "fi-green",
      name: "AI Crop Advisor",
      desc: "Combines HUSIKA weather alerts, NDVI satellite data, soil moisture, and the farmer's crop profile to generate specific, crop-aware farm decisions — not generic weather warnings.",
      tag: "Core Feature",
      large: true,
      chart: { label: "ADVICE DELIVERY LATENCY", value: "8s avg", color: "var(--secondary)" },
      subText: "Serving 18M+ farmers across 11 IGAD countries in 7 languages via WhatsApp, USSD, and SMS.",
    },
    {
      icon: "🦠",
      iconClass: "fi-red",
      name: "Disease Prediction",
      desc: "Correlates rainfall, temperature, and humidity to predict outbreak risk for late blight, rust, maize streak, and 40+ crop diseases.",
      tag: "AI-Powered",
    },
    {
      icon: "🐛",
      iconClass: "fi-yellow",
      name: "Pest Risk Forecast",
      desc: "Fall armyworm, desert locust, and aphid pressure modelled from wind patterns, temperature corridors, and historical infestation data.",
      tag: "Early Warning",
    },
    {
      icon: "🛰",
      iconClass: "fi-teal",
      name: "Satellite Monitoring",
      desc: "Live NDVI, EVI, and soil moisture from Sentinel-2 and Landsat imagery. Detect crop stress 2–3 weeks before visible symptoms appear.",
      tag: "Remote Sensing",
    },
    {
      icon: "🌊",
      iconClass: "fi-teal",
      name: "Flood Prediction",
      desc: "River gauge integration, DEM-based inundation modelling, and HUSIKA flood alerts combined into field-level flood risk maps.",
      tag: "72h Ahead",
    },
    {
      icon: "☀️",
      iconClass: "fi-yellow",
      name: "Drought Intelligence",
      desc: "SPI and NDVI anomaly tracking, with county-level drought severity scores updated daily. Triggers parametric advisories when thresholds breach.",
      tag: "IRI / ICPAC Data",
      large: true,
      chart: { label: "SPI TREND — MARSABIT", value: "Severe Drought", color: "var(--danger)" },
      subText: "Linked to HUSIKA DRESS-EA indicators and WMO drought classification standards.",
    },
    {
      icon: "📈",
      iconClass: "fi-green",
      name: "Yield Forecasting",
      desc: "Seasonal yield prediction per crop and county, calibrated against FEWS NET and WFP market data.",
      tag: "ML Model",
    },
    {
      icon: "💬",
      iconClass: "fi-purple",
      name: "SMS & WhatsApp Alerts",
      desc: "Advice in Swahili, Somali, Amharic, Oromo, and Arabic. Delivered in under 8 seconds. No smartphone required.",
      tag: "Last-Mile",
    },
    {
      icon: "🏛",
      iconClass: "fi-blue",
      name: "Government Advisory",
      desc: "County-level briefings for DRM officers, NGO field coordinators, and ministry agriculture departments.",
      tag: "Institutional",
    },
    {
      icon: "💧",
      iconClass: "fi-teal",
      name: "Irrigation Optimizer",
      desc: "Evapotranspiration calculations and soil-water balance modelling to prescribe optimal irrigation schedules per field.",
      tag: "Water Smart",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto">
        <div style={{ textAlign: "center", marginBottom: "40px md:56px" }}>
          <div className="section-eyebrow" style={{ display: "inline-flex" }}>
            🧩 Platform Capabilities
          </div>
          <h2 className="section-title">Every tool a farmer&apos;s ally needs</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            From raw satellite data to a WhatsApp message that arrives before the
            drought does.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {features.map((feat, i) => (
            <FeatureCard key={i} {...feat} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: string;
  iconClass: string;
  name: string;
  desc: string;
  tag: string;
  large?: boolean;
  chart?: { label: string; value: string; color: string };
  subText?: string;
}

function FeatureCard({ icon, iconClass, name, desc, tag, large, chart, subText }: FeatureCardProps) {
  const iconColors: Record<string, string> = {
    "fi-green": "rgba(46,125,50,0.2)",
    "fi-teal": "rgba(0,191,165,0.15)",
    "fi-yellow": "rgba(255,193,7,0.15)",
    "fi-red": "rgba(255,82,82,0.15)",
    "fi-blue": "rgba(66,165,245,0.15)",
    "fi-purple": "rgba(171,71,188,0.15)",
  };

  const iconBorders: Record<string, string> = {
    "fi-green": "rgba(46,125,50,0.3)",
    "fi-teal": "rgba(0,191,165,0.3)",
    "fi-yellow": "rgba(255,193,7,0.3)",
    "fi-red": "rgba(255,82,82,0.3)",
    "fi-blue": "rgba(66,165,245,0.3)",
    "fi-purple": "rgba(171,71,188,0.3)",
  };

  return (
    <div
      className={`${large ? "md:col-span-2" : ""}`}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "24px",
        transition: "all 0.3s",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--accent), transparent)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />
      <div>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            marginBottom: "16px",
            background: iconColors[iconClass],
            border: `1px solid ${iconBorders[iconClass]}`,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: "17px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "var(--muted)",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: "14px",
            background: "rgba(0,191,165,0.1)",
            color: "var(--accent)",
            border: "1px solid rgba(0,191,165,0.2)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            padding: "3px 10px",
            borderRadius: "12px",
          }}
        >
          {tag}
        </div>
      </div>

      {large && chart && (
        <div className="mt-4 md:mt-0">
          <div
            style={{
              background: "rgba(0,0,0,0.2)",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>
              {chart.label}
            </div>
            <svg viewBox="0 0 200 60" style={{ width: "100%", height: "60px" }}>
              <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4" />
              <polyline
                points={chart.label.includes("LATENCY") ? "0,45 30,35 60,38 90,20 120,15 150,10 200,8" : "0,20 30,22 60,28 90,38 120,45 150,50 200,54"}
                stroke={chart.color}
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          {subText && (
            <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--muted)" }}>
              {subText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}