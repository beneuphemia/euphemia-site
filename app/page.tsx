"use client";

import { useEffect, useRef, useState } from "react";

/* ── tiny inline components ── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1.25rem 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "rgba(10,12,20,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "0.08em", color: "#FAFBFF" }}>
        EUPHEMIA
      </span>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {["Science", "Approach", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8B91B0",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FAFBFF")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8B91B0")}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#C9A84C",
            textDecoration: "none",
            border: "1px solid rgba(201,168,76,0.35)",
            padding: "0.45rem 1.1rem",
            borderRadius: "2px",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "rgba(201,168,76,0.1)";
            (e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.7)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "transparent";
            (e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)";
          }}
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}

/* ── orbit animation canvas ── */
function OrbitCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles representing water molecules / atoms
    const particles = Array.from({ length: 60 }, (_, i) => ({
      angle: (i / 60) * Math.PI * 2,
      radius: 80 + Math.random() * 160,
      speed: (0.0003 + Math.random() * 0.0006) * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 2.5,
      color: i % 7 === 0 ? "#C9A84C" : i % 13 === 0 ? "#C03A2B" : "#1B4FD8",
      opacity: 0.3 + Math.random() * 0.5,
    }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw faint orbital rings
      [100, 160, 220].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(27,79,216,${0.06 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update + draw particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.35; // flatten to ellipse

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Central glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
      grad.addColorStop(0, "rgba(27,79,216,0.22)");
      grad.addColorStop(0.5, "rgba(27,79,216,0.08)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(201,168,76,0.9)";
      ctx.fill();

      frame++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

/* ── stat card ── */
function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2.4rem", fontWeight: 700, color, letterSpacing: "-0.02em", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: "0.72rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "#8B91B0", marginTop: "0.4rem" }}>
        {label}
      </div>
    </div>
  );
}

/* ── section divider ── */
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 auto", maxWidth: "6rem" }}>
      <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C9A84C" }} />
      <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

/* ── pillar card ── */
function Pillar({
  color,
  label,
  title,
  body,
}: {
  color: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "4px",
        padding: "2rem",
        transition: "border-color 0.3s, background 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = color + "44";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
      }}
    >
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: "1rem" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#FAFBFF", marginBottom: "0.75rem", lineHeight: 1.35 }}>
        {title}
      </div>
      <div style={{ fontSize: "0.875rem", color: "#8B91B0", lineHeight: 1.7 }}>
        {body}
      </div>
    </div>
  );
}

