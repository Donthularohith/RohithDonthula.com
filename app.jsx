/* eslint-disable no-undef */
const { useState, useEffect, useRef } = React;

function App() {
  // Tweaks
  const [tweaks, setTweaks] = useTweaks({
    "mode": "dossier",        // dossier | terminal | recruiter
    "density": "roomy",        // compact | roomy | airy
    "background": "grid",      // grid | grain | scan | none
    "cursor": true,
    "scanlines": false,
  });

  // Sync to body data-attributes
  useEffect(() => {
    document.body.dataset.mode = tweaks.mode;
    document.body.dataset.density = tweaks.density;
    document.body.dataset.bg = tweaks.background;
    document.body.dataset.cursor = tweaks.cursor ? "on" : "off";
  }, [tweaks]);

  return (
    <>
      <CustomCursor enabled={tweaks.cursor} />
      <ClassifiedHeader />
      <Hero />
      <BriefMarquee />
      <About />
      <ExperienceSection />
      <BriefMarquee variant="b" />
      <ProjectsSection />
      <CapabilitySection />
      <CertsAndTestimonials />
      <BriefMarquee variant="c" />
      <NewsSection />
      <Contact />
      <FooterStrip />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Mode">
          <TweakRadio
            label="Visual mode"
            value={tweaks.mode}
            onChange={v => setTweaks({ mode: v })}
            options={[
              { label: "Dossier", value: "dossier" },
              { label: "Terminal", value: "terminal" },
              { label: "Recruiter", value: "recruiter" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={v => setTweaks({ density: v })}
            options={[
              { label: "Compact", value: "compact" },
              { label: "Roomy", value: "roomy" },
              { label: "Airy", value: "airy" },
            ]}
          />
          <TweakRadio
            label="Background"
            value={tweaks.background}
            onChange={v => setTweaks({ background: v })}
            options={[
              { label: "Grid", value: "grid" },
              { label: "Grain", value: "grain" },
              { label: "Scan", value: "scan" },
              { label: "None", value: "none" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Effects">
          <TweakToggle label="Custom cursor" value={tweaks.cursor} onChange={v => setTweaks({ cursor: v })} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// ─────────────────────────────────────────────
// Top classification strip
// ─────────────────────────────────────────────
function ClassifiedHeader() {
  return (
    <div className="classified-bar">
      <div className="shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "10px 32px" }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-mute)" }}>
          DOSSIER #882-991 · DEPT/CYBERSEC · TLP:AMBER · <span style={{ color: "var(--accent)" }}>RD-0001</span>
        </div>
        <nav className="topnav">
          <a href="#about">001 / Brief</a>
          <a href="#experience">002 / Service</a>
          <a href="#projects">003 / Operations</a>
          <a href="#capabilities">004 / Capabilities</a>
          <a href="#contact">005 / Contact</a>
        </nav>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-dim)" }}>
          <UtcClock />
        </div>
      </div>
      <div className="scanbar" />
    </div>
  );
}

// ─────────────────────────────────────────────
// ─────────────────────────────
function TypeURL({ text, speed = 55, scrambleMs = 700, idleMs = 6000 }) {
  const [out, setOut] = React.useState("");
  const [phase, setPhase] = React.useState("scramble"); // scramble → type → idle
  const [tick, setTick] = React.useState(0); // forces re-run

  // blinking caret
  const [caretOn, setCaretOn] = React.useState(true);
  React.useEffect(() => {
    const id = setInterval(() => setCaretOn(c => !c), 520);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const glyphs = "!@#$%^&*<>/?0123456789ABCDEFabcdef";
    let i = 0;
    let timeouts = [];

    // 1. scramble pre-roll
    setPhase("scramble");
    const start = Date.now();
    const scramble = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      if (elapsed >= scrambleMs) {
        setOut("");
        // 2. type out
        const typeNext = () => {
          if (cancelled) return;
          if (i < text.length) {
            setOut(text.slice(0, i + 1));
            i++;
            timeouts.push(setTimeout(typeNext, speed + Math.random() * 40));
          } else {
            setPhase("idle");
            // 3. idle, then loop
            timeouts.push(setTimeout(() => setTick(t => t + 1), idleMs));
          }
        };
        setPhase("type");
        typeNext();
        return;
      }
      const len = Math.min(text.length, Math.floor((elapsed / scrambleMs) * text.length) + 4);
      let s = "";
      for (let k = 0; k < len; k++) s += glyphs[Math.floor(Math.random() * glyphs.length)];
      setOut(s);
      timeouts.push(setTimeout(scramble, 45));
    };
    scramble();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [text, speed, scrambleMs, idleMs, tick]);

  return (
    <span className="type-url" style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      <span style={{ whiteSpace: "pre" }}>{out}</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 7,
          height: "0.95em",
          background: phase === "idle" ? "var(--accent)" : "var(--ink)",
          opacity: caretOn ? 1 : 0,
          marginLeft: 1,
          transition: "background 120ms",
          transform: "translateY(1px)",
        }}
      />
    </span>
  );
}

// ─────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        {/* Left: identity */}
        <div className="hero-id">
          <div className="hero-eyebrow">
            <span className="dot" />
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--ink-dim)" }}>
              SUBJECT ACTIVE · TRANSMITTING
            </span>
          </div>

          <h1 className="hero-name display">
            <span className="hero-line">ROHITH</span>
            <span className="hero-line dim">DONTHULA</span>
          </h1>

          <div className="hero-roles mono">
            <Typewriter text="// PURPLE TEAM · DETECTION ENGINEERING · ADVERSARY EMULATION · INCIDENT RESPONSE · CLOUD SECURITY" speed={18} />
          </div>

          <p className="hero-lede">
            I run <span className="under">purple-team</span> ops — emulating adversaries (red) and hardening detections against them (blue) in the same sprint. Currently securing <span className="under">healthcare EHR</span> infrastructure at Cerner; previously hardened banking pipelines at Capgemini. MS Cybersecurity, Yeshiva University — <span style={{color:"var(--accent)"}}>graduated 2025.</span>
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">› View Operations</a>
            <a className="btn" href="resume.pdf" target="_blank" rel="noreferrer">Download CV ↓</a>
          </div>

          <div className="hero-creds">
            <div className="cred">
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>VERIFIED</div>
              <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>Security+ CE</div>
            </div>
            <div className="cred">
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>FIELD</div>
              <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>Purple Team</div>
            </div>
            <div className="cred">
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>STATION</div>
              <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>Jersey City, NJ</div>
            </div>
          </div>
        </div>

        {/* Right: dossier card */}
        <div className="hero-dossier">
          <Panel title={<TypeURL text="dossier://subject/RD-0001" />} corners>
            <div className="dossier-photo">
              <img src="public/profile.jpg" alt="" />
              <div className="dossier-overlay">
                <div className="crosshair-h" />
                <div className="crosshair-v" />
                <div className="dossier-tag">RD-0001</div>
                <Stamp angle={-8} style={{ position: "absolute", bottom: 14, right: 14 }}>CLEARED · L5</Stamp>
              </div>
            </div>
            <dl className="kv" style={{ marginTop: 18 }}>
              <dt>Subject</dt><dd>Rohith Donthula</dd>
              <dt>Discipline</dt><dd>Cybersecurity / Purple Team</dd>
              <dt>Specialization</dt><dd>Detection Eng · Adversary Emulation · IR</dd>
              <dt>Sector</dt><dd>Healthcare · Financial Services</dd>
              <dt>Education</dt><dd>MS Cybersecurity · Yeshiva (2026)</dd>
              <dt>Status</dt><dd><span className="dot" style={{ marginRight: 8, verticalAlign: "middle" }} />Operational · On Active Engagement</dd>
            </dl>
          </Panel>

          <div className="dossier-strip">
            <div>
              <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)" }}>4+</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>YRS FIELD</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)" }}>500+</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>ENDPOINTS</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)" }}>50+</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>IR EVENTS</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--accent)" }}>30%</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>↓ MTTD</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Marquee
