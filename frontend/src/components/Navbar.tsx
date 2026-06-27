"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Dashboard", "Features", "AI Advisor", "Analytics", "Impact"];

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
        padding: "0 24px",
        height: "64px",
        background: "rgba(8,28,21,0.95)",
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
        <span className="hidden md:inline">AgroSense AI</span>
        <span className="md:hidden">AgroSense</span>
      </a>

      <ul
        className="hidden lg:flex"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          listStyle: "none",
        }}
      >
        {navItems.map((item) => (
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

      <div className="hidden lg:flex" style={{ display: "flex", gap: "12px" }}>
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
          padding: "8px",
          color: "var(--text)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "rgba(8,28,21,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "var(--muted)",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 0",
              }}
            >
              {item}
            </a>
          ))}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <a href="#dashboard" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
              Explore
            </a>
            <a href="#ai-chat" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              Try Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}