/* ── main page ── */
export default function Home() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "0 6vw",
          gap: "4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background scatter */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(27,79,216,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* left: copy */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            className="animate-float-up delay-100"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "1.5rem",
            }}
          >
            Computational Drug Discovery
          </div>

          <h1
            className="animate-float-up delay-200"
            style={{
              fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "#FAFBFF",
              marginBottom: "0.3rem",
            }}
          >
            The physics of
            <br />
            <span className="gold-shimmer">water, made precise.</span>
          </h1>

          <p
            className="animate-float-up delay-300"
            style={{
              fontSize: "1.05rem",
              color: "#8B91B0",
              lineHeight: 1.75,
              maxWidth: "38ch",
              marginTop: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            Euphemia combines rigorous molecular simulation with machine learning
            to map solvation networks that conventional docking ignores —
            turning water from noise into signal.
          </p>

          <div className="animate-float-up delay-500" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{
                display: "inline-block",
                background: "#1B4FD8",
                color: "#FAFBFF",
                padding: "0.85rem 2rem",
                borderRadius: "3px",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#3B6EF5")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#1B4FD8")}
            >
              Partner with us
            </a>
            <a
              href="#science"
              style={{
                display: "inline-block",
                color: "#8B91B0",
                padding: "0.85rem 1.5rem",
                fontSize: "0.82rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FAFBFF")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8B91B0")}
            >
              Our science →
            </a>
          </div>

          {/* stats row */}
          <div
            className="animate-float-up delay-700"
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Stat value="~10³" label="Water sites mapped" color="#1B4FD8" />
            <Stat value="GCMC" label="Grand canonical engine" color="#C9A84C" />
            <Stat value="FEP+" label="Rigorous ΔΔG" color="#C03A2B" />
          </div>
        </div>

        {/* right: orbit canvas */}
        <div
          className="animate-float-up delay-300"
          style={{ height: "480px", position: "relative", zIndex: 2 }}
        >
          <OrbitCanvas />
        </div>
      </section>

      {/* ── SCIENCE ── */}
      <section
        id="science"
        style={{
          padding: "8rem 6vw",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C03A2B",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            The science
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#FAFBFF",
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            Solvation is the unsolved problem.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#8B91B0",
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: "58ch",
              margin: "0 auto 4rem",
            }}
          >
            Every drug binds in water. The binding-site water network dictates whether a molecule
            displaces a thermodynamically costly water molecule, inherits a favourable one, or
            misses the pocket entirely. Docking scores ignore this. Euphemia does not.
          </p>

          <Divider />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "4rem" }}>
            <Pillar
              color="#1B4FD8"
              label="Physics"
              title="Grand Canonical Monte Carlo"
              body="We use GCMC/MD to equilibrate explicit water networks across binding sites at thermodynamic resolution — finding every occupied, displáceable, and structural water position."
            />
            <Pillar
              color="#C9A84C"
              label="Machine Learning"
              title="ML-accelerated scoring"
              body="Solvation-aware descriptors trained on free energy data let us screen chemical space at scale without sacrificing physical accuracy — ML guided by physics, not replacing it."
            />
            <Pillar
              color="#C03A2B"
              label="Truth"
              title="Rigorous ΔΔG validation"
              body="Free Energy Perturbation benchmarks against crystallographic water positions and experimental affinities. Predictions are only as trustworthy as their calibration."
            />
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section
        id="approach"
        style={{
          padding: "8rem 6vw",
          background: "rgba(27,79,216,0.04)",
          borderTop: "1px solid rgba(27,79,216,0.1)",
          borderBottom: "1px solid rgba(27,79,216,0.1)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: "1.25rem",
                }}
              >
                Our approach
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#FAFBFF",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                Physics as the foundation.
                <br />
                <span style={{ color: "#C9A84C" }}>ML as the accelerant.</span>
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#8B91B0", lineHeight: 1.8, marginBottom: "1.2rem" }}>
                The field has bifurcated into two camps: empirical ML models that train on affinity data
                without physical understanding, and academic simulation workflows too slow for drug
                discovery timescales.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#8B91B0", lineHeight: 1.8 }}>
                Euphemia sits at neither pole. Physics sets the boundary conditions; machine learning
                navigates within them. The result is predictions that generalise to novel chemotypes
                — the cases where data-only models fail.
              </p>
            </div>
            <div>
              {[
                { step: "01", title: "Target hydration mapping", desc: "GCMC/MD across the binding site, producing a thermodynamic water map with occupancy and ΔG per site." },
                { step: "02", title: "Solvation-aware virtual screening", desc: "ML scoring functions informed by water displacement thermodynamics — not just shape complementarity." },
                { step: "03", title: "FEP lead optimisation", desc: "Rigorous relative binding free energy calculations for shortlisted compounds, prioritised by experimental tractability." },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginBottom: "2rem",
                    paddingBottom: "2rem",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ fontSize: "0.65rem", color: "#1B4FD8", fontWeight: 700, letterSpacing: "0.1em", paddingTop: "0.2rem", flexShrink: 0 }}>
                    {step}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FAFBFF", marginBottom: "0.4rem" }}>{title}</div>
                    <div style={{ fontSize: "0.82rem", color: "#8B91B0", lineHeight: 1.7 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATION ── */}
      <section style={{ padding: "8rem 6vw" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              fontWeight: 700,
              color: "#FAFBFF",
              letterSpacing: "-0.02em",
              textAlign: "center",
              marginBottom: "3.5rem",
              lineHeight: 1.25,
            }}
          >
            Where Euphemia differs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
            {[
              { label: "vs. Docking", left: "Shape + electrostatic scoring", right: "Water displacement ΔG as primary binding signal" },
              { label: "vs. Pure ML", left: "Interpolation within training distribution", right: "Physics-grounded generalisation to novel scaffolds" },
              { label: "vs. Academic MD", left: "Publication timescales, no decision pipeline", right: "Campaign-ready throughput with rigour maintained" },
              { label: "vs. Schrödinger / FEP+", left: "General-purpose; water networks as add-on", right: "Water network analysis as the core differentiator" },
            ].map(({ label, left, right }) => (
              <div
                key={label}
                style={{
                  background: "#0A0C14",
                  padding: "1.75rem 2rem",
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "#8B91B0", lineHeight: 1.5 }}>{left}</div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2E3250", textAlign: "center", whiteSpace: "nowrap" }}>
                  {label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#FAFBFF", lineHeight: 1.5, textAlign: "right" }}>{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{
          padding: "8rem 6vw",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C03A2B",
              marginBottom: "1.25rem",
            }}
          >
            Work with us
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#FAFBFF",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}
          >
            Serious about solvation?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#8B91B0", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            We partner with biotech and pharma teams where water network modelling
            is a bottleneck — early target validation, hit-to-lead, or FEP campaign design.
            If you have a target and want to understand its hydration, let&apos;s talk.
          </p>
          <a
            href="mailto:info@euphemia.ai"
            style={{
              display: "inline-block",
              background: "transparent",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.5)",
              padding: "1rem 2.5rem",
              borderRadius: "3px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "rgba(201,168,76,0.1)";
              (e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)";
            }}
          >
            info@euphemia.ai
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "2.5rem 6vw",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "#2E3250" }}>
          EUPHEMIA
        </span>
        <span style={{ fontSize: "0.72rem", color: "#2E3250", letterSpacing: "0.05em" }}>
          © 2025 Euphemia Ltd · UK
        </span>
        <span
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            color: "#2E3250",
            fontStyle: "italic",
          }}
        >
          veritas per aquam
        </span>
      </footer>
    </>
  );
}
