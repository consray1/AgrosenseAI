"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Dashboard", "Features", "AI Advisor", "Analytics", "Impact"];

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: "64px",
        background: "rgba(8,28,21,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="flex items-center justify-between h-full px-4 md:px-6 lg:px-12"
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        <a
          href="#"
          className="flex items-center gap-2 no-underline"
          style={{ fontWeight: 800, fontSize: "18px", color: "var(--text)" }}
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
          <span className="hidden sm:inline">AgroSense AI</span>
          <span className="sm:hidden text-sm">AgroSense</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="no-underline"
              style={{
                color: "var(--muted)",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#dashboard" className="btn btn-ghost">
            Explore
          </a>
          <a href="#ai-chat" className="btn btn-primary">
            Try Demo
          </a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "1px solid var(--border2)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "var(--text)",
            cursor: "pointer",
            fontSize: "18px",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0"
          style={{
            background: "rgba(8,28,21,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
            padding: "16px",
          }}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={handleNavClick}
                className="no-underline py-3 px-2"
                style={{
                  color: "var(--muted)",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <a
              href="#dashboard"
              onClick={handleNavClick}
              className="btn btn-ghost flex-1 justify-center"
            >
              Explore
            </a>
            <a
              href="#ai-chat"
              onClick={handleNavClick}
              className="btn btn-primary flex-1 justify-center"
            >
              Try Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}