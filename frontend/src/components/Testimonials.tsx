"use client";

export default function Testimonials() {
  const testimonials = [
    {
      text: "We've been using weather alerts for years but they never told us what to do. AgroSense AI sent me a WhatsApp message in Swahili telling me exactly when to harvest my maize before the drought hit. I saved my entire crop.",
      author: "Amina Hassan",
      role: "Smallholder Farmer · Marsabit, Kenya",
      avatarBg: "aa-green",
      avatar: "👩🏾‍🌾",
    },
    {
      text: "As an agricultural extension officer covering 3 sub-counties, I can now see exactly which farmers are at risk, which crops are most stressed, and prioritize my visits. AgroSense AI has multiplied my reach 10x.",
      author: "Daniel Ochieng",
      role: "Agricultural Extension Officer · Nakuru County",
      avatarBg: "aa-teal",
      avatar: "👨🏾‍💼",
    },
    {
      text: "The integration with HUSIKA's existing alert system is seamless. We can now target our relief pre-positioning based on AI risk scores — not anecdotal reports. This is what evidence-based humanitarian response looks like.",
      author: "Dr. Priya Nair",
      role: "Country Director · WFP East Africa",
      avatarBg: "aa-yellow",
      avatar: "🌍",
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-8 lg:px-12" style={{ background: "var(--bg2)" }}>
      <div className="container mx-auto">
        <div style={{ textAlign: "center", marginBottom: "40px md:56px" }}>
          <div className="section-eyebrow" style={{ display: "inline-flex" }}>
            💬 From the Field
          </div>
          <h2 className="section-title">What they&apos;re saying</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                transition: "all 0.3s",
              }}
            >
              <div style={{ color: "var(--highlight)", fontSize: "12px", marginBottom: "12px" }}>
                ★★★★★
              </div>
              <div style={{ fontSize: "36px", color: "var(--accent)", lineHeight: 1, marginBottom: "12px", opacity: 0.5 }}>
                "
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--text)",
                  lineHeight: 1.7,
                  marginBottom: "16px",
                }}
              >
                {t.text}
              </div>
              <div
                className="flex items-center gap-3"
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                    background:
                      t.avatarBg === "aa-green"
                        ? "rgba(46,125,50,0.2)"
                        : t.avatarBg === "aa-teal"
                          ? "rgba(0,191,165,0.15)"
                          : "rgba(255,193,7,0.15)",
                    border:
                      t.avatarBg === "aa-green"
                        ? "1px solid rgba(46,125,50,0.3)"
                        : t.avatarBg === "aa-teal"
                          ? "1px solid rgba(0,191,165,0.3)"
                          : "1px solid rgba(255,193,7,0.3)",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700 }}>{t.author}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}