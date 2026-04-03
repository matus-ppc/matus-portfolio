"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "./Section";
import { Check, ArrowRight, MonitorPlay, MousePointerClick, Smartphone, ShoppingCart, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { ContactModal } from "./ContactModal";

/* ─── Constants ─────────────────────────────────────── */
const AUDIT_BASE = 400;
const SETUP_PER_PLATFORM = 250;
const PLATFORM_FEE = 250; // Google, Meta, TikTok
const MANAGEMENT_HOURLY_RATE = 35; // 2. a dalsia hodina
const HEUREKA_MONTHLY = 175; // Heureka/CSS sa uctuje fixne
const CONSULTING_RATE = 50;
const FEED_PRICE = 120;
const REPORTS_PRICE = 100;
const COPY_PRICE = 80;

/* ─── Deep-green for column 3 ────────────────────────── */
const COL3_BG = "#144533";

/* ─── Animated counter hook ─────────────────────────── */
function useAnimatedNumber(target: number, duration = 350) {
  const [display, setDisplay] = useState(target);
  const frame = useRef<number | null>(null);
  useEffect(() => {
    const start = display;
    const diff = target - start;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + diff * e));
      if (p < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps
  return display;
}

/* ─── Toggle Switch ──────────────────────────────────── */
function Toggle({ on }: { on: boolean }) {
  return (
    <div
      style={{
        width: 44,
        height: 24,
        borderRadius: 0,
        border: on ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.25)",
        background: on ? "rgba(255,255,255,0.2)" : "transparent",
        display: "flex",
        alignItems: "center",
        padding: "0 3px",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          background: on ? "#fff" : "rgba(255,255,255,0.35)",
          transform: on ? "translateX(20px)" : "translateX(0)",
          transition: "transform 0.2s, background 0.2s",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/* ─── Compact Slider ─────────────────────────────────── */
function CompactSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.8rem",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#fff", cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{min} {unit}</span>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{max} {unit}</span>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────── */
export function Configurator() {
  const { t, language } = useLanguage();

  /* State */
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [hours, setHours] = useState(1);
  const [consulting, setConsulting] = useState(0);
  const [feed, setFeed] = useState(false);
  const [reports, setReports] = useState(false);
  const [copywriting, setCopywriting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<"audit" | "inquiry">("audit");

  const PLATFORMS = [
    { id: "google", name: "Google Ads", icon: <MousePointerClick style={{ width: 18, height: 18 }} /> },
    { id: "meta", name: "Meta Ads", icon: <Smartphone style={{ width: 18, height: 18 }} /> },
    { id: "tiktok", name: "TikTok Ads", icon: <MonitorPlay style={{ width: 18, height: 18 }} /> },
    { id: "heureka", name: "Heureka / CSS", icon: <ShoppingCart style={{ width: 18, height: 18 }} /> },
  ];

  /* Pricing calculations */
  const setupTotal = platforms.length * SETUP_PER_PLATFORM;

  const monthlyTotal = (() => {
    if (platforms.length === 0) return 0;
    
    let t = 0;
    
    // Základ za zakliknuté platformy
    const hasHeureka = platforms.includes("heureka");
    const regularPlatforms = platforms.filter(p => p !== "heureka");
    
    // Fixne +250 € za každú bežnú platformu (táto suma už v sebe obsahuje prvú hodinu správy)
    t += regularPlatforms.length * PLATFORM_FEE;
    
    // Špeciálna logika pre Heureka / CSS (fixná cena)
    if (hasHeureka) {
      t += HEUREKA_MONTHLY;
    }
    
    // Variabilná zložka podľa slideru
    // Ak je vybratá aspoň jedna "veľká" platforma (Google, Meta, TikTok), prvá hodina je v cene
    if (regularPlatforms.length > 0) {
      t += Math.max(0, hours - 1) * MANAGEMENT_HOURLY_RATE;
    }
    // (Ak je vybratá len Heureka, slider nemá na cenu žiadny vplyv)
    
    // Konzultácie a fixné doplnkové služby
    t += consulting * CONSULTING_RATE;
    if (feed) t += FEED_PRICE;
    if (reports) t += REPORTS_PRICE;
    if (copywriting) t += COPY_PRICE;
    
    return t;
  })();

  // Always shows at least the base audit price (400€). Selecting platforms adds +250€ each.
  const startTotal = AUDIT_BASE + setupTotal;
  const displayMonthly = useAnimatedNumber(monthlyTotal);
  const displayStart = useAnimatedNumber(startTotal);

  const togglePlatform = (id: string) =>
    setPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

  const openModal = (source: "audit" | "inquiry") => {
    setModalSource(source);
    setModalOpen(true);
  };

  const isSK = language === "sk";

  /* Phase labels */
  const phase1Label = isSK ? "DIAGNOSTIKA" : "DIAGNOSTICS";
  const phase2Label = isSK ? "IMPLEMENTÁCIA" : "IMPLEMENTATION";
  const phase3Label = isSK ? "OPTIMALIZÁCIA" : "OPTIMIZATION";
  const auditSubLabel = isSK ? "Hĺbkový Audit" : "Deep Audit";
  const setupSubLabel = isSK ? "Úvodné nastavenie" : "Initial Setup";
  const mgmtSubLabel = isSK ? "Mesačná správa" : "Monthly Management";
  const oneTime = isSK ? "Jednorazovo" : "One-time";
  const monthly = isSK ? "Mesačne" : "Monthly";
  const setupNote = isSK ? "Technický štart, trackovanie a príprava stratégie." : "Technical launch, tracking setup and strategy prep.";
  const fixedPriceBadge = isSK ? "Fixná cena za aktiváciu: 250 € / platforma" : "Fixed activation fee: 250 € / platform";

  const addonsList = [
    { state: feed, setter: setFeed, label: isSK ? "Feed Management (Mergado)" : "Feed Management (Mergado)", price: FEED_PRICE },
    { state: reports, setter: setReports, label: isSK ? "Pokročilý Looker Studio Report" : "Advanced Looker Studio Report", price: REPORTS_PRICE },
    { state: copywriting, setter: setCopywriting, label: isSK ? "Tvorba reklamných textov" : "Copywriting of Ad Texts", price: COPY_PRICE },
  ];

  return (
    <>
      <Section id="cennik" className="bg-background border-b border-card-border overflow-hidden">
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 80px" }}>

          {/* Section header */}
          <div
            style={{
              marginBottom: 56,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              padding: "64px 0 40px",
              borderBottom: "1px solid var(--card-border)",
            }}
          >
            <div
              className="ui-label"
              style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ width: 14, height: 14, background: "var(--accent)", display: "inline-block" }} />
              03 — {t.configurator.label}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                color: "var(--foreground)",
              }}
            >
              {t.configurator.title_part1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>{t.configurator.title_italic}</em>
            </h2>
            <p
              className="ui-label"
              style={{ color: "var(--foreground)", opacity: 0.5, maxWidth: 340, textTransform: "uppercase" }}
            >
              {t.configurator.subtext}
            </p>
          </div>

          {/* ── Pricing Container & Grid ── */}
          <div style={{ border: "1px solid var(--card-border)", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            className="pricing-grid"
          >

            {/* ═══════════════════════════════════════
                COL 1 — DIAGNOSTIKA (white)
            ═══════════════════════════════════════ */}
            <div
              style={{
                background: "var(--background)",
                borderRight: "1px solid var(--card-border)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Column header */}
              <div
                style={{
                  padding: "28px 36px 24px",
                  borderBottom: "1px solid var(--card-border)",
                }}
              >
                <div
                  className="ui-label"
                  style={{
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      opacity: 0.7,
                    }}
                  >
                    01 —
                  </span>
                  {phase1Label}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                    color: "var(--foreground)",
                    marginBottom: 4,
                  }}
                >
                  {auditSubLabel}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.78rem",
                    color: "var(--foreground)",
                    opacity: 0.5,
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {t.configurator.audit_desc}
                </p>
              </div>

              {/* Features list — fills vertical space */}
              <ul style={{ flex: 1, padding: "32px 36px", display: "flex", flexDirection: "column", gap: 0 }}>
                {t.configurator.audit_features.map((feature: string, idx: number) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "18px 0",
                      borderBottom: idx < t.configurator.audit_features.length - 1 ? "1px solid var(--card-border)" : "none",
                    }}
                  >
                    <Check
                      style={{
                        width: 14,
                        height: 14,
                        color: "var(--accent)",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.13em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        opacity: 0.75,
                        lineHeight: 1.5,
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price footer */}
              <div
                style={{
                  padding: "24px 36px 36px",
                  borderTop: "1px solid var(--card-border)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    opacity: 0.4,
                    marginBottom: 8,
                  }}
                >
                  {isSK ? "Cena auditu" : "Audit Price"} · {oneTime}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: "var(--foreground)",
                    marginBottom: 20,
                  }}
                >
                  {t.configurator.audit_price}
                </div>
                <button
                  id="btn-objednat-audit"
                  onClick={() => openModal("audit")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    background: "var(--foreground)",
                    color: "var(--background)",
                    padding: "14px 20px",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--foreground)";
                    (e.currentTarget as HTMLElement).style.color = "var(--background)";
                  }}
                >
                  {t.configurator.audit_cta}
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>

            {/* ═══════════════════════════════════════
                COL 2 — IMPLEMENTÁCIA (off-white)
            ═══════════════════════════════════════ */}
            <div
              style={{
                background: "#E6E6E6",
                borderRight: "1px solid var(--card-border)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Column header */}
              <div
                style={{
                  padding: "28px 36px 24px",
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className="ui-label"
                  style={{
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      opacity: 0.7,
                    }}
                  >
                    02 —
                  </span>
                  {phase2Label}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                    color: "#0A0A0A",
                    marginBottom: 4,
                  }}
                >
                  {setupSubLabel}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.78rem",
                    color: "#0A0A0A",
                    opacity: 0.5,
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {setupNote}
                </p>
                {/* Single pricing badge — replaces repeated text in each row */}
                <div
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    paddingBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {fixedPriceBadge}
                  </span>
                </div>
              </div>

              {/* Platform checkboxes */}
              <div style={{ flex: 1, padding: "28px 36px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "#0A0A0A",
                    opacity: 0.45,
                    marginBottom: 16,
                  }}
                >
                  {t.configurator.step1}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(0,0,0,0.12)" }}>
                  {PLATFORMS.map((p, idx) => {
                    const isActive = platforms.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        id={`platform-${p.id}`}
                        onClick={() => togglePlatform(p.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px 20px",
                          background: isActive ? "var(--accent)" : "#fff",
                          borderBottom: idx < PLATFORMS.length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                          cursor: "pointer",
                          transition: "background 0.18s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ color: isActive ? "rgba(255,255,255,0.7)" : "var(--accent)", flexShrink: 0 }}>
                            {p.icon}
                          </div>
                          <div>
                            <span
                              style={{
                                display: "block",
                                fontFamily: "var(--font-inter)",
                                fontSize: "0.75rem",
                                letterSpacing: "0.09em",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                color: isActive ? "#fff" : "#0A0A0A",
                              }}
                            >
                              {p.name}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontFamily: "var(--font-inter)",
                                fontSize: "0.6rem",
                                fontWeight: 500,
                                color: isActive ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)",
                                marginTop: 2,
                              }}
                            >
                              +{p.id === "heureka" ? "175" : "250"} € / {isSK ? "mes." : "mo."}
                            </span>
                          </div>
                        </div>
                        {/* Checkbox */}
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            border: isActive ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(0,0,0,0.2)",
                            background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {isActive && (
                            <Check style={{ width: 11, height: 11, color: "#fff", strokeWidth: 3.5 }} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Arrow indicator */}
              <div
                style={{
                  padding: "20px 36px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <ChevronRight style={{ width: 16, height: 16, color: "var(--accent)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "#0A0A0A",
                    opacity: 0.4,
                  }}
                >
                  {isSK ? "Nasleduje mesačná optimalizácia" : "Monthly optimization follows"}
                </span>
              </div>
            </div>

            {/* ═══════════════════════════════════════
                COL 3 — OPTIMALIZÁCIA (dark green)
            ═══════════════════════════════════════ */}
            <div
              style={{
                background: COL3_BG,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Column header */}
              <div
                style={{
                  padding: "28px 36px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ opacity: 0.7 }}>03 —</span>
                  {phase3Label}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {mgmtSubLabel}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {isSK ? "Konfigurátor mesačnej správy vašich kampaní." : "Configurator for monthly campaign management."}
                </p>
              </div>

              {/* Sliders */}
              <div style={{ padding: "28px 36px 20px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 20,
                  }}
                >
                  {t.configurator.step2}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <CompactSlider
                    label={t.configurator.step2_hours}
                    value={hours}
                    min={1}
                    max={50}
                    unit="h"
                    onChange={setHours}
                  />
                  <CompactSlider
                    label={t.configurator.step2_cons}
                    value={consulting}
                    min={0}
                    max={5}
                    unit="h"
                    onChange={setConsulting}
                  />
                </div>
              </div>

              {/* Add-ons */}
              <div style={{ flex: 1, padding: "0 36px 0" }}>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 14,
                    paddingTop: 20,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {t.configurator.step3}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {addonsList.map((addon, idx) => (
                    <div
                      key={idx}
                      id={`addon-${idx}`}
                      onClick={() => addon.setter(!addon.state)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 0",
                        borderBottom: idx < addonsList.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                        cursor: "pointer",
                        gap: 12,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: addon.state ? "#fff" : "rgba(255,255,255,0.7)",
                          }}
                        >
                          {addon.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            color: addon.state ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                            marginTop: 2,
                          }}
                        >
                          +{addon.price} €/{isSK ? "mes." : "mo."}
                        </div>
                      </div>
                      <Toggle on={addon.state} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

            {/* ══════════════════════════════════════════════════
            ══════════════════════════════════════════════════ */}
            <div
              id="recap-bar"
              style={{
                background: "#0A0A0A",
                display: "flex",
                alignItems: "stretch",
                minHeight: 100,
              }}
              className="recap-bar"
            >
        {/* ── SEKCIA A: JEDNORAZOVÝ ŠTART ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "12px 32px",
            borderRight: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 5,
            }}
          >
            {isSK ? "Štart (Jednorazovo)" : "Start (One-time)"}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.6rem, 5vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#ffffff",
              }}
            >
              {displayStart} €
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                fontWeight: 700,
              }}
            >
              {platforms.length === 0
                ? isSK ? "Iba audit" : "Audit only"
                : isSK ? `Audit + ${platforms.length}× setup` : `Audit + ${platforms.length}× setup`}
            </span>
          </div>
          {/* Formula breakdown */}
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.22)",
              fontWeight: 500,
              marginTop: 6,
            }}
          >
            [{isSK ? "400€ audit" : "400€ audit"}
            {platforms.length > 0 && ` + (${platforms.length} × 250€) setup`}]
            {" = "}{startTotal} €
          </div>
        </div>

        {/* ── SEKCIA B: MESAČNÁ SPRÁVA ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "12px 32px",
            borderRight: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 5,
            }}
          >
            {isSK ? "Mesačná správa" : "Monthly Management"}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.6rem, 5vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: platforms.length > 0 ? "#ffffff" : "rgba(255,255,255,0.2)",
              }}
            >
              {platforms.length > 0 ? `${displayMonthly} €` : "—"}
            </span>
            {platforms.length > 0 && (
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  fontWeight: 700,
                }}
              >
                /{isSK ? "mesiac" : "month"}
              </span>
            )}
            {platforms.length === 0 && (
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                  fontWeight: 700,
                }}
              >
                {isSK ? "Vyberte platformu" : "Select a platform"}
              </span>
            )}
          </div>
        </div>

        {/* ── SEKCIA C: CTA ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
            flexShrink: 0,
          }}
        >
          <button
            id="btn-send-inquiry"
            onClick={() => openModal("inquiry")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#ffffff",
              color: "#0A0A0A",
              padding: "14px 28px",
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#fff";
              (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
            }}
          >
            {isSK ? "Odoslať dopyt" : "Send Inquiry"}
            <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </div>
     </div> {/* End Unified Container */}
     </div> {/* End MaxWidth Wrapper */}
    </Section>

    {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1023px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
          .pricing-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--card-border);
          }
          .recap-bar {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .recap-bar > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
          }
          .recap-bar > div:last-child {
            border-bottom: none !important;
          }
          #btn-send-inquiry {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
        calculatorData={{
          startPrice: startTotal,
          totalPrice: monthlyTotal,
          platforms: platforms.map((pId) => PLATFORMS.find((x) => x.id === pId)?.name ?? pId),
          hours,
          consulting,
          addons: [
            ...(feed ? [t.configurator.addons[0]] : []),
            ...(reports ? [t.configurator.addons[1]] : []),
            ...(copywriting ? [t.configurator.addons[2]] : []),
          ],
        }}
      />
    </>
  );
}
