"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Dashboard", "Features", "AI Advisor", "Analytics", "Impact"];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#" className="navbar-brand">
            <div className="navbar-logo">🌱</div>
            <span className="brand-full">AgroSense AI</span>
            <span className="brand-short">AgroSense</span>
          </a>

          <div className="navbar-links">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="navbar-link"
              >
                {item}
              </a>
            ))}
            <a href="#dashboard" className="btn btn-ghost ml-2">Explore</a>
            <a href="#ai-chat" className="btn btn-primary">Try Demo</a>
          </div>

          <button
            className="navbar-hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="navbar-mobile-menu">
            <div className="mobile-links">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={closeMenu}
                  className="mobile-link"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mobile-buttons">
              <a href="#dashboard" onClick={closeMenu} className="btn btn-ghost flex-1 justify-center text-sm">
                Explore
              </a>
              <a href="#ai-chat" onClick={closeMenu} className="btn btn-primary flex-1 justify-center text-sm">
                Try Demo
              </a>
            </div>
          </div>
        )}
      </nav>

      <style jsx global>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: rgba(8, 28, 21, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 191, 165, 0.12);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 16px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-weight: 800;
          font-size: 16px;
          color: #F5F5F5;
        }

        .navbar-logo {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #2E7D32, #00BFA5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .brand-full { display: inline; }
        .brand-short { display: none; }

        @media (max-width: 639px) {
          .brand-full { display: none; }
          .brand-short { display: inline; }
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .navbar-link {
          color: #8BA89E;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }

        .navbar-link:hover {
          color: #F5F5F5;
        }

        .navbar-hamburger {
          display: none;
          background: transparent;
          border: 1px solid rgba(0, 191, 165, 0.22);
          border-radius: 6px;
          padding: 6px 10px;
          color: #F5F5F5;
          cursor: pointer;
          font-size: 16px;
          min-width: 36px;
          min-height: 36px;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 1023px) {
          .navbar-links {
            display: none !important;
          }
          .navbar-hamburger {
            display: flex !important;
          }
        }

        .navbar-mobile-menu {
          background: rgba(8, 28, 21, 0.99);
          border-top: 1px solid rgba(0, 191, 165, 0.12);
          padding: 8px 16px 16px;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
        }

        .mobile-link {
          color: #F5F5F5;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 191, 165, 0.12);
          display: block;
        }

        .mobile-buttons {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}