// ─────────────────────────────────────────────
function BriefMarquee({ variant = "a" }) {
  const sets = {
    a: ["INTELLIGENCE GATHERED", "AUDIT COMPLETE", "ACCESS GRANTED", "SYSTEM SECURE", "MTTD ↓ 30%", "MITRE ATT&CK MAPPED", "HIPAA ENFORCED", "ZERO TRUST"],
    b: ["DEPLOYING COUNTERMEASURES", "ANALYZING TRAFFIC", "ENCRYPTING DATA", "FIREWALL ACTIVE", "EDR ONLINE", "SIGMA RULES LOADED", "TLP:AMBER"],
    c: ["EXECUTING PROTOCOLS", "HANDSHAKE COMPLETE", "CERTIFICATES VERIFIED", "CONNECTION ESTABLISHED", "SOC ON DUTY", "INCIDENT CLOSED"],
  };
  return <Marquee items={sets[variant]} />;
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head">
          <div className="num">001 / Subject Brief</div>
          <h2>Bridging offensive insight with <span className="accent">defensive engineering.</span></h2>
        </div>

        <div className="about-grid">
          <Reveal>
            <Panel title="brief.md" corners>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--ink)" }}>
                I'm a <span style={{ color: "var(--accent)" }}>purple-team analyst</span> — finishing my <span style={{ color: "var(--accent)" }}>MS in Cybersecurity at Yeshiva University</span> (May 2026), CompTIA <span style={{ color: "var(--accent)" }}>Security+</span> and <span style={{ color: "var(--accent)" }}>CySA+</span> certified. My work runs on a single principle: <em>attack what you build, build what survives the attack.</em>
              </p>
              <p style={{ marginTop: 16, color: "var(--ink-dim)", lineHeight: 1.65 }}>
                Currently a SOC analyst at <span style={{ color: "var(--ink)" }}>SecVal MSSP</span> — running Stellar Cyber Open XDR and CrowdStrike Falcon for hospitality clients under PCI DSS, correlating IOCs and TTPs against MITRE ATT&CK, and tuning detections to kill false-positive noise. I split my day between the red side (emulating adversary behavior with Atomic Red Team / Caldera, attacking my own Sigma rules) and the blue side (hardening detections, closing coverage gaps, regressing them in CI).
              </p>
              <p style={{ marginTop: 16, color: "var(--ink-dim)", lineHeight: 1.65 }}>
                Before SecVal: ten months at <span style={{ color: "var(--ink)" }}>Cerner Healthcare</span> tuning EHR detections under HIPAA — pulled MTTD down ~30% — and three years at <span style={{ color: "var(--ink)" }}>Capgemini</span> hardening SWIFT and payment infrastructure under PCI-DSS / GDPR with zero major audit findings. I gravitate toward messy infrastructure under strict compliance, and I write reports leadership actually reads.
              </p>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <div className="about-side">
              <div className="about-stat">
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>FRAMEWORKS & ENGAGEMENTS</div>
                <div className="mono" style={{ marginTop: 8, fontSize: 13, color: "var(--ink)", lineHeight: 1.7 }}>
                  Purple-team ops · Atomic Red Team · Caldera · MITRE ATT&CK · Stellar Cyber XDR · CrowdStrike Falcon · Splunk · Sigma · Tenable · NIST 800-61 · SOC2 · PCI-DSS · GDPR · HIPAA
                </div>
              </div>
              <div className="about-stat">
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>FIELD ACHIEVEMENTS</div>
                <ul style={{ margin: "10px 0 0", paddingLeft: 0, listStyle: "none", color: "var(--ink-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> 2nd · ISACA × Yeshiva CTF</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Research grant · ZTEV</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> 30% MTTD reduction · Cerner</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> 75% faster forensics · Capgemini</li>
                </ul>
              </div>
              <div className="about-stat">
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>EDUCATION</div>
                <div style={{ marginTop: 8, color: "var(--ink-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  <div><span style={{ color: "var(--ink)" }}>MS Cybersecurity</span> — Yeshiva University · expected May 2026</div>
                  <div>Cybersecurity — IIIT Bangalore · 2023–2024</div>
                  <div>B.Tech CSE — Malla Reddy Institute of Technology · 2019–2023</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <div className="section-head">
          <div className="num">002 / Service Record</div>
          <h2>Where I've <span className="accent">deployed.</span></h2>
        </div>
        <div className="exp-list">
          {EXPERIENCE.map((e, i) => <ExpItem key={i} e={e} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <div className="shell">
        <div className="section-head">
          <div className="num">003 / Operations</div>
          <h2>Selected <span className="accent">case files.</span></h2>
        </div>
        <div className="proj-list">
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CAPABILITIES — MITRE matrix + network graph
// ─────────────────────────────────────────────
function CapabilitySection() {
  return (
    <section className="section" id="capabilities">
      <div className="shell">
        <div className="section-head">
          <div className="num">004 / Capabilities</div>
          <h2>The <span className="accent">attack & defense</span> matrix.</h2>
        </div>

        <Reveal>
          <Panel title="matrix://attack_defense_grid" corners>
            <MitreMatrix />
          </Panel>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 24 }} className="cap-grid">
            <Panel title="graph://tooling_topology" corners>
              <NetworkGraph />
            </Panel>
            <Panel title="logs://recent_activity">
              <ul className="op-log">
                <li><span className="mono" style={{ color: "var(--signal)", marginRight: 12 }}>[OK]</span><span>Tuned 14 Splunk correlation searches across EHR sources.</span></li>
                <li><span className="mono" style={{ color: "var(--signal)", marginRight: 12 }}>[OK]</span><span>Closed Tenable critical backlog from 47 → 0 in Q3.</span></li>
                <li><span className="mono" style={{ color: "var(--amber)", marginRight: 12 }}>[REV]</span><span>Reviewed CrowdStrike isolations across 500+ endpoints.</span></li>
                <li><span className="mono" style={{ color: "var(--signal)", marginRight: 12 }}>[OK]</span><span>Authored Sigma ruleset for Proofpoint phish chain.</span></li>
                <li><span className="mono" style={{ color: "var(--accent)", marginRight: 12 }}>[INC]</span><span>Led IR for credential-stuffing event — contained &lt; 30 min.</span></li>
                <li><span className="mono" style={{ color: "var(--signal)", marginRight: 12 }}>[OK]</span><span>Mapped clinical APT chain to MITRE T1078 / T1190.</span></li>
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CERTS + TESTIMONIALS
// ─────────────────────────────────────────────
function CertsAndTestimonials() {
  return (
    <section className="section" id="record">
      <div className="shell">
        <div className="section-head">
          <div className="num">004.b / Verifications</div>
          <h2>Credentials & <span className="accent">field commendations.</span></h2>
        </div>

        <div className="record-grid">
          <Reveal>
            <Panel title="certs://timeline" corners>
              <CertTimeline certs={CERTS} />
            </Panel>
          </Reveal>

          <div className="testimonial-stack">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="testimonial">
                  <div className="quote-mark">“</div>
                  <p className="quote-body">{t.quote}</p>
                  <div className="quote-by">
                    <div className="mono" style={{ fontSize: 12, color: "var(--ink)" }}>— {t.by}</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.16em", marginTop: 4 }}>{t.org}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// NEWS / WRITING
// ─────────────────────────────────────────────
function NewsSection() {
  return (
    <section className="section" id="news">
      <div className="shell">
        <div className="section-head">
          <div className="num">004.c / Field Notes</div>
          <h2>Writing & <span className="accent">talks.</span></h2>
        </div>
        <div className="news-grid">
          {NEWS.map((n, i) => (
            <Reveal key={i} delay={i * 60}>
              <a className="news-card interactive" href="#">
                <div className="news-tag">
                  <span className="chip chip-accent">{n.tag}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.16em" }}>{n.read}</span>
                </div>
                <div className="news-title">{n.title}</div>
                <div className="news-cta mono">READ → </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="shell">
        <div className="section-head">
          <div className="num">005 / Establish Contact</div>
          <h2>Open a <span className="accent">secure channel.</span></h2>
        </div>
        <div className="contact-grid">
          <Reveal>
            <Panel title="contact://encrypted_line" corners>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-mute)", marginBottom: 18 }}>
                // TRANSMISSION READY
              </div>
              <h3 style={{ fontSize: "clamp(28px, 3.8vw, 48px)", lineHeight: 1.05, color: "var(--ink)" }}>
                Have a problem worth solving?<br />
                <span style={{ color: "var(--accent)" }}>Let's talk.</span>
              </h3>
              <div style={{ marginTop: 24, display: "grid", gap: 14, fontSize: 16 }}>
                <a href="mailto:donthula.rohith22@gmail.com" className="contact-row">
                  <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.16em", width: 90 }}>EMAIL</span>
                  <span style={{ color: "var(--ink)" }}>donthula.rohith22@gmail.com</span>
                  <span className="mono" style={{ color: "var(--accent)", marginLeft: "auto" }}>→</span>
                </a>
                <a href="tel:5513259945" className="contact-row">
                  <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.16em", width: 90 }}>PHONE</span>
                  <span style={{ color: "var(--ink)" }}>(551) 325-9945</span>
                  <span className="mono" style={{ color: "var(--accent)", marginLeft: "auto" }}>→</span>
                </a>
                <a href="https://www.linkedin.com/in/rohith-donthula" target="_blank" rel="noreferrer" className="contact-row">
                  <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.16em", width: 90 }}>LINKEDIN</span>
                  <span style={{ color: "var(--ink)" }}>/in/rohith-donthula</span>
                  <span className="mono" style={{ color: "var(--accent)", marginLeft: "auto" }}>→</span>
                </a>
                <a href="https://github.com/Donthularohith" target="_blank" rel="noreferrer" className="contact-row">
                  <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.16em", width: 90 }}>GITHUB</span>
                  <span style={{ color: "var(--ink)" }}>/Donthularohith</span>
                  <span className="mono" style={{ color: "var(--accent)", marginLeft: "auto" }}>→</span>
                </a>
                <a href="public/resume.pdf" target="_blank" rel="noreferrer" download className="contact-row">
                  <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.16em", width: 90 }}>CV</span>
                  <span style={{ color: "var(--ink)" }}>Download resume.pdf</span>
                  <span className="mono" style={{ color: "var(--accent)", marginLeft: "auto" }}>↓</span>
                </a>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <div className="availability">
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-mute)" }}>STATUS</div>
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="dot" />
                  <span className="mono" style={{ fontSize: 14, color: "var(--ink)" }}>OPEN TO ROLES</span>
                </div>
              </div>
              <div className="hr" />
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-mute)" }}>SEEKING</div>
                <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", fontSize: 13, lineHeight: 1.8, color: "var(--ink-dim)" }}>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Cyber Security Analyst</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> SOC / Threat Hunter</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Cloud Security Engineer</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Detection & Response</li>
                </ul>
              </div>
              <div className="hr" />
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-mute)" }}>RESPONSE TIME</div>
                <div className="mono" style={{ marginTop: 8, fontSize: 13, color: "var(--ink)" }}>&lt; 24 hours</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FooterStrip() {
  return (
    <footer className="footer-strip">
      <div className="shell" style={{ padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-mute)" }}>
          © 2026 ROHITH DONTHULA · ALL RIGHTS RESERVED
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-mute)" }}>
          BUILT WITH RIGOR · MAINTAINED IN <span style={{ color: "var(--accent)" }}>JERSEY CITY</span>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-mute)" }}>
          END OF TRANSMISSION
        </div>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
