/* eslint-disable no-undef */

function App() {
  return (
    <>
      <SmoothScroll />
      <CardSpotlight />
      <ParticleField />
      <BootSequence />
      <CustomCursor enabled={true} />
      <SectionDots />
      <CommandPalette />
      <ClassifiedHeader />
      <Hero />
      <BriefMarquee />
      <About />
      <ExperienceSection />
      <BriefMarquee variant="b" />
      <ProjectsSection />
      <CapabilitySection />
      <CertsSection />
      <TerminalAccessSection />
      <Contact />
      <FooterStrip />
    </>
  );
}

// ─────────────────────────────────────────────
// Top classification strip
// ─────────────────────────────────────────────
function ClassifiedHeader() {
  return (
    <div className="classified-bar">
      <ThreatProgress />
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-dim)" }}>
            <UtcClock />
          </div>
          <button
            type="button"
            className="cmdk-trigger mono"
            onClick={() => window.dispatchEvent(new CustomEvent("rd:open-palette"))}
            aria-label="Open command palette"
          >
            ⌘K
          </button>
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
              SUBJECT ACTIVE · CO-FOUNDER <span style={{ color: "var(--accent)" }}>ZHASK</span> · BUILDING KAVEO
            </span>
          </div>

          <h1 className="hero-name display">
            <span className="hero-line"><DecryptText text="ROHITH" delay={250} interval={30} /></span>
            <span className="hero-line dim"><DecryptText text="DONTHULA" delay={520} interval={30} /></span>
          </h1>

          <div className="hero-roles mono">
            <Typewriter text="// PENETRATION TESTING · PURPLE TEAM · DETECTION ENGINEERING · CLOUD SECURITY · AI SECURITY · INCIDENT RESPONSE" speed={18} />
          </div>

          <p className="hero-lede">
            I <span className="under">attack systems</span>, <span className="under">build the detections</span> that catch the attack, and now <span className="under">ship the product</span> that does both. Co-founder of <span style={{color:"var(--accent)"}}>Zhask</span>, where I architected <span style={{color:"var(--accent)"}}>kaveo</span> — an AI-native cloud security platform with 96 deterministic detectors and zero AI agents on the detection path. 3+ years across banking pentest, healthcare purple team, and MSSP SOC. MS Cybersecurity, Yeshiva University.
          </p>

          <div className="hero-cta">
            <Magnetic><a className="btn btn-primary" href="#projects">› View Operations</a></Magnetic>
            <Magnetic><a className="btn" href="public/resume.pdf" target="_blank" rel="noreferrer">Download CV ↓</a></Magnetic>
          </div>

          <Reveal delay={200}>
            <div className="hero-creds">
              <div className="cred tilt-in" style={{ animationDelay: "0ms" }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>VERIFIED</div>
                <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>Security+ · CySA+ · PenTest+</div>
              </div>
              <div className="cred tilt-in" style={{ animationDelay: "70ms" }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>FIELD</div>
                <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>Offense · Defense · Cloud</div>
              </div>
              <div className="cred tilt-in" style={{ animationDelay: "140ms" }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>STATION</div>
                <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>New York City, NY</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: dossier card */}
        <div className="hero-dossier">
          <Parallax strength={12}>
          <TiltCard max={7}>
            <Panel title={<TypeURL text="dossier://subject/RD-0001" />} corners>
              <div className="dossier-photo">
                <img src="public/profile.jpg" alt="Portrait of Rohith Donthula" />
                <div className="dossier-overlay">
                  <div className="crosshair-h" />
                  <div className="crosshair-v" />
                  <div className="dossier-tag">RD-0001</div>
                  <Stamp angle={-8} style={{ position: "absolute", bottom: 14, right: 14 }}>CLEARED · L5</Stamp>
                </div>
              </div>
              <dl className="kv" style={{ marginTop: 18 }}>
                <dt>Subject</dt><dd>Rohith Donthula</dd>
                <dt>Discipline</dt><dd>Offensive Security · Detection Engineering</dd>
                <dt>Specialization</dt><dd>Pentest · Purple Team · Cloud &amp; AI Security</dd>
                <dt>Venture</dt><dd>Co-Founder, Zhask — kaveo</dd>
                <dt>Sector</dt><dd>Healthcare · Financial Services · Cloud</dd>
                <dt>Education</dt><dd>MS Cybersecurity · Yeshiva (2026)</dd>
                <dt>Status</dt><dd><span className="dot" style={{ marginRight: 8, verticalAlign: "middle" }} />Operational · On Active Engagement</dd>
              </dl>
              <div className="dossier-motto">"Attack what you build. Build what survives the attack."</div>
            </Panel>
          </TiltCard>
          </Parallax>

          <Reveal delay={260}>
            <div className="dossier-strip">
              <div className="tilt-in" style={{ animationDelay: "0ms" }}>
                <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)" }}><CountUp value="3+" /></div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>YRS FIELD</div>
              </div>
              <div className="tilt-in" style={{ animationDelay: "60ms" }}>
                <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)" }}><CountUp value="500+" /></div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>ENDPOINTS</div>
              </div>
              <div className="tilt-in" style={{ animationDelay: "120ms" }}>
                <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)" }}><CountUp value="50+" /></div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>IR EVENTS</div>
              </div>
              <div className="tilt-in" style={{ animationDelay: "180ms" }}>
                <div className="mono" style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--accent)" }}><CountUp value="30%" /></div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-mute)", marginTop: 4 }}>↓ MTTD</div>
              </div>
            </div>
          </Reveal>
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
          <GlitchHeading>I break it, I detect it, <span className="accent">I ship the thing that does both.</span></GlitchHeading>
        </div>

        <div className="about-grid">
          <Reveal>
            <Panel title="brief.md" corners>
              <Redacted style={{ fontSize: 18, lineHeight: 1.55, color: "var(--ink)" }}>
                Most security people pick a side. I've worked all three: I <span style={{ color: "var(--accent)" }}>break systems</span>, I <span style={{ color: "var(--accent)" }}>build the detections</span> that catch the break, and as <span style={{ color: "var(--accent)" }}>co-founder of Zhask</span> I now ship the product that does both. <span style={{ color: "var(--accent)" }}>MS Cybersecurity, Yeshiva University</span>; CompTIA <span style={{ color: "var(--accent)" }}>Security+</span>, <span style={{ color: "var(--accent)" }}>CySA+</span>, and <span style={{ color: "var(--accent)" }}>PenTest+</span>. One principle: <em>attack what you build, build what survives the attack.</em>
              </Redacted>
              <Redacted delay={120} style={{ marginTop: 16, color: "var(--ink-dim)", lineHeight: 1.65 }}>
                <span style={{ color: "var(--ink)" }}>The offensive foundation.</span> Three years at <span style={{ color: "var(--ink)" }}>Capgemini</span> testing enterprise banking infrastructure — network and web/API penetration testing with Burp Suite and Metasploit, manually validating exploitability before anything was rated or remediated instead of shipping a scanner dump. I proved an AWS IAM privilege-escalation path in a controlled attack rather than just flagging the permission, and hardened Palo Alto policy by attacking it until I found where it actually leaked. A pentest is not a list of vulnerabilities; it is a demonstrated path to impact.
              </Redacted>
              <Redacted delay={240} style={{ marginTop: 16, color: "var(--ink-dim)", lineHeight: 1.65 }}>
                <span style={{ color: "var(--ink)" }}>The defender's view.</span> Purple team at <span style={{ color: "var(--ink)" }}>Cerner Healthcare</span> under HIPAA — emulating adversary TTPs and hardening detections in the same sprint, pulling MTTD down ~30%. Now SOC at <span style={{ color: "var(--ink)" }}>SecVal MSSP</span> on Stellar Cyber Open XDR and CrowdStrike Falcon under PCI DSS: correlating IOCs and TTPs to MITRE ATT&CK, running controlled credential-dumping and lateral-movement chains, and tuning the rules until the signal survives contact with reality. Knowing exactly what defenders see is what makes my offensive work sharper.
              </Redacted>
              <Redacted delay={360} style={{ marginTop: 16, color: "var(--ink-dim)", lineHeight: 1.65 }}>
                <span style={{ color: "var(--ink)" }}>The builder.</span> At <span style={{ color: "var(--accent)" }}>Zhask</span> I architected <span style={{ color: "var(--accent)" }}>kaveo</span> — an AI-native cloud security platform built on an unfashionable thesis: <em>determinism finds the truth, AI has to show its work.</em> 96 deterministic detectors and 43 read-only AWS collectors do the finding, with <span style={{ color: "var(--ink)" }}>zero AI agents on the detection path</span>. The AI layer only prioritizes, explains, and remediates — and every claim is a (text, citation) pair checked against an immutable evidence ledger, dropped before storage if it can't cite its proof. Self-hosted, zero-egress, with a native MCP server so a customer's own agents get read-only, cited access.
              </Redacted>
              <Redacted delay={480} style={{ marginTop: 16, color: "var(--ink-dim)", lineHeight: 1.65 }}>
                <span style={{ color: "var(--ink)" }}>Where this is going.</span> <span style={{ color: "var(--accent)" }}>AI security</span>, both directions: defending <em>with</em> AI (LLM-assisted triage and enrichment that cites its sources) and defending <em>AI itself</em> — threat-modeling LLM and agent integrations against the <span style={{ color: "var(--ink)" }}>OWASP LLM Top 10</span> (prompt injection, exfiltration through model outputs, insecure agent tool-use) and mapping adversarial-ML behavior to <span style={{ color: "var(--ink)" }}>MITRE ATLAS</span> the way I map intrusions to ATT&CK. Companies are wiring AI into everything. Someone has to red-team it and write the detections — I've already started.
              </Redacted>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <div className="about-side">
              <div className="about-stat tilt-in" style={{ animationDelay: "0ms" }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>FRAMEWORKS & ENGAGEMENTS</div>
                <div className="mono" style={{ marginTop: 8, fontSize: 13, color: "var(--ink)", lineHeight: 1.7 }}>
                  <span style={{ color: "var(--accent)" }}>OFFENSE</span> — Burp Suite · Metasploit · Nmap · BloodHound · Impacket · Responder · Cobalt Strike · Atomic Red Team · Caldera · OWASP Top 10 / API Top 10<br />
                  <span style={{ color: "var(--blue)" }}>DEFENSE</span> — Splunk SPL · Sigma · ELK · Stellar Cyber XDR · CrowdStrike Falcon · Snort/Suricata · Cortex XSOAR · NIST 800-61 · EnCase · FTK · Volatility<br />
                  <span style={{ color: "var(--purple)" }}>CLOUD &amp; AI</span> — AWS IAM graph · Pacu · ScoutSuite · Prowler · CSPM engineering · Okta · SailPoint · CyberArk · MITRE ATLAS · OWASP LLM Top 10 · MCP<br />
                  <span style={{ color: "var(--ink-mute)" }}>FRAMEWORKS</span> — MITRE ATT&CK · SOC 2 · PCI-DSS · GDPR · HIPAA · NIST · CIS
                </div>
              </div>
              <div className="about-stat tilt-in" style={{ animationDelay: "90ms" }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>FIELD ACHIEVEMENTS</div>
                <ul style={{ margin: "10px 0 0", paddingLeft: 0, listStyle: "none", color: "var(--ink-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Co-founded Zhask · shipped kaveo</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> 2nd · ISACA × Yeshiva CTF</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Research grant · ZTEV</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> 30% MTTD reduction · Cerner</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> 75% faster forensics · Capgemini</li>
                </ul>
              </div>
              <div className="about-stat tilt-in" style={{ animationDelay: "180ms" }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>EDUCATION</div>
                <div style={{ marginTop: 8, color: "var(--ink-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  <div><span style={{ color: "var(--ink)" }}>MS Cybersecurity</span> — Yeshiva University · May 2026</div>
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
          <GlitchHeading>Where I've <span className="accent">deployed.</span></GlitchHeading>
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
          <GlitchHeading>Selected <span className="accent">case files.</span></GlitchHeading>
        </div>
        <div className="proj-list">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <ProjectCard p={p} idx={i} />
            </Reveal>
          ))}
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
          <GlitchHeading>The <span className="accent">attack & defense</span> matrix.</GlitchHeading>
        </div>

        <Reveal>
          <Panel title="matrix://attack_defense_grid" corners>
            <MitreMatrix />
          </Panel>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 24 }} className="cap-grid">
            <Panel title="graph://purple_fusion_core" corners>
              <NetworkGraph />
            </Panel>
            <Panel title="radar://sector_sweep" accent={<LivePill />}>
              <ThreatRadar />
            </Panel>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div style={{ marginTop: 24 }}>
            <Panel title="feed://soc_watchfloor" accent={<LivePill />} corners>
              <LiveOpsFeed />
            </Panel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LivePill() {
  return (
    <span className="live-pill mono" aria-label="Live">
      <span className="dot" style={{ width: 6, height: 6 }} /> LIVE
    </span>
  );
}

// ─────────────────────────────────────────────
// CERTS
// ─────────────────────────────────────────────
function CertsSection() {
  return (
    <section className="section" id="record">
      <div className="shell">
        <div className="section-head">
          <div className="num">004.b / Verifications</div>
          <GlitchHeading>Credentials & <span className="accent">certifications.</span></GlitchHeading>
        </div>

        <Reveal>
          <Panel
            title="certs://timeline"
            corners
            accent={
              <a href={CREDLY_URL} target="_blank" rel="noreferrer" className="cert-verify" style={{ textTransform: "none" }}>
                verify://credly ↗
              </a>
            }
          >
            <CertTimeline certs={CERTS} />
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TERMINAL ACCESS — a real, typable terminal
// ─────────────────────────────────────────────
function TerminalAccessSection() {
  return (
    <section className="section" id="terminal-access">
      <div className="shell">
        <div className="section-head">
          <div className="num">004.c / Direct Access</div>
          <GlitchHeading>Query the <span className="accent">dossier directly.</span></GlitchHeading>
        </div>
        <Reveal>
          <Panel title="shell://guest_session" corners>
            <TerminalConsole />
          </Panel>
        </Reveal>
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
          <GlitchHeading>Open a <span className="accent">secure channel.</span></GlitchHeading>
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
                <a href={CREDLY_URL} target="_blank" rel="noreferrer" className="contact-row">
                  <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.16em", width: 90 }}>CREDLY</span>
                  <span style={{ color: "var(--ink)" }}>Verify certifications</span>
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
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Penetration Tester / Offensive Security</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Detection Engineer</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Cloud Security Engineer</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> AI Security / LLM Red Team</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> SOC Analyst / Threat Hunter</li>
                  <li><span className="mono" style={{ color: "var(--accent)" }}>›</span> Security Engineer (Product)</li>
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
          BUILT WITH RIGOR · MAINTAINED IN <span style={{ color: "var(--accent)" }}>NEW YORK CITY</span>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-mute)" }}>
          END OF TRANSMISSION
        </div>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
