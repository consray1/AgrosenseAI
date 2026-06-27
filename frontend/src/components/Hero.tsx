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
        padding: "0 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroBackground />
      <div
        className="hero-inner"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          paddingTop: "64px",
        }}
      >
        <div className="hero-left">
          <HeroBadge />
          <h1 className="hero-h1">
            AI That Turns
            <br />
            <span className="accent-word">Climate Data</span>
            <br />
            Into Farm Decisions
          </h1>
          <p className="hero-sub">
            AgroSense AI extends HUSIKA&apos;s early warning system into an
            intelligent decision engine — delivering crop-specific,
            growth-stage-aware farming advice to 18 million smallholders across
            East Africa.
          </p>
          <div className="hero-ctas">
            <a href="#ai-chat" className="btn btn-primary btn-lg">
              ⚡ Try the AI Advisor
            </a>
            <a href="#dashboard" className="btn btn-outline-accent btn-lg">
              Explore Dashboard →
            </a>
          </div>
          <HeroStats />
        </div>
        <RadarAnimation mounted={mounted} />
      </div>

      <style jsx>{`
        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding-top: 64px;
        }

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
          margin-bottom: 28px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
          animation: pulse-dot 2s infinite;
        }

        .hero-h1 {
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 900;
          line-height: 1.08;
          margin-bottom: 20px;
          letter-spacing: -2px;
        }

        .accent-word {
          background: linear-gradient(135deg, var(--secondary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 18px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 480px;
        }

        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .hero-stats {
          display: flex;
          gap: 32px;
        }

        .hstat {
          border-left: 2px solid var(--border2);
          padding-left: 16px;
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

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}

function HeroBackground() {
  return (
    <div
      className="hero-bg"
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
      className="radar-wrapper"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="radar-container"
        style={{
          position: "relative",
          width: "480px",
          height: "480px",
        }}
      >
        <div
          className="radar-rings"
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
              className="ring"
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "1px solid rgba(0,191,165,0.2)",
                animation: `ring-pulse 3s ${i * 0.4}s infinite`,
              }}
            >
              <div
                style={{
                  width: `${i * 100}px`,
                  height: `${i * 100}px`,
                  border: "1px solid rgba(0,191,165,0.2)",
                  borderRadius: "50%",
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="radar-scan"
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
          className="radar-center"
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

        <AlertDot
          type="drought"
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--highlight)",
            top: "35%",
            left: "42%",
            boxShadow: "0 0 12px var(--highlight)",
            animation: "float-slight 3s ease-in-out infinite",
          }}
        />
        <AlertDot
          type="flood"
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--accent)",
            top: "58%",
            left: "65%",
            boxShadow: "0 0 12px var(--accent)",
            animation: "float-slight 4s ease-in-out 1s infinite",
          }}
        />
        <AlertDot
          type="high"
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--danger)",
            top: "25%",
            left: "60%",
            boxShadow: "0 0 12px var(--danger)",
            animation: "float-slight 3.5s ease-in-out 0.5s infinite",
          }}
        />
        <AlertDot
          type="ok"
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "var(--success)",
            top: "65%",
            left: "38%",
            boxShadow: "0 0 10px var(--success)",
            animation: "float-slight 5s ease-in-out 2s infinite",
          }}
        />

        <FloatCard
          className="fc-top-right"
          label="Drought Alert"
          value="HIGH RISK"
          sub="Marsabit, Turkana"
          labelColor="var(--highlight)"
          valueColor="var(--highlight)"
        />
        <FloatCard
          className="fc-bottom-left"
          label="Rainfall Forecast"
          value="+32mm"
          sub="Next 7 days · Nakuru"
          labelColor="var(--accent)"
          valueColor="var(--accent)"
        />
        <FloatCard
          className="fc-mid-right"
          label="AI Advice Sent"
          value="2,847"
          sub="Farmers reached · Today"
          labelColor="var(--secondary)"
          valueColor="var(--secondary)"
        />
      </div>

      <style jsx>{`
        .radar-container {
          width: 320px;
          height: 320px;
        }
      `}</style>
    </div>
  );
}

function AlertDot({ type, style }: { type: string; style: React.CSSProperties }) {
  return <div className={`alert-dot dot-${type}`} style={style} />;
}

function FloatCard({
  label,
  value,
  sub,
  labelColor,
  valueColor,
  className,
}: {
  label: string;
  value: string;
  sub: string;
  labelColor: string;
  valueColor: string;
  className?: string;
}) {
  return (
    <div
      className={`float-card ${className}`}
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
      }}
    >
      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px", color: labelColor }}>
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