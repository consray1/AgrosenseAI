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
    <section id="testimonials" className="py-24 px-12" style={{ background: "var(--bg2)" }}>
      <div className="container mx-auto">
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="section-eyebrow" style={{ display: "inline-flex" }}>
            💬 From the Field
          </div>
          <h2 className="section-title">What they&apos;re saying</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  color: "var(--highlight)",
                  fontSize: "12px",
                  marginBottom: "14px",
                }}
              >
                ★★★★★
              </div>
              <div
                style={{
                  fontSize: "40px",
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "12px",
                  opacity: 0.5,
                }}
              >
                "
              </div>
              <div
                style={{
                  fontSize: "15px",
                  color: "var(--text)",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                {t.text}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
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
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    {t.author}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      marginTop: "2px",
                    }}
                  >
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