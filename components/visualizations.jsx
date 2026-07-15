/* eslint-disable no-undef */
const { useState, useEffect, useRef } = React;

// ────────────────────────────────────────────────────────────
// MITRE ATT&CK / D3FEND — Purple Team Skills Matrix
// Each cell shows red (offensive) + blue (defensive) capability
// ────────────────────────────────────────────────────────────
const MATRIX = [
  { tactic: "Reconnaissance", items: [
    { name: "Network Scanning", level: 5, tools: "Nmap, Masscan", lane: "red" },
    { name: "Vuln Discovery", level: 5, tools: "Nessus, OpenVAS, Tenable.io", lane: "red" },
    { name: "OSINT", level: 4, tools: "Maltego, theHarvester", lane: "red" },
  ]},
  { tactic: "Initial Access", items: [
    { name: "Phishing Sim", level: 4, tools: "GoPhish, Proofpoint TAP", lane: "purple" },
    { name: "Web App Pentest", level: 5, tools: "Burp Suite, ZAP", lane: "red" },
    { name: "Wireless", level: 3, tools: "Aircrack-ng", lane: "red" },
  ]},
  { tactic: "Adversary Emulation", items: [
    { name: "Atomic Red Team", level: 5, tools: "ART runner", lane: "purple" },
    { name: "Caldera", level: 4, tools: "MITRE Caldera", lane: "purple" },
    { name: "C2 Framework", level: 4, tools: "Cobalt Strike, Sliver", lane: "red" },
  ]},
  { tactic: "Defense Evasion", items: [
    { name: "EDR Tuning", level: 5, tools: "CrowdStrike Falcon", lane: "blue" },
    { name: "Log Hardening", level: 5, tools: "Sigma rules", lane: "blue" },
    { name: "AV Bypass Test", level: 3, tools: "Veil, Donut", lane: "red" },
  ]},
  { tactic: "Detection", items: [
    { name: "SIEM Engineering", level: 5, tools: "Splunk SPL, ELK", lane: "blue" },
    { name: "Threat Hunting", level: 5, tools: "MITRE ATT&CK queries", lane: "blue" },
    { name: "IDS/IPS", level: 4, tools: "Snort, Suricata", lane: "blue" },
  ]},
  { tactic: "Response", items: [
    { name: "IR Playbooks", level: 5, tools: "NIST 800-61", lane: "blue" },
    { name: "Forensics", level: 4, tools: "EnCase, FTK, Volatility", lane: "blue" },
    { name: "Containment", level: 5, tools: "EDR isolation", lane: "blue" },
  ]},
];

const LANE_COLOR = {
  red: "var(--accent)",
  blue: "var(--blue)",
  purple: "var(--purple)",
};

