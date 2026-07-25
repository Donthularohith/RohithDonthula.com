/* eslint-disable no-undef */
// Shared primitives — exposed on window for cross-script access

const { useState, useEffect, useRef, useMemo } = React;

// ────────────────────────────────────────────────────────────
// Panel — windowed card with title bar + dots + corners
// ────────────────────────────────────────────────────────────
function Panel({ title, children, accent, corners = false, className = "", style }) {
  return (
    <div className={`panel ${corners ? "cornered" : ""} ${className}`} style={style}>
      {corners && <><span className="c-tr" /><span className="c-bl" /></>}
      {title && (
        <div className="panel-h">
          <span className="dots"><span/><span/><span/></span>
          <span style={{ flex: 1 }}>{title}</span>
          {accent && <span style={{ color: "var(--accent)" }}>{accent}</span>}
        </div>
      )}
      <div className="panel-b">{children}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Reveal — IntersectionObserver wrapper
// ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${rest.className || ""}`} {...rest}>{children}</Tag>;
}

// ────────────────────────────────────────────────────────────
// Typewriter — animates text character-by-character once visible
// ────────────────────────────────────────────────────────────
function Typewriter({ text, speed = 28, start = true, className = "", showCaret = true }) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    setOut("");
    setDone(false);
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return (
    <span className={className}>
      {out}
      {showCaret && !done && <span className="caret" />}
    </span>
  );
}

