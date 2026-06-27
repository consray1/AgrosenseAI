"use client";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "64px",
        background: "rgba(8,28,21,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <a href="#" className="flex items-center gap-2.5 no-underline" style={{ fontWeight: 800, fontSize: "18px", color: "var(--text)" }}>
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
      </a>

      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          listStyle: "none",
        }}
      >
        {["Dashboard", "Features", "AI Advisor", "Analytics", "Impact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              style={{
                textDecoration: "none",
                color: "var(--muted)",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: "12px" }}>
        <a href="#dashboard" className="btn btn-ghost">
          Explore
        </a>
        <a href="#ai-chat" className="btn btn-primary">
          Try Demo
        </a>
      </div>
    </nav>
  );
}