function MitreMatrix() {
  const [hover, setHover] = useState(null);
  return (
    <div className="mitre">
      <div className="mitre-legend">
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)" }}>LANES</span>
        <span className="lane-pill" style={{ color: LANE_COLOR.red, borderColor: LANE_COLOR.red }}>● RED · OFFENSE</span>
        <span className="lane-pill" style={{ color: LANE_COLOR.blue, borderColor: LANE_COLOR.blue }}>● BLUE · DEFENSE</span>
        <span className="lane-pill" style={{ color: LANE_COLOR.purple, borderColor: LANE_COLOR.purple }}>● PURPLE · BOTH</span>
      </div>
      <div className="mitre-grid">
        {MATRIX.map((col, colIdx) => (
          <div className="mitre-col" key={col.tactic}>
            <div className="mitre-col-h">
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>TACTIC</span>
              <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>{col.tactic}</div>
            </div>
            {col.items.map((it, j) => (
              <div
                key={j}
                className="matrix-cell tilt-in"
                onMouseEnter={() => setHover({ ...it, tactic: col.tactic })}
                onMouseLeave={() => setHover(null)}
                style={{ borderLeft: `2px solid ${LANE_COLOR[it.lane]}`, animationDelay: `${(colIdx * 3 + j) * 30}ms` }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span className="mono" style={{ fontSize: 12, color: "var(--ink)" }}>{it.name}</span>
                  <span className="mono" style={{ fontSize: 10, color: LANE_COLOR[it.lane], textTransform: "uppercase" }}>{it.lane}</span>
                </div>
                <div className="lvl">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={n <= it.level ? "lvl-on" : "lvl-off"} style={n <= it.level ? { background: LANE_COLOR[it.lane] } : {}} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mitre-readout">
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.14em" }}>
          {hover ? "ENGAGED:" : "HOVER A CELL TO INSPECT"}
        </span>
        {hover && (
          <span className="mono" style={{ fontSize: 12, color: LANE_COLOR[hover.lane] }}>
            [{hover.lane.toUpperCase()}] {hover.tactic} → {hover.name} <span style={{ color: "var(--ink-dim)" }}>· {hover.tools}</span>
          </span>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Purple-Team Topology — three lanes (Red / Purple / Blue)
// Each lane has stages with tools; hovering a tool reveals
// its role + linked counter-tools (cross-lane connections).
// ────────────────────────────────────────────────────────────

const LANES = [
  {
    id: "red",
    label: "RED · OFFENSE",
    stages: [
      { id: "recon", name: "RECON",
        tools: [
          { id: "nmap",   label: "Nmap",     blurb: "Network discovery + port scan" },
          { id: "shodan", label: "Shodan",   blurb: "External attack-surface OSINT" },
          { id: "tenable",label: "Tenable.io",blurb: "Vuln assessment, CVSS-prioritized" },
        ]
      },
      { id: "weapon", name: "WEAPONIZE",
        tools: [
          { id: "msf",   label: "Metasploit", blurb: "Exploit framework" },
          { id: "burp",  label: "Burp Suite", blurb: "Web app pentest proxy" },
          { id: "art",   label: "Atomic RT",  blurb: "Atomic test runner" },
        ]
      },
      { id: "exec", name: "EXECUTE",
        tools: [
          { id: "caldera", label: "Caldera",     blurb: "MITRE adversary emulation" },
          { id: "sliver",  label: "Sliver C2",    blurb: "Open-source C2 framework" },
          { id: "gophish", label: "GoPhish",      blurb: "Phishing campaign harness" },
        ]
      },
    ],
  },
  {
    id: "purple",
    label: "PURPLE · TRANSLATION",
    stages: [
      { id: "map", name: "MAP",
        tools: [
          { id: "mitre",   label: "MITRE ATT&CK",  blurb: "TTP taxonomy" },
          { id: "d3fend",  label: "D3FEND",        blurb: "Defensive countermeasures" },
          { id: "kpis",    label: "Coverage KPIs", blurb: "% techniques w/ detection" },
        ]
      },
      { id: "validate", name: "VALIDATE",
        tools: [
          { id: "purple-sprint", label: "Purple Sprint", blurb: "Red attacks → Blue tunes" },
          { id: "tabletop",      label: "Tabletop",       blurb: "IR scenario walkthroughs" },
          { id: "report",        label: "Exec Memo",      blurb: "Findings → leadership" },
        ]
      },
      { id: "loop", name: "LOOP",
        tools: [
          { id: "gap",       label: "Gap Closure",  blurb: "New detections → re-attack" },
          { id: "regression",label: "Regression",   blurb: "ART runs in CI nightly" },
          { id: "metrics",   label: "MTTD / MTTR",  blurb: "Improvement tracked weekly" },
        ]
      },
    ],
  },
  {
    id: "blue",
    label: "BLUE · DEFENSE",
    stages: [
      { id: "detect", name: "DETECT",
        tools: [
          { id: "splunk", label: "Splunk SPL",   blurb: "SIEM correlation rules" },
          { id: "sigma",  label: "Sigma",        blurb: "Vendor-neutral detection-as-code" },
          { id: "elk",    label: "ELK",          blurb: "Open-source SIEM stack" },
        ]
      },
      { id: "respond", name: "RESPOND",
        tools: [
          { id: "crwd",      label: "CrowdStrike", blurb: "EDR isolation + hunt" },
          { id: "proofpoint",label: "Proofpoint",  blurb: "Email security + TAP" },
          { id: "forcepoint",label: "Forcepoint",  blurb: "DLP for EHR/PHI" },
        ]
      },
      { id: "harden", name: "HARDEN",
        tools: [
          { id: "snort",  label: "Snort/Suricata", blurb: "Network IDS/IPS" },
          { id: "vol",    label: "Volatility",     blurb: "Memory forensics" },
          { id: "playbk", label: "IR Playbooks",   blurb: "NIST 800-61 aligned" },
        ]
      },
    ],
  },
];

// Cross-lane links: which red attacks feed which blue detections
const LINKS = [
  ["msf", "purple-sprint"], ["burp", "purple-sprint"], ["art", "regression"],
  ["caldera", "purple-sprint"], ["caldera", "mitre"],
  ["sliver", "splunk"], ["gophish", "proofpoint"],
  ["nmap", "snort"], ["tenable", "gap"],
  ["mitre", "splunk"], ["mitre", "sigma"], ["d3fend", "playbk"],
  ["purple-sprint", "splunk"], ["purple-sprint", "sigma"],
  ["gap", "crwd"], ["gap", "splunk"], ["regression", "sigma"],
  ["report", "metrics"],
];

// Purple-Team Fusion Core — a real 3D orbital model (drag to rotate it):
// red tools orbit a shell tilted one way, blue tools hold an inner shell
// tilted the other way, purple mediates on the equator — like a gyroscope
// or an atom's electron shells. Positions are computed with actual 3D
// rotation + perspective-projection math (no library), sorted back-to-front
// each frame so nearer nodes correctly occlude farther ones.
const RING_SPEC = {
  red:    { order: 0, tilt:  0.55 },
  purple: { order: 1, tilt:  0 },
  blue:   { order: 2, tilt: -0.55 },
};
const FOCAL = 480;

function rotX(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}
function rotY(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}
function project(p, cx, cy) {
  const scale = FOCAL / (FOCAL + p.z);
  return { x: cx + p.x * scale, y: cy + p.y * scale, z: p.z, scale };
}
function ringPath(radius, tilt, spinY, tiltX, cx, cy, segments = 56) {
  let d = "";
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    let p = { x: Math.cos(theta) * radius, y: 0, z: Math.sin(theta) * radius };
    p = rotX(p, tilt);
    p = rotY(p, spinY);
    p = rotX(p, tiltX);
    const s = project(p, cx, cy);
    d += (i === 0 ? "M" : "L") + s.x.toFixed(1) + " " + s.y.toFixed(1) + " ";
  }
  return d + "Z";
}

function NetworkGraph() {
  const wrap = useRef(null);
  const [size, setSize] = useState({ w: 900, h: 640 });
  const [hover, setHover] = useState(null);
  const [t, setT] = useState(0);
  const drag = useRef({ dragging: false, lastX: 0, lastY: 0, x: 0, y: 0 });

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => {
      const r = e.contentRect;
      setSize({ w: r.width, h: Math.max(560, r.width * 0.78) });
    });
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let raf;
    const tick = () => {
      setT(performance.now() / 1000);
      if (!reduced || drag.current.dragging) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const d = drag.current;
    const onDown = (e) => { d.dragging = true; d.lastX = e.clientX; d.lastY = e.clientY; };
    const onMove = (e) => {
      if (!d.dragging) return;
      d.x += (e.clientX - d.lastX) * 0.006;
      d.y = Math.max(-0.85, Math.min(0.85, d.y + (e.clientY - d.lastY) * 0.006));
      d.lastX = e.clientX; d.lastY = e.clientY;
      setT(performance.now() / 1000); // force a repaint mid-drag even if auto-spin is paused
    };
    const onUp = () => { d.dragging = false; };
    const el = wrap.current;
    if (el) el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      if (el) el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const W = size.w, H = size.h;
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) / 2 - 46;
  const spinY = t * 0.1 + drag.current.x;
  const tiltX = -0.34 + drag.current.y;

  const colorFor = (laneId) => laneId === "red" ? "var(--accent)" : laneId === "blue" ? "var(--blue)" : "var(--purple)";

  // Layout: each lane becomes a tilted orbital shell around a shared core.
  const layout = {};
  LANES.forEach((lane) => {
    const ring = RING_SPEC[lane.id];
    const radius = R * (0.4 + ring.order * 0.3);
    const tools = lane.stages.flatMap(s => s.tools);
    const n = tools.length;
    tools.forEach((tool, i) => {
      const stageGap = Math.floor(i / 3) * 0.12;
      const theta = (i / n) * Math.PI * 2 + stageGap;
      let p = { x: Math.cos(theta) * radius, y: 0, z: Math.sin(theta) * radius };
      p = rotX(p, ring.tilt);
      p = rotY(p, spinY);
      p = rotX(p, tiltX);
      const s = project(p, cx, cy);
      layout[tool.id] = { ...s, lane: lane.id, label: tool.label, blurb: tool.blurb };
    });
  });
  const nodesBackToFront = Object.entries(layout).sort((a, b) => b[1].z - a[1].z);

  // Connected node ids when hovering
  const connected = new Set();
  if (hover) {
    connected.add(hover);
    LINKS.forEach(([a, b]) => {
      if (a === hover) connected.add(b);
      if (b === hover) connected.add(a);
    });
  }
  const linksBackToFront = LINKS
    .map((pair, i) => ({ pair, i }))
    .filter(({ pair: [a, b] }) => layout[a] && layout[b])
    .sort((x, y) => (layout[y.pair[0]].z + layout[y.pair[1]].z) - (layout[x.pair[0]].z + layout[x.pair[1]].z));

  return (
    <div ref={wrap} className="netgraph netgraph-radial netgraph-3d" style={{ position: "relative", cursor: "grab" }}>
      <div className="mitre-legend" style={{ padding: "12px 14px 0" }}>
        <span className="lane-pill" style={{ color: colorFor("red"), borderColor: colorFor("red") }}>● RED · OFFENSE</span>
        <span className="lane-pill" style={{ color: colorFor("purple"), borderColor: colorFor("purple") }}>● PURPLE · TRANSLATION</span>
        <span className="lane-pill" style={{ color: colorFor("blue"), borderColor: colorFor("blue") }}>● BLUE · DEFENSE</span>
        <span className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.14em", marginLeft: "auto" }}>DRAG TO ROTATE</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
        {/* Orbital shell guides — real 3D ellipses, tilt as the core spins */}
        {Object.entries(RING_SPEC).map(([laneId, ring]) => {
          const radius = R * (0.4 + ring.order * 0.3);
          return (
            <path key={laneId}
              d={ringPath(radius, ring.tilt, spinY, tiltX, cx, cy)}
              fill="none" stroke="var(--rule)" strokeDasharray="2 6" opacity={0.65}
            />
          );
        })}

        {/* Links (sorted back-to-front) */}
        {linksBackToFront.map(({ pair: [a, b], i }) => {
          const A = layout[a], B = layout[b];
          const lit = hover && connected.has(a) && connected.has(b);
          const dim = hover && !lit;
          const pathId = `netlink-${i}`;
          const flowColor = colorFor(A.lane === "purple" ? B.lane : A.lane);
          const depth = Math.max(0.35, Math.min(1, (A.scale + B.scale) / 2));
          return (
            <g key={i}>
              <path id={pathId}
                d={`M ${A.x} ${A.y} Q ${cx} ${cy} ${B.x} ${B.y}`}
                stroke={lit ? flowColor : "var(--rule-strong)"}
                strokeWidth={(lit ? 1.6 : 0.8) * depth}
                fill="none"
                strokeDasharray={lit ? "0" : "2 4"}
                opacity={dim ? 0.12 : (lit ? 0.95 : 0.45 * depth)}
              />
              {lit && (
                <circle r={3} fill={flowColor}>
                  <animateMotion dur="1.1s" repeatCount="indefinite">
                    <mpath xlinkHref={`#${pathId}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

        {/* Center hub — purple team fusion core, fixed at the origin */}
        <circle cx={cx} cy={cy} r={30} fill="var(--bg-elev)" stroke="var(--purple)" strokeWidth={1.4} className="hub-pulse" />
        <text x={cx} y={cy - 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill="var(--purple)" style={{ letterSpacing: "0.12em" }}>PURPLE</text>
        <text x={cx} y={cy + 11} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill="var(--purple)" style={{ letterSpacing: "0.12em" }}>TEAM</text>

        {/* Nodes (sorted back-to-front so nearer orbits occlude farther ones) */}
        {nodesBackToFront.map(([id, n]) => {
          const isHover = hover === id;
          const isConn = connected.has(id);
          const dim = hover && !isConn;
          const c = colorFor(n.lane);
          const depth = Math.max(0.55, Math.min(1.35, n.scale));
          const r = (isHover ? 9 : 6) * depth;
          // Labels only render for whatever's interactive or clearly in the
          // foreground — at most rotation angles several nodes project near
          // the hub, and showing every label at once turns into unreadable
          // overlap. Everything else stays a plain dot; hover to identify it.
          const showLabel = isHover || isConn || depth > 1.15;
          return (
            <g key={id}
              onMouseEnter={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
              opacity={dim ? 0.28 : Math.max(0.4, depth)}
            >
              <circle cx={n.x} cy={n.y} r={r + 5} fill={c} opacity={isHover ? 0.18 : 0} />
              <circle cx={n.x} cy={n.y} r={r} fill={isHover ? c : "var(--bg-elev)"} stroke={c} strokeWidth={1.4} />
              {showLabel && (
                <text x={n.x} y={n.y - r - 7}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)" fontSize={9.5 * Math.max(0.8, depth)}
                  fill={isHover ? c : "var(--ink-dim)"}
                  style={{ letterSpacing: "0.03em" }}
                >{n.label}</text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="netgraph-readout">
        {hover && layout[hover] ? (
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: colorFor(layout[hover].lane), textTransform: "uppercase" }}>
              [{layout[hover].lane}] {layout[hover].label}
            </span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)" }}>{layout[hover].blurb}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.14em" }}>
              · LINKS {connected.size - 1}
            </span>
          </div>
        ) : (
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.16em" }}>
            NODES {Object.keys(layout).length} · EDGES {LINKS.length} · DRAG TO ROTATE · HOVER A NODE TO WATCH THE SIGNAL FLOW
          </span>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// ThreatRadar — SOC watchfloor radar: concentric sweep with
// contacts that ping in, get classified against ATT&CK, then
// fade. Pure canvas, pauses off-screen, honors reduced motion.
// ────────────────────────────────────────────────────────────
const RADAR_CONTACTS = [
  { id: "T1078", label: "Valid Accounts" },
  { id: "T1190", label: "Exploit Public-Facing App" },
  { id: "T1059", label: "Command & Scripting" },
  { id: "T1566", label: "Phishing" },
  { id: "T1110", label: "Brute Force" },
  { id: "T1021", label: "Remote Services" },
  { id: "T1486", label: "Data Encrypted (Ransom)" },
  { id: "T1046", label: "Network Service Discovery" },
];

function ThreatRadar() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [contact, setContact] = useState(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    let raf = null, visible = true, W = 0, H = 0, dpr = 1;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = Math.max(320, r.width * 0.92);
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduced) requestAnimationFrame(draw); });
    ro.observe(wrap);

    const css = (name) => getComputedStyle(document.body).getPropertyValue(name).trim();

    let blips = [];
    let lastSpawn = 0;

    const spawn = (now) => {
      const c = RADAR_CONTACTS[Math.floor(Math.random() * RADAR_CONTACTS.length)];
      const hostile = Math.random() < 0.45;
      blips.push({
        angle: Math.random() * Math.PI * 2,
        dist: 0.25 + Math.random() * 0.68,
        born: now,
        ttl: reduced ? Infinity : 6500 + Math.random() * 4000,
        hostile,
        contact: c,
      });
      if (blips.length > 9) blips.shift();
      setContact({ ...c, hostile });
    };

    const draw = (now) => {
      if (!reduced) raf = requestAnimationFrame(draw);
      if (!visible) return;

      const accent = css("--accent") || "#e05252";
      const signal = css("--signal") || "#5abf7d";
      const ruleC = css("--rule-strong") || "rgba(255,255,255,0.25)";
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) / 2 - 18;

      ctx.clearRect(0, 0, W, H);

      // rings + spokes
      ctx.strokeStyle = ruleC;
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75, 1].forEach(f => {
        ctx.beginPath();
        ctx.setLineDash(f === 1 ? [] : [2, 6]);
        ctx.arc(cx, cy, R * f, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.globalAlpha = 0.35;
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const sweep = reduced ? -Math.PI / 3 : (now / 1400) % (Math.PI * 2);

      if (!reduced) {
        // sweep trail
        const trail = ctx.createConicGradient
          ? ctx.createConicGradient(sweep - 0.02, cx, cy)
          : null;
        if (trail) {
          trail.addColorStop(0, "rgba(224,82,82,0.28)");
          trail.addColorStop(0.12, "rgba(224,82,82,0.0)");
          trail.addColorStop(1, "rgba(224,82,82,0)");
          ctx.fillStyle = trail;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, R, sweep - 1.2, sweep + 0.02);
          ctx.closePath();
          ctx.fill();
        }
        // sweep edge
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R);
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (now - lastSpawn > 1900 + Math.random() * 600) {
          lastSpawn = now;
          spawn(now);
        }
      } else if (!blips.length) {
        // static scene for reduced motion
        for (let i = 0; i < 4; i++) spawn(now);
      }

      // blips
      blips = blips.filter(b => now - b.born < b.ttl);
      blips.forEach(b => {
        const age = b.ttl === Infinity ? 0.3 : (now - b.born) / b.ttl;
        const px = cx + Math.cos(b.angle) * R * b.dist;
        const py = cy + Math.sin(b.angle) * R * b.dist;
        const col = b.hostile ? accent : signal;
        const alpha = age < 0.1 ? age / 0.1 : 1 - Math.max(0, (age - 0.6) / 0.4);

        // ping ring
        if (!reduced) {
          const ring = (now - b.born) % 1800 / 1800;
          ctx.strokeStyle = col;
          ctx.globalAlpha = alpha * (1 - ring) * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, 4 + ring * 16, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = col;
        ctx.globalAlpha = alpha * 0.9;
        ctx.fillText(b.contact.id, px + 8, py + 3);
        ctx.globalAlpha = 1;
      });
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(wrap);

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="radar-wrap">
      <canvas ref={canvasRef} aria-label="Decorative SOC radar sweep" />
      <div className="radar-readout mono">
        {contact ? (
          <>
            <span style={{ color: contact.hostile ? "var(--accent)" : "var(--signal)" }}>
              {contact.hostile ? "▲ CONTACT" : "● BENIGN"}
            </span>
            <span style={{ color: "var(--ink)" }}> {contact.id}</span>
            <span style={{ color: "var(--ink-dim)" }}> · {contact.label}</span>
          </>
        ) : (
          <span style={{ color: "var(--ink-mute)" }}>SWEEPING SECTOR…</span>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// LiveOpsFeed — endlessly streaming SOC activity log. New lines
// type themselves in with live timestamps; the feed pauses when
// scrolled out of view.
// ────────────────────────────────────────────────────────────
const FEED_POOL = [
  { tag: "OK",  tone: "signal", text: "Sigma rule pack synced — 312 detections active across Splunk indexes." },
  { tag: "DET", tone: "blue",   text: "CrowdStrike Falcon flagged anomalous LSASS access on WKS-0417 — auto-contained." },
  { tag: "OK",  tone: "signal", text: "Tenable scan complete: 0 new criticals across 512 assets." },
  { tag: "INC", tone: "accent", text: "Credential-stuffing burst on client VPN — locked out 14 accounts, IR opened." },
  { tag: "REV", tone: "amber",  text: "Reviewing Proofpoint TAP verdicts — 3 phish chains mapped to T1566.002." },
  { tag: "OK",  tone: "signal", text: "Atomic Red Team T1059.001 regression passed — detection fired in 1.2s." },
  { tag: "DET", tone: "blue",   text: "Stellar Cyber XDR correlated 5 IOCs to a single campaign — case auto-merged." },
  { tag: "OK",  tone: "signal", text: "MTTD trend: ↓ 30% quarter-over-quarter after correlation-search tuning." },
  { tag: "REV", tone: "amber",  text: "Purple sprint #14: Caldera op vs. new EDR policy — 2 gaps found, rules drafted." },
  { tag: "INC", tone: "accent", text: "Beaconing to known C2 ASN caught by Suricata — host isolated in 4 min." },
  { tag: "OK",  tone: "signal", text: "PCI DSS evidence pack generated for hospitality client — zero findings." },
  { tag: "DET", tone: "blue",   text: "Impossible-travel login (T1078) — MFA challenge enforced, session revoked." },
  { tag: "OK",  tone: "signal", text: "HIPAA DLP policy blocked outbound PHI attachment — sender coached." },
  { tag: "REV", tone: "amber",  text: "Threat-intel diff: 41 new IOCs ingested, 7 retro-hunt hits triaged." },
  { tag: "OK",  tone: "signal", text: "Nightly ART run: 96% technique coverage holding in CI." },
];

function LiveOpsFeed({ maxLines = 8 }) {
  const [lines, setLines] = useState(() => {
    const now = new Date();
    return FEED_POOL.slice(0, 4).map((l, i) => ({ ...l, ts: new Date(now - (4 - i) * 47000), key: `seed-${i}` }));
  });
  const wrapRef = useRef(null);
  const idxRef = useRef(4);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let visible = true, timer = null;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    if (wrapRef.current) io.observe(wrapRef.current);

    const push = () => {
      if (visible) {
        const l = FEED_POOL[idxRef.current % FEED_POOL.length];
        idxRef.current += 1;
        setLines(prev => [...prev.slice(-(maxLines - 1)), { ...l, ts: new Date(), key: `${Date.now()}` }]);
      }
      timer = setTimeout(push, 2600 + Math.random() * 2400);
    };
    timer = setTimeout(push, 1800);
    return () => { clearTimeout(timer); io.disconnect(); };
  }, [maxLines]);

  const fmt = (d) => {
    const p = (n) => String(n).padStart(2, "0");
    return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}Z`;
  };

  return (
    <div ref={wrapRef} className="ops-feed mono" aria-live="off">
      {lines.map((l) => (
        <div key={l.key} className="ops-line">
          <span className="ops-ts">{fmt(l.ts)}</span>
          <span className={`ops-tag tone-${l.tone}`}>[{l.tag}]</span>
          <span className="ops-text">{l.text}</span>
        </div>
      ))}
      <div className="ops-line ops-cursor-line">
        <span className="ops-ts">{"--:--:--"}</span>
        <span className="ops-tag" style={{ color: "var(--ink-mute)" }}>[..]</span>
        <span className="ops-text" style={{ color: "var(--ink-mute)" }}>listening<span className="caret" /></span>
      </div>
    </div>
  );
}

Object.assign(window, { MitreMatrix, NetworkGraph, ThreatRadar, LiveOpsFeed });
