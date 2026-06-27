"use client";

import { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      type: "farmer",
      label: "Amina (Farmer · Marsabit)",
      text: "Should I plant maize this week? My field in Laisamis is ready.",
    },
    {
      type: "ai",
      label: "AgroSense AI",
      analyzing: false,
      text: "⚠️ I recommend waiting 5–7 days before planting.\n\nHUSIKA forecasts 42mm of heavy rainfall over Marsabit between June 28–July 3. Planting maize in waterlogged soil at this stage risks seed rot and poor germination.\n\nAfter July 4, conditions are optimal: soil moisture will be at 68%, temperature 24°C, and no further rain forecast for 10 days — ideal germination window.",
      metrics: [
        { label: "CONFIDENCE", value: "93%", color: "var(--success)" },
        { label: "RISK IF PLANT NOW", value: "HIGH", color: "var(--danger)" },
        { label: "RECOMMENDED VARIETY", value: "H614D DT", color: "var(--accent)" },
      ],
    },
    {
      type: "farmer",
      label: "Amina (Farmer · Marsabit)",
      text: "What about pest risk if I wait?",
    },
    {
      type: "ai",
      label: "AgroSense AI",
      typing: true,
    },
  ]);

  const contextSteps = [
    {
      num: 1,
      title: "Farmer registers crop & location",
      desc: "One-time setup via WhatsApp, USSD, or the app. Name, crop type, county, planting date.",
    },
    {
      num: 2,
      title: "HUSIKA alert fires",
      desc: "A drought or flood warning triggers the AgroSense pipeline automatically.",
    },
    {
      num: 3,
      title: "AI generates personalized advice",
      desc: "RAG retrieves agronomic guidance. GPT-4o generates 3 crop-specific actions in 8 seconds.",
    },
    {
      num: 4,
      title: "Farmer receives it on their phone",
      desc: "WhatsApp for smartphones. USSD or SMS for feature phones. No internet needed.",
    },
  ];

  return (
    <section id="ai-chat" className="py-16 md:py-24 px-4 md:px-8 lg:px-12" style={{ background: "var(--bg2)" }}>
      <div className="container mx-auto">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="order-2 lg:order-1">
            <div className="section-eyebrow">🤖 AI Farm Advisor</div>
            <h2 className="section-title">
              Ask anything.
              <br />
              Get farm-ready answers.
            </h2>
            <p className="section-sub">
              The AI Advisor understands crop growth stages, local hazards, soil
              conditions, and market context — and answers in the farmer&apos;s
              language.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {contextSteps.map((item) => (
                <div key={item.num} className="flex gap-4 items-start">
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "rgba(0,191,165,0.1)",
                      border: "1px solid rgba(0,191,165,0.25)",
                      color: "var(--accent)",
                      fontSize: "13px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ fontSize: "15px" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--muted)" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border2)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "var(--glow)",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(0,0,0,0.2)",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, var(--primary), var(--accent))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}
                >
                  🌱
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700 }}>AgroSense AI Advisor</div>
                  <div style={{ fontSize: "12px", color: "var(--success)" }}>● Active · Swahili mode · Marsabit</div>
                </div>
                <span className="tag-pill pill-green text-xs">93% Confidence</span>
              </div>

              <div className="p-4 md:p-5 flex flex-col gap-4" style={{ minHeight: "300px" }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      maxWidth: "85%",
                      alignSelf: msg.type === "farmer" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--muted)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "6px",
                        textAlign: msg.type === "farmer" ? "right" : "left",
                      }}
                    >
                      {msg.label}
                    </div>
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: msg.type === "farmer" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        fontSize: "14px",
                        lineHeight: 1.55,
                        background: msg.type === "farmer" ? "rgba(46,125,50,0.25)" : "rgba(0,0,0,0.25)",
                        border: msg.type === "farmer" ? "1px solid rgba(46,125,50,0.35)" : "1px solid var(--border2)",
                      }}
                    >
                      {msg.typing ? (
                        <div className="flex items-center gap-1 py-2">
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: "var(--muted)",
                                animation: `typing-bounce 1.4s ${d * 0.2}s ease-in-out infinite`,
                              }}
                            />
                          ))}
                        </div>
                      ) : msg.analyzing ? (
                        <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "8px" }}>
                          Analysing data sources...
                        </div>
                      ) : null}

                      {msg.text && <div style={{ color: "var(--text)" }}>{msg.text}</div>}

                      {msg.metrics && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.metrics.map((m, mi) => (
                            <div
                              key={mi}
                              style={{
                                background: "rgba(0,0,0,0.3)",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                padding: "6px 10px",
                                fontSize: "12px",
                              }}
                            >
                              <div style={{ color: "var(--muted)", fontSize: "10px" }}>{m.label}</div>
                              <div style={{ fontWeight: 700, color: m.color }}>{m.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <input
                  placeholder="Ask about planting, pests, irrigation, market prices..."
                  type="text"
                  style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "var(--text)",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, var(--primary), var(--accent2))",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    transition: "all 0.2s",
                  }}
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}