// ────────────────────────────────────────────────────────────
// Marquee — infinite ticker that reacts to scroll velocity:
// scrolling fast makes it rush and skew; scrolling up reverses
// its direction. Falls back to a static strip on reduced motion.
// ────────────────────────────────────────────────────────────
function Marquee({ items }) {
  const seq = [...items, ...items, ...items, ...items];
  const trackRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = trackRef.current;
    if (!el) return;

    let raf, half = 0;
    let x = 0, dir = 1, vel = 0, skew = 0;
    let lastY = window.scrollY;
    let last = performance.now();

    const measure = () => { half = el.scrollWidth / 2; };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const tick = (now) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;

      // smoothed scroll velocity (px/frame-ish)
      const y = window.scrollY;
      vel += ((y - lastY) - vel) * 0.12;
      lastY = y;

      // direction eases toward scroll direction
      const wantDir = vel < -0.6 ? -1 : 1;
      dir += (wantDir - dir) * 0.06;

      const speed = 55 + Math.min(420, Math.abs(vel) * 16);
      x += speed * dt * dir;
      if (half > 0) x = ((x % half) + half) % half;

      const wantSkew = Math.max(-14, Math.min(14, vel * 0.45));
      skew += (wantSkew - skew) * 0.1;

      el.style.transform = `translate3d(${-x}px, 0, 0) skewX(${-skew}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        {seq.map((s, i) => (
          <React.Fragment key={i}>
            <span>{s}</span>
            <span className="sep">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Custom Cursor — ring + dot
// ────────────────────────────────────────────────────────────
function CustomCursor({ enabled = true }) {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const blueRingRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let raf;
    let target = { x: -100, y: -100 };
    let pos = { x: -100, y: -100 };
    let posBlue = { x: -100, y: -100 };

    const onMove = (e) => { target = { x: e.clientX, y: e.clientY }; };
    const onOver = (e) => {
      const t = e.target;
      if (t.closest && t.closest("a, button, [role=button], .interactive, .matrix-cell, .proj-card")) {
        setHover(true);
      } else {
        setHover(false);
      }
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      posBlue.x += (target.x - posBlue.x) * 0.09;
      posBlue.y += (target.y - posBlue.y) * 0.09;
      if (ringRef.current) ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      if (blueRingRef.current) blueRingRef.current.style.transform = `translate(${posBlue.x}px, ${posBlue.y}px) translate(-50%, -50%)`;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        id="cursor-ring-blue"
        ref={blueRingRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
          width: hover ? 54 : 34, height: hover ? 54 : 34,
          border: "1px solid var(--blue)",
          borderRadius: "50%",
          mixBlendMode: "difference",
          opacity: 0.75,
          transition: "width 260ms ease, height 260ms ease",
        }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 10000, pointerEvents: "none",
          width: hover ? 44 : 28, height: hover ? 44 : 28,
          border: "1px solid var(--accent)",
          borderRadius: "50%",
          mixBlendMode: "difference",
          transition: "width 220ms ease, height 220ms ease, border-color 220ms",
        }}
      />
      <div
        id="cursor-dot"
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 10001, pointerEvents: "none",
          width: 4, height: 4, background: "var(--accent)",
          borderRadius: "50%",
        }}
      />
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Live clock (UTC) — for the dossier strip
// ────────────────────────────────────────────────────────────
function UtcClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span className="mono">
      {t.getUTCFullYear()}-{pad(t.getUTCMonth()+1)}-{pad(t.getUTCDate())} {pad(t.getUTCHours())}:{pad(t.getUTCMinutes())}:{pad(t.getUTCSeconds())} UTC
    </span>
  );
}

// ────────────────────────────────────────────────────────────
// Stamp — angled rubber-stamp text
// ────────────────────────────────────────────────────────────
function Stamp({ children, color = "accent", angle = -6, style }) {
  const cls = color === "amber" ? "stamp stamp-amber" : color === "signal" ? "stamp stamp-signal" : "stamp";
  return <span className={cls} style={{ "--stamp-angle": `${angle}deg`, ...style }}>{children}</span>;
}

// ────────────────────────────────────────────────────────────
// prefersReducedMotion — shared guard for ambient/decorative motion
// ────────────────────────────────────────────────────────────
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ────────────────────────────────────────────────────────────
// GlitchHeading — red/blue channel-split glitch, settles on first view
// ────────────────────────────────────────────────────────────
function GlitchHeading({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add("play");
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <h2 ref={ref} className={`glitch-heading ${className}`}>{children}</h2>;
}

// ────────────────────────────────────────────────────────────
// Redacted — paragraph hidden behind a black bar that declassifies on scroll
// ────────────────────────────────────────────────────────────
function Redacted({ children, delay = 0, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.classList.add("declassified"); return; }
    // Fire early (any sliver visible) so the bars have wiped by the time
    // the paragraph is actually being read — matters with inertia scrolling.
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("declassified"), delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <p ref={ref} className="redacted" style={style}>{children}</p>;
}

// ────────────────────────────────────────────────────────────
// Magnetic — wraps a single element (button/link) and pulls it toward the cursor
// ────────────────────────────────────────────────────────────
function Magnetic({ children, strength = 16 }) {
  const ref = useRef(null);
  if (prefersReducedMotion()) return children;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return React.cloneElement(children, {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: {
      ...(children.props.style || {}),
      transition: "transform 220ms cubic-bezier(.2,.8,.2,1)",
      willChange: "transform",
    },
  });
}

// ────────────────────────────────────────────────────────────
// TiltCard — wraps content in a card that tilts in 3D toward the cursor
// ────────────────────────────────────────────────────────────
function TiltCard({ children, max = 8, style, className = "" }) {
  const ref = useRef(null);

  if (prefersReducedMotion()) {
    return <div className={className} style={style}>{children}</div>;
  }

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${(px * max * 2).toFixed(2)}deg) rotateX(${(-py * max * 2).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 260ms ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// ParticleField — ambient canvas network that drifts and responds to the cursor
// ────────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h, particles;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    const COUNT = Math.min(70, Math.max(24, Math.floor((window.innerWidth * window.innerHeight) / 24000)));
    particles = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      tone: i % 9 === 0 ? "red" : i % 13 === 0 ? "blue" : "mute",
    }));

    const TONE = {
      red: "rgba(226,90,90,0.65)",
      blue: "rgba(96,150,235,0.65)",
      mute: "rgba(190,190,200,0.4)",
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => resize();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    const RADIUS2 = 130 * 130;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < RADIUS2) {
          const f = (1 - d2 / RADIUS2) * 0.04;
          const d = Math.sqrt(d2) + 0.01;
          p.vx -= (dx / d) * f;
          p.vy -= (dy / d) * f;
        }
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < RADIUS2) {
            ctx.strokeStyle = `rgba(150,150,165,${0.09 * (1 - d2 / RADIUS2)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        ctx.fillStyle = TONE[p.tone];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tone === "mute" ? 1.4 : 1.9, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (prefersReducedMotion()) return null;
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

// ────────────────────────────────────────────────────────────
// BootSequence — one-time terminal boot overlay (red+blue → purple team)
// ────────────────────────────────────────────────────────────
const BOOT_MESSAGES = [
  { text: "INITIALIZING DOSSIER OS v2 ...", tone: "mute" },
  { text: "LOADING RED TEAM MODULE ... adversary emulation online", tone: "red" },
  { text: "LOADING BLUE TEAM MODULE ... detection engineering online", tone: "blue" },
  { text: "MERGING RED + BLUE -> PURPLE TEAM", tone: "purple" },
  { text: "AUTHENTICATING SUBJECT RD-0001 ...", tone: "mute" },
  { text: "ACCESS GRANTED", tone: "signal" },
];

function BootSequence() {
  // Read sessionStorage exactly once at mount — re-checking it on every render
  // would flip this to true the instant finish() writes the flag, unmounting
  // the overlay mid-fade instead of letting the is-hidden transition play.
  const [alreadySeen] = useState(() => typeof window !== "undefined" && !!window.sessionStorage
    && sessionStorage.getItem("rd_boot_seen") === "1");
  const [lines, setLines] = useState([]);
  const [visible, setVisible] = useState(!alreadySeen);

  const finish = () => {
    if (window.sessionStorage) sessionStorage.setItem("rd_boot_seen", "1");
    document.body.style.overflow = "";
    setVisible(false);
    window.__rdBootDone = true;
    window.dispatchEvent(new CustomEvent("rd:boot-done"));
  };

  useEffect(() => {
    if (alreadySeen) return;
    document.body.style.overflow = "hidden";
    if (prefersReducedMotion()) { finish(); return; }

    const timeouts = [];
    BOOT_MESSAGES.forEach((m, i) => {
      timeouts.push(setTimeout(() => {
        setLines(prev => [...prev, m]);
        if (i === BOOT_MESSAGES.length - 1) {
          timeouts.push(setTimeout(finish, 650));
        }
      }, 260 * i + 200));
    });
    timeouts.push(setTimeout(finish, 4200)); // safety net
    return () => timeouts.forEach(clearTimeout);
  }, [alreadySeen]);

  if (alreadySeen) return null;
  return (
    <div className={`boot-overlay ${visible ? "" : "is-hidden"}`} aria-hidden={!visible}>
      <div className="boot-body mono">
        {lines.map((l, i) => (
          <div key={i} className={`boot-line tone-${l.tone}`}>&gt; {l.text}</div>
        ))}
        {visible && <span className="boot-cursor" />}
      </div>
      <button type="button" className="boot-skip mono" onClick={finish}>SKIP ↵</button>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// SectionDots — right-edge scroll-progress nav; highlights the
// section currently centered in view, click to jump to it
// ────────────────────────────────────────────────────────────
const SECTION_DOTS_IDS = ["about", "experience", "projects", "capabilities", "record", "terminal-access", "contact"];

function SectionDots() {
  const [active, setActive] = useState(SECTION_DOTS_IDS[0]);

  useEffect(() => {
    const sections = SECTION_DOTS_IDS.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="section-dots" aria-label="Section progress">
      {SECTION_DOTS_IDS.map(id => (
        <a
          key={id}
          href={`#${id}`}
          className={`section-dot ${active === id ? "is-active" : ""}`}
          aria-label={id}
          aria-current={active === id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}

// ────────────────────────────────────────────────────────────
// CommandPalette — Cmd/Ctrl+K quick-nav + actions, filterable,
// keyboard-navigable. Every action is a plain function so this
// stays decoupled from any one page's markup.
// ────────────────────────────────────────────────────────────
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const PALETTE_ACTIONS = [
  { id: "about", label: "Go to Subject Brief", hint: "001", run: () => scrollToId("about") },
  { id: "experience", label: "Go to Service Record", hint: "002", run: () => scrollToId("experience") },
  { id: "projects", label: "Go to Operations", hint: "003", run: () => scrollToId("projects") },
  { id: "capabilities", label: "Go to Capabilities", hint: "004", run: () => scrollToId("capabilities") },
  { id: "record", label: "Go to Verifications", hint: "004.b", run: () => scrollToId("record") },
  { id: "terminal-access", label: "Go to Direct Access terminal", hint: "004.c", run: () => scrollToId("terminal-access") },
  { id: "contact", label: "Go to Contact", hint: "005", run: () => scrollToId("contact") },
  { id: "email", label: "Copy email address", hint: "donthula.rohith22@gmail.com", run: (setNote) => {
      navigator.clipboard?.writeText("donthula.rohith22@gmail.com");
      setNote("COPIED donthula.rohith22@gmail.com");
    } },
  { id: "resume", label: "Download resume.pdf", hint: "PDF", run: () => window.open("public/resume.pdf", "_blank") },
  { id: "github", label: "Open GitHub", hint: "/Donthularohith", run: () => window.open("https://github.com/Donthularohith", "_blank") },
  { id: "credly", label: "Verify certifications on Credly", hint: "badges", run: () => window.open(window.CREDLY_URL || "https://www.credly.com", "_blank") },
  { id: "linkedin", label: "Open LinkedIn", hint: "/in/rohith-donthula", run: () => window.open("https://www.linkedin.com/in/rohith-donthula", "_blank") },
  { id: "replay-boot", label: "Replay boot sequence", hint: "reload", run: () => {
      try { sessionStorage.removeItem("rd_boot_seen"); } catch (e) {}
      location.reload();
    } },
];

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [note, setNote] = useState("");
  const inputRef = useRef(null);

  const matches = PALETTE_ACTIONS.filter(a =>
    (a.label + " " + a.hint).toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("rd:open-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("rd:open-palette", onOpenEvent);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery(""); setIndex(0); setNote("");
      setTimeout(() => inputRef.current?.focus(), 20);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => { setIndex(0); }, [query]);

  const runAt = (i) => {
    const action = matches[i];
    if (!action) return;
    action.run(setNote);
    if (action.id !== "email") setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex(i => Math.min(i + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); runAt(index); }
  };

  if (!open) return null;
  return (
    <div className="palette-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="palette-panel cornered">
        <div className="palette-input-row">
          <span className="mono" style={{ color: "var(--purple)" }}>{"›"}</span>
          <input
            ref={inputRef}
            className="palette-input mono"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            aria-label="Command palette"
          />
          <span className="mono palette-esc">ESC</span>
        </div>
        <div className="palette-list">
          {matches.length === 0 && (
            <div className="palette-empty mono">No matches — try "contact", "resume", "capabilities"…</div>
          )}
          {matches.map((a, i) => (
            <div
              key={a.id}
              className={`palette-item ${i === index ? "is-active" : ""}`}
              onMouseEnter={() => setIndex(i)}
              onClick={() => runAt(i)}
            >
              <span>{a.label}</span>
              <span className="mono palette-hint">{a.hint}</span>
            </div>
          ))}
        </div>
        <div className="palette-footer mono">
          {note ? <span style={{ color: "var(--signal)" }}>{note}</span> : <span>↑↓ NAVIGATE · ↵ SELECT · ESC CLOSE</span>}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// SmoothScroll — Lenis-style inertia scrolling. Intercepts wheel
// input (fine pointers only) and lerps the real scroll position
// toward the target, so the whole page glides instead of stepping.
// Native scrolling is untouched for touch devices, keyboard,
// scrollbar drags, anchors, and reduced-motion users.
// ────────────────────────────────────────────────────────────
function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = null;
    let animating = false;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const tick = () => {
      current += (target - current) * 0.105;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        window.scrollTo({ top: current, behavior: "instant" });
        animating = false;
        return;
      }
      window.scrollTo({ top: current, behavior: "instant" });
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return; // pinch-zoom
      if (e.defaultPrevented) return;
      // let nested scrollables (terminal, palette) scroll natively
      if (e.target.closest && e.target.closest(".term-scroll, .palette-list, .palette-overlay")) return;
      if (document.body.style.overflow === "hidden") return;

      e.preventDefault();
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;
      else if (e.deltaMode === 2) d *= window.innerHeight;
      target = Math.max(0, Math.min(maxScroll(), target + d));
      if (!animating) {
        animating = true;
        current = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    // anchors / keyboard / scrollbar move the page without us — resync
    const onScroll = () => { if (!animating) { target = window.scrollY; current = window.scrollY; } };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}

// ────────────────────────────────────────────────────────────
// ThreatProgress — the header's tri-color threat bar doubles as
// a scroll progress indicator: dim base, bright fill.
// ────────────────────────────────────────────────────────────
function ThreatProgress() {
  const fillRef = useRef(null);
  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="threat-bar" aria-hidden="true">
      <div className="threat-fill" ref={fillRef} />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// CountUp — stat values count up from 0 when scrolled into view.
// Accepts strings like "4+", "500+", "30%", "75%", "<24" and
// animates just the numeric part, keeping prefix/suffix intact.
// ────────────────────────────────────────────────────────────
function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const m = String(value).match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (prefersReducedMotion()) { el.textContent = value; return; }
    const prefix = m[1], num = parseFloat(m[2]), suffix = m[3];
    const decimals = (m[2].split(".")[1] || "").length;

    let raf, started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || started) return;
        started = true;
        obs.unobserve(el);
        const t0 = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
          el.textContent = prefix + (num * eased).toFixed(decimals) + suffix;
          if (t < 1) raf = requestAnimationFrame(step);
          else el.textContent = value;
        };
        raf = requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value, duration]);

  if (!m) return <span>{value}</span>;
  return <span ref={ref}>{prefersReducedMotion() ? value : m[1] + "0" + m[3]}</span>;
}

// ────────────────────────────────────────────────────────────
// DecryptText — per-character scramble that settles left to
// right, like cracking a cipher. Re-scrambles on hover.
// ────────────────────────────────────────────────────────────
function DecryptText({ text, delay = 0, interval = 34, className = "", as: Tag = "span" }) {
  const ref = useRef(null);
  const running = useRef(false);
  const GLYPHS = "!<>-_\\/[]{}—=+*^?#@$%&0123456789ABCDEF";

  const play = React.useCallback(() => {
    const el = ref.current;
    if (!el || running.current) return;
    if (prefersReducedMotion()) { el.textContent = text; return; }
    running.current = true;
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame++;
      const settled = Math.floor(frame / 2.4);
      let out = "";
      for (let i = 0; i < total; i++) {
        const ch = text[i];
        if (ch === " ") { out += " "; continue; }
        out += i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (settled >= total) {
        clearInterval(id);
        el.textContent = text;
        running.current = false;
      }
    }, interval);
  }, [text, interval]);

  useEffect(() => {
    // If the boot overlay is still running, hold the reveal until it clears
    // so the decrypt is actually seen.
    let t;
    const arm = () => { t = setTimeout(play, delay); };
    const bootActive = document.querySelector(".boot-overlay:not(.is-hidden)") && !window.__rdBootDone;
    if (bootActive) {
      const onDone = () => { arm(); };
      window.addEventListener("rd:boot-done", onDone, { once: true });
      return () => { window.removeEventListener("rd:boot-done", onDone); clearTimeout(t); };
    }
    arm();
    return () => clearTimeout(t);
  }, [play, delay]);

  return (
    <Tag ref={ref} className={className} onMouseEnter={play} aria-label={text}>
      {text}
    </Tag>
  );
}

// ────────────────────────────────────────────────────────────
// CardSpotlight — one delegated listener paints a cursor-tracking
// radial glow onto whichever card the pointer is over (via CSS
// custom properties consumed by the stylesheet).
// ────────────────────────────────────────────────────────────
const SPOTLIGHT_SELECTOR = ".panel, .exp-card, .about-stat, .proj-card, .cred, .availability, .dossier-strip > div";

function CardSpotlight() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let prev = null;
    const onMove = (e) => {
      const card = e.target.closest ? e.target.closest(SPOTLIGHT_SELECTOR) : null;
      if (prev && prev !== card) prev.classList.remove("is-spotlit");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
        card.classList.add("is-spotlit");
      }
      prev = card;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}

// ────────────────────────────────────────────────────────────
// Parallax — drifts its child a few px against the cursor for
// depth. strength is the max offset in px.
// ────────────────────────────────────────────────────────────
function Parallax({ children, strength = 10, className = "", style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -2 * strength;
      ty = (e.clientY / window.innerHeight - 0.5) * -2 * strength;
    };
    const tick = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (ref.current) ref.current.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>{children}</div>;
}

Object.assign(window, {
  Panel, Reveal, Typewriter, Marquee, CustomCursor, UtcClock, Stamp,
  GlitchHeading, Redacted, Magnetic, ParticleField, BootSequence, TiltCard, SectionDots, CommandPalette,
  SmoothScroll, ThreatProgress, CountUp, DecryptText, CardSpotlight, Parallax,
});
