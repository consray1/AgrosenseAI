"use client";

export default function CTABand() {
  return (
    <section
      id="cta-band"
      className="py-16 md:py-24 px-4 md:px-8 lg:px-12"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(46,125,50,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,191,165,0.12) 0%, transparent 60%)",
        textAlign: "center",
      }}
    >
      <div className="container mx-auto">
        <div className="section-eyebrow" style={{ display: "inline-flex", marginBottom: "24px" }}>
          🚀 Built for HUSIKA Hackathon
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 52px)",
            fontWeight: 900,
            marginBottom: "16px",
            letterSpacing: "-1px",
          }}
        >
          Ready to complete the
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, var(--secondary), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            last mile?
          </span>
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 2.5vw, 18px)",
            color: "var(--muted)",
            marginBottom: "32px",
            maxWidth: "600px",
            margin: "0 auto 32px",
          }}
        >
          AgroSense AI is open for ICPAC partners, NGOs, county governments, and
          research institutions. Integrate in days, not months.
        </p>
        <div
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          <a href="#ai-chat" className="btn btn-primary btn-lg">
            ⚡ Try the Live Demo
          </a>
          <a href="#dashboard" className="btn btn-outline-accent btn-lg">
            Explore Dashboard
          </a>
          <a href="#" className="btn btn-ghost btn-lg">
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  );
}