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
// Marquee — infinite scrolling text
// ────────────────────────────────────────────────────────────
function Marquee({ items }) {
  const seq = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
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
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let raf;
    let target = { x: -100, y: -100 };
    let pos = { x: -100, y: -100 };

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
      if (ringRef.current) ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
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
  return <span className={cls} style={{ transform: `rotate(${angle}deg)`, ...style }}>{children}</span>;
}

Object.assign(window, {
  Panel, Reveal, Typewriter, Marquee, CustomCursor, UtcClock, Stamp,
});
