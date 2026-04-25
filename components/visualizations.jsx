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
  blue: "var(--signal)",
  purple: "var(--amber)",
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
        {MATRIX.map((col) => (
          <div className="mitre-col" key={col.tactic}>
            <div className="mitre-col-h">
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--ink-mute)" }}>TACTIC</span>
              <div className="mono" style={{ fontSize: 13, color: "var(--ink)", marginTop: 4 }}>{col.tactic}</div>
            </div>
            {col.items.map((it, j) => (
              <div
                key={j}
                className="matrix-cell"
                onMouseEnter={() => setHover({ ...it, tactic: col.tactic })}
                onMouseLeave={() => setHover(null)}
                style={{ borderLeft: `2px solid ${LANE_COLOR[it.lane]}` }}
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

function NetworkGraph() {
  const wrap = useRef(null);
  const [size, setSize] = useState({ w: 900, h: 520 });
  const [hover, setHover] = useState(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => {
      const r = e.contentRect;
      setSize({ w: r.width, h: Math.max(480, r.width * 0.58) });
    });
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf;
    const tick = () => { setT(performance.now() / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = size.w, H = size.h;

  // Layout: 3 horizontal lanes, each with 3 stages, each with 3 tools
  // x = stage column (0..2), y = lane row (0..2), tool index within stage
  const layout = {};
  LANES.forEach((lane, li) => {
    lane.stages.forEach((stage, si) => {
      stage.tools.forEach((tool, ti) => {
        const x = (si + 0.5) * (W / 3) + (ti - 1) * (W * 0.07);
        const y = (li + 0.5) * (H / 3) + (ti - 1) * 18;
        const wob = Math.sin(t * 0.5 + li * 1.7 + si + ti) * 1.6;
        layout[tool.id] = { x: x + wob, y: y + Math.cos(t * 0.4 + ti) * 1.2, lane: lane.id, label: tool.label, blurb: tool.blurb };
      });
    });
  });

  const colorFor = (laneId) => laneId === "red" ? "var(--accent)" : laneId === "blue" ? "var(--signal)" : "var(--amber)";

  // Connected node ids when hovering
  const connected = new Set();
  if (hover) {
    connected.add(hover);
    LINKS.forEach(([a, b]) => {
      if (a === hover) connected.add(b);
      if (b === hover) connected.add(a);
    });
  }

  return (
    <div ref={wrap} className="netgraph" style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
        {/* Lane bands */}
        {LANES.map((lane, li) => (
          <g key={lane.id}>
            <rect x={0} y={li * (H/3)} width={W} height={H/3}
              fill={`color-mix(in oklch, ${colorFor(lane.id)} 8%, transparent)`}
              opacity={0.55}
            />
            <line x1={0} x2={W} y1={(li+1) * (H/3)} y2={(li+1) * (H/3)}
              stroke="var(--rule)" strokeDasharray="3 5" />
            <text x={14} y={li * (H/3) + 22}
              fontFamily="var(--font-mono)" fontSize={11} fill={colorFor(lane.id)}
              style={{ letterSpacing: "0.18em" }}
            >{lane.label}</text>
          </g>
        ))}

        {/* Stage column headers */}
        {["RECON / MAP / DETECT", "WEAPON / VALIDATE / RESPOND", "EXECUTE / LOOP / HARDEN"].map((hdr, i) => (
          <text key={i}
            x={(i + 0.5) * (W / 3)} y={H - 8}
            textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize={10}
            fill="var(--ink-mute)" style={{ letterSpacing: "0.18em" }}
          >{hdr}</text>
        ))}

        {/* Links */}
        {LINKS.map(([a, b], i) => {
          const A = layout[a], B = layout[b];
          if (!A || !B) return null;
          const lit = hover && (connected.has(a) && connected.has(b));
          const dim = hover && !lit;
          // Bezier control point pulled toward purple band
          const mx = (A.x + B.x) / 2;
          const my = (A.y + B.y) / 2;
          return (
            <path key={i}
              d={`M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`}
              stroke={lit ? colorFor(A.lane === "purple" ? B.lane : A.lane) : "var(--rule-strong)"}
              strokeWidth={lit ? 1.5 : 0.8}
              fill="none"
              strokeDasharray={lit ? "0" : "2 4"}
              opacity={dim ? 0.18 : (lit ? 0.95 : 0.5)}
            />
          );
        })}

        {/* Nodes */}
        {Object.entries(layout).map(([id, n]) => {
          const isHover = hover === id;
          const isConn = connected.has(id);
          const dim = hover && !isConn;
          const c = colorFor(n.lane);
          const r = isHover ? 9 : 6;
          return (
            <g key={id}
              onMouseEnter={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
              opacity={dim ? 0.3 : 1}
            >
              <circle cx={n.x} cy={n.y} r={r + 4} fill={c} opacity={isHover ? 0.18 : 0} />
              <circle cx={n.x} cy={n.y} r={r} fill={isHover ? c : "var(--bg-elev)"} stroke={c} strokeWidth={1.4} />
              <text x={n.x + 12} y={n.y + 4}
                fontFamily="var(--font-mono)" fontSize={10}
                fill={isHover ? c : "var(--ink)"}
                style={{ letterSpacing: "0.04em" }}
              >{n.label}</text>
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
            NODES {Object.keys(layout).length} · EDGES {LINKS.length} · HOVER A NODE TO TRACE THE LOOP
          </span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { MitreMatrix, NetworkGraph });
