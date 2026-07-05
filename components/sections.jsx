/* eslint-disable no-undef */
const { useState, useEffect, useRef } = React;

// ────────────────────────────────────────────────────────────
// Project case-study card with click-to-expand
// ────────────────────────────────────────────────────────────
function ProjectCard({ p, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`proj-card tilt-in ${open ? "is-open" : ""}`}>
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
        <div className="exp-card tilt-in">
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
          <div className="cert-row tilt-in">
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

// ────────────────────────────────────────────────────────────
// TerminalConsole — a genuinely typable terminal. Real command
// processing against the site's own data (PROJECTS/EXPERIENCE/
// CERTS), not a canned animation.
// ────────────────────────────────────────────────────────────
function buildTerminalCommands(navigate) {
  const line = (s = "") => s;
  return {
    help: () => [
      "AVAILABLE COMMANDS:",
      "  help              show this list",
      "  whoami            subject identity",
      "  about             read the subject brief",
      "  ls                list site sections",
      "  experience        print service record",
      "  projects          list operations / case files",
      "  skills            print capability stack",
      "  certs             print verified credentials",
      "  contact           print contact channels",
      "  resume            open resume.pdf",
      "  goto <section>    jump to a section (about, experience, projects, capabilities, contact)",
      "  sudo hire-me      ;)",
      "  clear             clear the terminal",
    ],
    whoami: () => ["guest@rd-0001 — clearance: PUBLIC", "subject: Rohith Donthula — Purple-Team Cybersecurity Analyst"],
    about: () => [
      "Purple-team analyst — MS Cybersecurity, Yeshiva University (2026).",
      "CompTIA Security+ and CySA+ certified. Currently SOC analyst at SecVal MSSP.",
      "Principle: attack what you build, build what survives the attack.",
    ],
    ls: () => ["about/  experience/  projects/  capabilities/  record/  contact/"],
    experience: () => (window.EXPERIENCE || []).flatMap(e => [
      `${e.from} – ${e.to}  ${e.role} · ${e.company}`,
    ]),
    projects: () => (window.PROJECTS || []).map((p, i) => `[${String(i + 1).padStart(2, "0")}] ${p.title} — ${p.status}`),
    skills: () => ["Purple-team ops · Atomic Red Team · Caldera · MITRE ATT&CK · Stellar Cyber XDR · CrowdStrike Falcon · Splunk · Sigma · Tenable · NIST 800-61 · SOC2 · PCI-DSS · GDPR · HIPAA"],
    certs: () => (window.CERTS || []).map(c => `${c.year}  ${c.name}  [${c.status === "achieved" ? "VERIFIED" : "IN PROGRESS"}]`),
    contact: () => [
      "email    donthula.rohith22@gmail.com",
      "phone    (551) 325-9945",
      "linkedin /in/rohith-donthula",
      "github   /Donthularohith",
    ],
    resume: () => { window.open("public/resume.pdf", "_blank"); return ["Opening resume.pdf …"]; },
    "sudo hire-me": () => { navigate("contact"); return ["Permission granted.", "Redirecting to Contact …"]; },
  };
}

function TerminalConsole() {
  const [lines, setLines] = useState([
    { type: "out", text: "rd-terminal v1.0 — type 'help' to see available commands." },
  ]);
  const [value, setValue] = useState("");
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const history = useRef([]);

  const navigate = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const commands = useRef(buildTerminalCommands(navigate));

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    history.current.push(cmd);
    setHistIdx(-1);
    setLines(prev => [...prev, { type: "in", text: cmd }]);

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd.startsWith("goto ")) {
      const target = cmd.slice(5).trim();
      const valid = ["about", "experience", "projects", "capabilities", "record", "contact"];
      if (valid.includes(target)) {
        navigate(target === "record" ? "record" : target);
        setLines(prev => [...prev, { type: "out", text: `Navigating to ${target} …` }]);
      } else {
        setLines(prev => [...prev, { type: "out", text: `no such section: ${target}` }]);
      }
      return;
    }
    const handler = commands.current[cmd];
    if (handler) {
      const out = handler();
      setLines(prev => [...prev, ...out.map(text => ({ type: "out", text }))]);
    } else {
      setLines(prev => [...prev, { type: "out", text: `command not found: ${cmd} — type 'help'` }]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.current.length) return;
      const next = Math.min(histIdx + 1, history.current.length - 1);
      setHistIdx(next);
      setValue(history.current[history.current.length - 1 - next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setValue(next === -1 ? "" : history.current[history.current.length - 1 - next] || "");
    }
  };

  return (
    <div className="term-console" onClick={() => inputRef.current?.focus()}>
      <div className="term-scroll mono" ref={scrollRef}>
        {lines.map((l, i) => (
          <div key={i} className={`term-line ${l.type === "in" ? "term-in" : "term-out"}`}>
            {l.type === "in" ? <><span className="term-prompt">guest@rd-0001:~$</span> {l.text}</> : l.text}
          </div>
        ))}
      </div>
      <div className="term-input-row mono">
        <span className="term-prompt">guest@rd-0001:~$</span>
        <input
          ref={inputRef}
          className="term-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
        <span className="caret" />
      </div>
    </div>
  );
}

Object.assign(window, { ProjectCard, ExpItem, CertTimeline, TerminalConsole });
