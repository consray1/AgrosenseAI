"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = ["Dashboard", "Features", "AI Advisor", "Analytics", "Impact"];

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: "rgba(8,28,21,0.98)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          height: "64px",
          padding: "0 16px",
        }}
      >
        <a
          href="#"
          className="flex items-center gap-2 no-underline"
          style={{ fontWeight: 800, fontSize: "16px", color: "var(--text)" }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, var(--primary), var(--accent))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            🌱
          </div>
          <span className="hidden sm:inline">AgroSense AI</span>
          <span className="sm:hidden">AgroSense</span>
        </a>

        <div className="hidden lg:flex items-center gap-8" style={{ marginLeft: "auto" }}>
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
          className="lg:hidden flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          style={{
            background: "transparent",
            border: "1px solid var(--border2)",
            borderRadius: "6px",
            padding: "6px 10px",
            color: "var(--text)",
            cursor: "pointer",
            fontSize: "16px",
            minWidth: "36px",
            minHeight: "36px",
          }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden"
          style={{
            background: "rgba(8,28,21,0.99)",
            borderTop: "1px solid var(--border)",
            padding: "8px 16px 16px",
          }}
        >
          <div className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={handleNavClick}
                className="no-underline py-3"
                style={{
                  color: "var(--text)",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <a
              href="#dashboard"
              onClick={handleNavClick}
              className="btn btn-ghost flex-1 justify-center text-sm"
            >
              Explore
            </a>
            <a
              href="#ai-chat"
              onClick={handleNavClick}
              className="btn btn-primary flex-1 justify-center text-sm"
            >
              Try Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}