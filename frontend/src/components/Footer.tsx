"use client";

export default function Footer() {
  const columns = [
    {
      title: "Platform",
      links: ["Dashboard", "AI Advisor", "Satellite Maps", "SMS Alerts", "Analytics"],
    },
    {
      title: "Developers",
      links: ["API Docs", "GitHub", "Webhook Guide", "System Spec", "Status"],
    },
    {
      title: "Partners",
      links: ["ICPAC / IGAD", "HUSIKA MIMS", "Africa's Talking", "CIMMYT", "FAO"],
    },
    {
      title: "Hackathon",
      links: ["About the Build", "Team", "Pitch Deck", "Live Demo", "Contact"],
    },
  ];

  return (
    <footer
      className="py-12 md:py-16 px-4 md:px-8 lg:px-12"
      style={{
        borderTop: "1px solid var(--border)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, var(--primary), var(--accent))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                🌱
              </div>
              <span style={{ fontWeight: 800, fontSize: "18px", color: "var(--text)" }}>
                AgroSense AI
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "var(--muted)",
                marginTop: "12px",
                maxWidth: "240px",
                lineHeight: 1.6,
              }}
            >
              Turning HUSIKA&apos;s early warning data into precise farm decisions for
              18 million smallholders across East Africa.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <FooterBadge>ICPAC Partner</FooterBadge>
              <FooterBadge>HUSIKA Extension</FooterBadge>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--text)",
                  marginBottom: "16px",
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "14px",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{
            borderTop: "1px solid var(--border)",
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          <div className="text-center md:text-left">
            © 2025 AgroSense AI · Built on HUSIKA · Powered by ICPAC data · IGAD Region
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <FooterBadge>🔒 Secure</FooterBadge>
            <FooterBadge>🌐 6 Languages</FooterBadge>
            <FooterBadge>📡 HUSIKA Native</FooterBadge>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(0,191,165,0.1)",
        border: "1px solid rgba(0,191,165,0.2)",
        color: "var(--accent)",
        fontSize: "11px",
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: "12px",
      }}
    >
      {children}
    </div>
  );
}