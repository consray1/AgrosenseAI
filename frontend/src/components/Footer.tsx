"use client";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "64px 48px 40px",
        borderTop: "1px solid var(--border)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          gap: "40px",
          marginBottom: "48px",
          maxWidth: "1200px",
          margin: "0 auto 48px",
        }}
      >
        <div className="footer-brand">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 800,
              fontSize: "18px",
              color: "var(--text)",
              textDecoration: "none",
            }}
          >
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
            AgroSense AI
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
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <FooterBadge>ICPAC Partner</FooterBadge>
            <FooterBadge>HUSIKA Extension</FooterBadge>
          </div>
        </div>

        {[
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
        ].map((col) => (
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
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "32px",
          borderTop: "1px solid var(--border)",
          fontSize: "13px",
          color: "var(--muted)",
        }}
      >
        <div>© 2025 AgroSense AI · Built on HUSIKA · Powered by ICPAC data · IGAD Region</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <FooterBadge>🔒 Secure</FooterBadge>
          <FooterBadge>🌐 6 Languages</FooterBadge>
          <FooterBadge>📡 HUSIKA Native</FooterBadge>
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