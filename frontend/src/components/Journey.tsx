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
    <section id="journey" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="container mx-auto">
        <div style={{ textAlign: "center", marginBottom: "40px md:16px" }}>
          <div className="section-eyebrow" style={{ display: "inline-flex" }}>
            ⚡ The Complete Chain
          </div>
          <h2 className="section-title">From satellite to harvest</h2>
          <p className="section-sub" style={{ margin: "0 auto 0" }}>
            AgroSense AI completes the last mile HUSIKA was missing.
          </p>
        </div>

        <div
          className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-0 lg:flex-nowrap"
          style={{
            position: "relative",
            marginTop: "48px md:64px",
          }}
        >
          <div
            className="hidden lg:block"
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
              className="flex flex-col items-center text-center w-1/2 sm:w-1/3 lg:w-auto"
              style={{
                padding: "0 8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background: "var(--card)",
                  border: "1px solid var(--border2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  marginBottom: "12px",
                  position: "relative",
                  zIndex: 2,
                  transition: "all 0.3s",
                }}
              >
                {step.icon}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>
                {step.name}
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5, maxWidth: "120px" }}>
                {step.desc}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block"
                  style={{
                    position: "absolute",
                    top: "24px",
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