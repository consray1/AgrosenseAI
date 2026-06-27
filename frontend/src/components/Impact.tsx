"use client";

import { useEffect, useRef, useState } from "react";

export default function Impact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const impactCards = [
    { icon: "🌾", num: 50000, suffix: "K+", label: "Farmers receiving personalized advice", color: "var(--secondary)", gradient: "ic-green" },
    { icon: "🎯", num: 93, suffix: "%", label: "AI forecast accuracy rate", color: "var(--accent)", gradient: "ic-teal" },
    { icon: "📉", num: 40, suffix: "%", label: "Reduction in crop loss for enrolled farmers", color: "var(--highlight)", gradient: "ic-yellow" },
    { icon: "📱", num: 1, suffix: "M+", label: "Early warning alerts delivered", color: "var(--danger)", gradient: "ic-red" },
  ];

  const statsRow = [
    { icon: "🌍", num: 11, label: "Countries in IGAD region", color: "var(--secondary)" },
    { icon: "💬", num: 7, label: "Languages supported", color: "var(--accent)" },
    { icon: "⚡", num: 8, suffix: "s", label: "Average advice delivery time", color: "var(--highlight)" },
  ];

  return (
    <section id="impact" className="py-16 md:py-24 px-4 md:px-8 lg:px-12" ref={sectionRef}>
      <div className="container mx-auto">
        <div style={{ textAlign: "center", marginBottom: "40px md:56px" }}>
          <div className="section-eyebrow" style={{ display: "inline-flex" }}>
            📈 Measured Impact
          </div>
          <h2 className="section-title">
            Numbers that matter
            <br />
            in the field
          </h2>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-16">
          {impactCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px 16px",
                textAlign: "center",
                transition: "all 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background:
                    card.gradient === "ic-green"
                      ? "linear-gradient(to right, var(--primary), var(--secondary))"
                      : card.gradient === "ic-teal"
                        ? "linear-gradient(to right, var(--accent), var(--accent2))"
                        : card.gradient === "ic-yellow"
                          ? "linear-gradient(to right, var(--highlight), #FF8F00)"
                          : "linear-gradient(to right, var(--danger), #FF1744)",
                }}
              />
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{card.icon}</div>
              <AnimatedNumber value={card.num} suffix={card.suffix} color={card.color} hasAnimated={hasAnimated} />
              <div className="text-xs md:text-sm" style={{ color: "var(--muted)", lineHeight: 1.4, marginTop: "8px" }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statsRow.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "16px 20px",
              }}
            >
              <div style={{ fontSize: "24px" }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: stat.color }}>
                  {stat.num}
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({
  value,
  suffix,
  color,
  hasAnimated,
}: {
  value: number;
  suffix: string;
  color: string;
  hasAnimated: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(value * ease);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, value]);

  return (
    <div style={{ fontSize: "36px md:48px", fontWeight: 900, lineHeight: 1, color }}>
      {display.toLocaleString()}
      {suffix}
    </div>
  );
}