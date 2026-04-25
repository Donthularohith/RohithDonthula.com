/* eslint-disable no-undef */
const { useState, useEffect, useRef } = React;

// ────────────────────────────────────────────────────────────
// Project case-study card with click-to-expand
// ────────────────────────────────────────────────────────────
function ProjectCard({ p, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`proj-card ${open ? "is-open" : ""}`}>
      <div className="proj-head" onClick={() => setOpen(o => !o)}>
        <div className="proj-num mono">{String(idx + 1).padStart(2, "0")}</div>
        <div className="proj-meta">
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>
            CASE FILE · {p.classification}
          </div>
          <h3 style={{ fontSize: "clamp(22px, 2.4vw, 32px)", margin: "8px 0 6px", color: "var(--ink)" }}>
            {p.title}
          </h3>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-dim)" }}>{p.subtitle}</div>
        </div>
        <div className="proj-stamp">
          <Stamp color={p.stampColor || "accent"} angle={open ? 0 : -6}>{p.status}</Stamp>
        </div>
        <div className="proj-toggle" aria-hidden>
          <span style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 280ms ease" }}>+</span>
        </div>
      </div>

      {open && (
        <div className="proj-body">
          <div className="proj-grid">
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)", marginBottom: 10 }}>OBJECTIVE</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-dim)" }}>{p.objective}</p>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)", marginBottom: 10 }}>OUTCOME</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-dim)" }}>{p.outcome}</p>
            </div>
          </div>

          <div className="proj-section">
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)", marginBottom: 14 }}>OPERATION LOG</div>
            <ul className="op-log">
              {p.steps.map((s, i) => (
                <li key={i}>
                  <span className="mono" style={{ color: "var(--accent)", marginRight: 12 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ color: "var(--ink)" }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="proj-section">
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)", marginBottom: 14 }}>STACK</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.stack.map((t, i) => <span key={i} className="chip">{t}</span>)}
            </div>
          </div>

          {p.metrics && (
            <div className="proj-metrics">
              {p.metrics.map((m, i) => (
                <div key={i} className="metric">
                  <div className="metric-v">{m.value}</div>
                  <div className="metric-l">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Experience timeline item
// ────────────────────────────────────────────────────────────
function ExpItem({ e, idx }) {
  return (
    <Reveal delay={idx * 80}>
      <div className="exp-row">
        <div className="exp-date mono">
          <div style={{ color: "var(--ink)" }}>{e.from}</div>
          <div style={{ color: "var(--ink-mute)", fontSize: 10, margin: "4px 0" }}>↓</div>
          <div style={{ color: e.current ? "var(--accent)" : "var(--ink-dim)" }}>{e.to}</div>
        </div>
        <div className="exp-rail">
          <span className={`exp-node ${e.current ? "current" : ""}`} />
          <span className="exp-line" />
        </div>
        <div className="exp-card">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "baseline" }}>
            <div>
              <h3 style={{ fontSize: 22, color: "var(--ink)" }}>{e.role}</h3>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 6 }}>
                {e.company} · {e.location}
              </div>
            </div>
            {e.current && <span className="chip chip-signal"><span className="dot" style={{ width: 6, height: 6 }} /> Active</span>}
          </div>
          <ul className="exp-bullets">
            {e.bullets.map((b, i) => (
              <li key={i}><span className="mono" style={{ color: "var(--accent)", marginRight: 10 }}>›</span><span>{b}</span></li>
            ))}
          </ul>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {e.tags.map((t, i) => <span key={i} className="chip" style={{ fontSize: 9, padding: "3px 7px" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ────────────────────────────────────────────────────────────
// Certifications timeline (vertical)
// ────────────────────────────────────────────────────────────
function CertTimeline({ certs }) {
  return (
    <div className="cert-timeline">
      {certs.map((c, i) => (
        <Reveal key={i} delay={i * 60}>
          <div className="cert-row">
            <div className="cert-year mono">{c.year}</div>
            <div className="cert-marker">
              <span className={`cert-dot ${c.status === "achieved" ? "ok" : "pending"}`} />
            </div>
            <div className="cert-body">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
                <div className="mono" style={{ fontSize: 14, color: "var(--ink)" }}>{c.name}</div>
                <span className={`chip ${c.status === "achieved" ? "chip-signal" : "chip-amber"}`}>
                  {c.status === "achieved" ? "VERIFIED" : "IN PROGRESS"}
                </span>
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 6 }}>
                {c.issuer} {c.id ? `· #${c.id}` : ""}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

Object.assign(window, { ProjectCard, ExpItem, CertTimeline });
