"use client";

export default function Journey() {
  const steps = [
    { icon: "🛰", name: "Satellite & Climate Data", desc: "ICPAC models, Sentinel-2 imagery, soil sensors" },
    { icon: "📡", name: "HUSIKA Alert", desc: "Official early warning issued by ICPAC" },
    { icon: "🤖", name: "AI Analysis", desc: "GPT-4o + RAG + farmer profile" },
    { icon: "📋", name: "Farm Decision", desc: "3 specific, crop-aware actions" },
    { icon: "📱", name: "SMS / WhatsApp", desc: "In local language, any phone" },
    { icon: "🌾", name: "Better Yield", desc: "40% less crop loss. Real impact." },
  ];

  return (
    <section id="journey" className="py-24 px-12 overflow-hidden">
      <div className="container mx-auto">
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div className="section-eyebrow" style={{ display: "inline-flex" }}>
            ⚡ The Complete Chain
          </div>
          <h2 className="section-title">From satellite to harvest</h2>
          <p className="section-sub" style={{ margin: "0 auto 0" }}>
            AgroSense AI completes the last mile HUSIKA was missing.
          </p>
        </div>

        <div
          className="journey-steps"
          style={{
            display: "flex",
            gap: "0",
            position: "relative",
            marginTop: "64px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "36px",
              left: "72px",
              right: "72px",
              height: "2px",
              background: "linear-gradient(to right, var(--primary), var(--accent))",
              opacity: 0.4,
            }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className="journey-step"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0 16px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "18px",
                  background: "var(--card)",
                  border: "1px solid var(--border2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  margin: "0 auto 16px",
                  position: "relative",
                  zIndex: 2,
                  transition: "all 0.3s",
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                {step.name}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {step.desc}
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "28px",
                    right: "-12px",
                    color: "var(--accent)",
                    fontSize: "18px",
                    zIndex: 3,
                    opacity: 0.5,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}