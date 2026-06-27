import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import Features from "@/components/Features";
import AIChat from "@/components/AIChat";
import Journey from "@/components/Journey";
import Analytics from "@/components/Analytics";
import Impact from "@/components/Impact";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HusikaBanner />
      <Dashboard />
      <Features />
      <AIChat />
      <Journey />
      <Analytics />
      <Impact />
      <Testimonials />
      <CTABand />
      <Footer />
    </main>
  );
}

function HusikaBanner() {
  return (
    <div
      style={{
        background: "rgba(0,191,165,0.07)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 48px",
        textAlign: "center",
        fontSize: "13px",
        color: "var(--muted)",
      }}
    >
      <span style={{ color: "var(--accent)", fontWeight: 700 }}>AgroSense AI</span>
      {" "}is an intelligent extension of{" "}
      <span style={{ color: "var(--secondary)", fontWeight: 700 }}>HUSIKA MIMS</span>
      {" "}— the official early warning platform of the IGAD Climate Prediction and
      Applications Centre (ICPAC), serving 11 countries across the Greater Horn
      of Africa.
    </div>
  );
}