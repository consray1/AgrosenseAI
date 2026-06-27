"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 24px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroBackground />
      <div
        className="lg:grid lg:grid-cols-2 gap-16 items-center"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div className="text-center lg:text-left mb-12 lg:mb-0">
          <HeroBadge />
          <h1
            className="hero-h1"
            style={{
              fontSize: "clamp(32px, 8vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: "20px",
              letterSpacing: "-2px",
            }}
          >
            AI That Turns
            <br />
            <span className="accent-word">Climate Data</span>
            <br />
            Into Farm Decisions
          </h1>
          <p
            className="hero-sub"
            style={{
              fontSize: "clamp(14px, 2.5vw, 18px)",
              color: "var(--muted)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            AgroSense AI extends HUSIKA&apos;s early warning system into an
            intelligent decision engine — delivering crop-specific,
            growth-stage-aware farming advice to 18 million smallholders across
            East Africa.
          </p>
          <div
            className="hero-ctas"
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "48px",
            }}
          >
            <a href="#ai-chat" className="btn btn-primary btn-lg">
              ⚡ Try the AI Advisor
            </a>
            <a href="#dashboard" className="btn btn-outline-accent btn-lg">
              Explore Dashboard →
            </a>
          </div>
          <HeroStats />
        </div>
        <div className="flex justify-center lg:justify-end">
          <RadarAnimation mounted={mounted} />
        </div>
      </div>

      <style jsx>{`
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 191, 165, 0.1);
          border: 1px solid rgba(0, 191, 165, 0.3);
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 20px;
          marginBottom: 28px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
          animation: pulse-dot 2s infinite;
        }

        .accent-word {
          background: linear-gradient(135deg, var(--secondary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-stats {
          display: flex;
          gap: 24px;
          justifyContent: "center";
        }

        @media (max-width: 640px) {
          .hero-stats {
            flex-direction: column;
            gap: 16px;
            align-items: "center";
          }
        }

        .hstat {
          border-left: 2px solid var(--border2);
          padding-left: 16px;
        }

        @media (max-width: 640px) {
          .hstat {
            border-left: none;
            border-top: 2px solid var(--border2);
            padding-left: 0;
            padding-top: 12px;
            text-align: center;
            width: 100%;
            max-width: 200px;
          }
        }

        .hstat-num {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
        }

        .hstat-lbl {
          font-size: 12px;
          color: var(--muted);
        }
      `}</style>
    </section>
  );
}

function HeroBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 60% 50%, rgba(46,125,50,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(0,191,165,0.10) 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(255,193,7,0.05) 0%, transparent 40%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,191,165,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,165,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

function HeroBadge() {
  return (
    <div className="hero-badge">
      <div className="badge-dot" />
      Powered by HUSIKA / ICPAC · Live in East Africa
    </div>
  );
}

function HeroStats() {
  const stats = [
    { num: "18M+", label: "Farmers Reachable", color: "text-green" },
    { num: "93%", label: "Forecast Accuracy", color: "text-teal" },
    { num: "8s", label: "Advice Delivery", color: "var(--highlight)" },
  ];

  return (
    <div className="hero-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="hstat">
          <div className={`hstat-num ${stat.color}`}>{stat.num}</div>
          <div className="hstat-lbl">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function RadarAnimation({ mounted }: { mounted: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(480px, 90vw)",
          height: "min(480px, 90vw)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "1px solid rgba(0,191,165,0.2)",
                animation: `ring-pulse 3s ${i * 0.4}s infinite`,
                width: `${i * 100}px`,
                height: `${i * 100}px`,
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "50%",
            height: "1px",
            transformOrigin: "left center",
            animation: "scan-rotate 4s linear infinite",
            background:
              "linear-gradient(to right, rgba(0,191,165,0.6), transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "var(--secondary)",
            boxShadow:
              "0 0 0 3px rgba(102,187,106,0.3), 0 0 20px rgba(102,187,106,0.4)",
            zIndex: 4,
          }}
        />

        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--highlight)",
            position: "absolute",
            top: "35%",
            left: "42%",
            boxShadow: "0 0 12px var(--highlight)",
            animation: "float-slight 3s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--accent)",
            position: "absolute",
            top: "58%",
            left: "65%",
            boxShadow: "0 0 12px var(--accent)",
            animation: "float-slight 4s ease-in-out 1s infinite",
          }}
        />
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--danger)",
            position: "absolute",
            top: "25%",
            left: "60%",
            boxShadow: "0 0 12px var(--danger)",
            animation: "float-slight 3.5s ease-in-out 0.5s infinite",
          }}
        />
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "var(--success)",
            position: "absolute",
            top: "65%",
            left: "38%",
            boxShadow: "0 0 10px var(--success)",
            animation: "float-slight 5s ease-in-out 2s infinite",
          }}
        />

        <FloatCard
          label="Drought Alert"
          value="HIGH RISK"
          sub="Marsabit, Turkana"
          labelColor="var(--highlight)"
          valueColor="var(--highlight)"
          style={{ top: "4%", right: "2%" }}
        />
        <FloatCard
          label="Rainfall Forecast"
          value="+32mm"
          sub="Next 7 days · Nakuru"
          labelColor="var(--accent)"
          valueColor="var(--accent)"
          style={{ bottom: "8%", left: "0%" }}
        />
        <FloatCard
          label="AI Advice Sent"
          value="2,847"
          sub="Farmers reached · Today"
          labelColor="var(--secondary)"
          valueColor="var(--secondary)"
          style={{ top: "48%", right: "-2%" }}
        />
      </div>
    </div>
  );
}

function FloatCard({
  label,
  value,
  sub,
  labelColor,
  valueColor,
  style,
}: {
  label: string;
  value: string;
  sub: string;
  labelColor: string;
  valueColor: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        background: "rgba(16,42,35,0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border2)",
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "13px",
        zIndex: 5,
        boxShadow: "var(--glow)",
        animation: "float-card-anim 6s ease-in-out infinite",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "4px",
          color: labelColor,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "18px", fontWeight: 800, color: valueColor }}>
        {value}
      </div>
      <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>
        {sub}
      </div>
    </div>
  );
}