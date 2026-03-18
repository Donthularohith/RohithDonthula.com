"use client";

import Image from "next/image";
import TickerTape from "@/components/TickerTape";
import ImpactCounter from "@/components/ImpactCounter";

// Reusable Terminal Card Component
const TerminalCard = ({ title, children, className = "" }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`terminal-card ${className}`}>
    <div className="terminal-card-header">
      <div className="terminal-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span>{title}</span>
    </div>
    <div className="terminal-card-body">
      {children}
    </div>
  </div>
);

// Skill Tag Component
const SkillTag = ({ name }: { name: string }) => (
  <span className="skill-tag text-xs font-mono px-3 py-1.5 uppercase rounded" style={{ border: "1px solid var(--border)", color: "var(--accent)", backgroundColor: "var(--accent-dim)" }}>
    {name}
  </span>
);

// GitHub Link Component
const GitHubLink = ({ href }: { href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 border transition-colors terminal-hover" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
    View on GitHub
  </a>
);

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ════════════════ HERO SECTION ════════════════ */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">

          {/* Left: Text */}
          <div className="col-span-1 md:col-span-8 space-y-8 antigravity">
            <TerminalCard title="rohith@kali:~/whoami">
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--accent)" }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--accent)" }}></span>
                  </span>
                  System Status: Active
                </div>
                <div className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
                  Dossier #882-991 // Classified
                </div>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] neon-glow mb-6">
                <span className="terminal-type" data-text="> ROHITH"></span>
                <br />
                <span className="terminal-type" data-text="> DONTHULA" style={{ opacity: 0.6 }}></span>
              </h1>
              <p className="text-xl sm:text-2xl max-w-2xl leading-relaxed mb-2" style={{ color: "var(--accent)" }}>
                <span className="terminal-type" data-text="> Cyber Security Analyst"></span>
              </p>
              <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-6" style={{ color: "var(--text-dim)" }}>
                <span className="terminal-type" data-text="> Offensive Security Testing // Detection Engineering // Incident Response"></span>
              </p>

              <div className="flex items-center gap-4 mb-6 font-mono text-xs" style={{ color: "var(--text-dim)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }}></span>
                  <span>3+ Years Experience</span>
                </div>
                <span style={{ color: "var(--border)" }}>│</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#ff5f57" }}></span>
                  <span>Healthcare (Cerner)</span>
                </div>
                <span style={{ color: "var(--border)" }}>│</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#febc2e" }}></span>
                  <span>Financial (Capgemini)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="group relative inline-flex items-center px-8 py-3 text-sm font-mono font-bold uppercase tracking-widest overflow-hidden border terminal-hover"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  <span className="relative z-10 transition-colors">View Projects</span>
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center px-8 py-3 border text-sm font-mono font-bold uppercase tracking-widest transition-colors terminal-hover"
                  style={{
                    borderColor: "var(--text-dim)",
                    color: "var(--text-dim)",
                  }}
                >
                  Download CV
                </a>
              </div>

              <div className="flex items-center gap-6 mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                <img src="/security-plus.png" alt="CompTIA Security+ CE Certified" className="w-14 h-14 object-contain comptia-logo" />
                <div className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                  <div style={{ color: "var(--accent)" }}>CompTIA Security+ CE | CySA+</div>
                  <div>Pursuing OSCP & CISSP</div>
                </div>
              </div>
            </TerminalCard>
          </div>

          {/* Right: Photo/Stats */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-center md:items-end justify-center antigravity" style={{ animationDelay: "-2s" }}>
            <TerminalCard title="rohith@kali:~/profile.jpg" className="grayscale hover:grayscale-0 transition-all duration-700 ease-out">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 translate-x-3 translate-y-3" style={{ border: "1px solid var(--accent)" }}></div>
                <Image
                  src="/profile.jpg"
                  alt="Rohith Donthula"
                  fill
                  className="object-cover object-top"
                  priority
                  unoptimized
                />


              </div>
            </TerminalCard>

            <div className="mt-6 grid grid-cols-2 gap-6 text-right font-mono text-xs w-full">
              <div>
                <div className="mb-1" style={{ color: "var(--text-dim)" }}>LOCATION</div>
                <div>Jersey City, NJ</div>
              </div>
              <div>
                <div className="mb-1" style={{ color: "var(--text-dim)" }}>STATUS</div>
                <div style={{ color: "var(--accent)" }}>Active</div>
              </div>
              <div>
                <div className="mb-1" style={{ color: "var(--text-dim)" }}>FOCUS</div>
                <div>Red + Blue Team</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <TickerTape text="INTELLIGENCE GATHERED // SECURITY AUDIT COMPLETE // ACCESS GRANTED // SYSTEM SECURE //" />

      {/* ════════════════ MEASURABLE IMPACT ════════════════ */}
      <section id="impact" className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase sticky top-32 flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="terminal-type" data-text="> ./metrics.sh"></span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-9 antigravity">
            <TerminalCard title="rohith@kali:~/impact_report.log">
              <div className="text-xs font-mono mb-6 uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                // Quantified security outcomes from production environments
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="impact-metric reveal-on-scroll">
                  <div className="impact-metric-value neon-glow">
                    <ImpactCounter target={45} suffix="%" />
                  </div>
                  <div className="impact-metric-bar">
                    <div className="impact-metric-fill" style={{ "--fill-width": "45%" } as React.CSSProperties}></div>
                  </div>
                  <div className="impact-metric-label">Reduction in Unauthorized Access</div>
                  <div className="impact-metric-detail">Implemented RBAC policies & MFA enforcement across clinical endpoints at Cerner</div>
                </div>

                <div className="impact-metric reveal-on-scroll">
                  <div className="impact-metric-value neon-glow">
                    <ImpactCounter target={28} suffix="%" />
                  </div>
                  <div className="impact-metric-bar">
                    <div className="impact-metric-fill" style={{ "--fill-width": "28%" } as React.CSSProperties}></div>
                  </div>
                  <div className="impact-metric-label">Improvement in SOC Response Time</div>
                  <div className="impact-metric-detail">Optimized SIEM alerting and automated triage workflows using Splunk + Cortex XSOAR</div>
                </div>

                <div className="impact-metric reveal-on-scroll">
                  <div className="impact-metric-value neon-glow">
                    <ImpactCounter target={30} suffix="%" />
                  </div>
                  <div className="impact-metric-bar">
                    <div className="impact-metric-fill" style={{ "--fill-width": "30%" } as React.CSSProperties}></div>
                  </div>
                  <div className="impact-metric-label">Reduction in Uninvestigated Cloud Alerts</div>
                  <div className="impact-metric-detail">Integrated Netskope CASB with SIEM for real-time cloud activity correlation & DLP enforcement</div>
                </div>
              </div>
            </TerminalCard>
          </div>
        </div>
      </section>

      <TickerTape text="DEPLOYING COUNTERMEASURES // ANALYZING NETWORK TRAFFIC // ENCRYPTING DATA // FIREWALL ACTIVE //" />

      {/* ════════════════ ABOUT ════════════════ */}
      <section id="about" className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase sticky top-32 flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="terminal-type" data-text="> ./fetch_intel.sh"></span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-9 antigravity">
            <TerminalCard title="rohith@kali:~/about.md">
              <p className="text-lg leading-relaxed mb-4">
                Cyber Security Analyst with <span className="font-bold" style={{ color: "var(--accent)" }}>3+ years</span> of hands-on experience defending critical infrastructure across <span className="font-bold underline underline-offset-4" style={{ textDecorationColor: "var(--accent)" }}>healthcare</span> and <span className="font-bold underline underline-offset-4" style={{ textDecorationColor: "var(--accent)" }}>financial</span> sectors.
              </p>
              <p style={{ color: "var(--text-dim)" }}>
                I specialize in offensive security testing, detection engineering, and incident response. From leading Purple Team exercises and SIEM optimization at Cerner to conducting penetration tests and hardening firewalls at Capgemini, I bridge the gap between red and blue team operations. My mission: build systems that are difficult to compromise and easy to monitor.
              </p>
            </TerminalCard>
          </div>
        </div>
      </section>

      {/* ════════════════ TECHNICAL ARSENAL ════════════════ */}
      <section id="skills" className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase sticky top-32 flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="terminal-type" data-text="> ./arsenal.sh"></span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-9 space-y-6 antigravity">

            {/* Offensive Security */}
            <div className="reveal-on-scroll">
              <TerminalCard title="cat offensive_security.conf">
                <div className="skill-cluster">
                  <div className="skill-cluster-header">
                    <span className="skill-cluster-icon">⚔️</span>
                    <div>
                      <h4 className="text-base font-bold neon-glow">Offensive Security</h4>
                      <p className="text-xs" style={{ color: "var(--text-dim)" }}>Penetration Testing & Threat Simulation</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["MITRE ATT&CK", "Metasploit", "Burp Suite", "Kali Linux", "OWASP Top 10", "Nmap", "Nikto", "Snort IDS", "OpenVAS", "Rapid7 Nexpose"].map((s, i) => (
                      <SkillTag key={i} name={s} />
                    ))}
                  </div>
                </div>
              </TerminalCard>
            </div>

            {/* SIEM / SOAR */}
            <div className="reveal-on-scroll">
              <TerminalCard title="cat siem_soar.conf">
                <div className="skill-cluster">
                  <div className="skill-cluster-header">
                    <span className="skill-cluster-icon">🛡️</span>
                    <div>
                      <h4 className="text-base font-bold neon-glow">SIEM / SOAR</h4>
                      <p className="text-xs" style={{ color: "var(--text-dim)" }}>Detection, Correlation & Automated Response</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Splunk Enterprise", "IBM QRadar", "Cortex XSOAR", "ELK Stack", "CrowdStrike Falcon", "Tenable.io", "Proofpoint", "Forcepoint DLP"].map((s, i) => (
                      <SkillTag key={i} name={s} />
                    ))}
                  </div>
                </div>
              </TerminalCard>
            </div>

            {/* Cloud Security */}
            <div className="reveal-on-scroll">
              <TerminalCard title="cat cloud_security.conf">
                <div className="skill-cluster">
                  <div className="skill-cluster-header">
                    <span className="skill-cluster-icon">☁️</span>
                    <div>
                      <h4 className="text-base font-bold neon-glow">Cloud Security</h4>
                      <p className="text-xs" style={{ color: "var(--text-dim)" }}>Cloud-Native Controls & DevSecOps</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["AWS Security", "Azure", "Netskope CASB", "Docker", "Kubernetes", "Terraform", "CI/CD Security", "Zero Trust (ZTNA)"].map((s, i) => (
                      <SkillTag key={i} name={s} />
                    ))}
                  </div>
                </div>
              </TerminalCard>
            </div>

            {/* Compliance & Governance */}
            <div className="reveal-on-scroll">
              <TerminalCard title="cat compliance.conf">
                <div className="skill-cluster">
                  <div className="skill-cluster-header">
                    <span className="skill-cluster-icon">📋</span>
                    <div>
                      <h4 className="text-base font-bold neon-glow">Compliance & Governance</h4>
                      <p className="text-xs" style={{ color: "var(--text-dim)" }}>Frameworks, Regulations & Audit</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["HIPAA", "NIST", "PCI DSS", "GDPR", "SOC 2", "CIP", "RBAC", "Vendor Risk Management"].map((s, i) => (
                      <SkillTag key={i} name={s} />
                    ))}
                  </div>
                </div>
              </TerminalCard>
            </div>

            {/* Programming & Scripting */}
            <div className="reveal-on-scroll">
              <TerminalCard title="cat languages.conf">
                <div className="skill-cluster">
                  <div className="skill-cluster-header">
                    <span className="skill-cluster-icon">💻</span>
                    <div>
                      <h4 className="text-base font-bold neon-glow">Programming & Scripting</h4>
                      <p className="text-xs" style={{ color: "var(--text-dim)" }}>Automation, Analysis & Tool Development</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Python", "Golang", "PowerShell", "Bash", "SQL", "Java", "C++", "TypeScript"].map((s, i) => (
                      <SkillTag key={i} name={s} />
                    ))}
                  </div>
                </div>
              </TerminalCard>
            </div>

          </div>
        </div>
      </section>

      <TickerTape text="EXECUTING PROTOCOLS // INITIATING HANDSHAKE // VERIFYING CERTIFICATES // CONNECTION ESTABLISHED //" />

      {/* ════════════════ EXPERIENCE TIMELINE ════════════════ */}
      <section id="experience" className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase sticky top-32 flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="terminal-type" data-text="> ./fetch_experience.sh"></span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-9 space-y-0 antigravity">

            {/* ─── Timeline Rail ─── */}
            <div className="timeline-rail">

              {/* Job 1 - Cerner (Current) */}
              <div className="timeline-item reveal-on-scroll">
                <div className="timeline-dot timeline-dot-active">
                  <span className="timeline-dot-ping"></span>
                </div>
                <TerminalCard title="rohith@kali:~/experience/cerner.sh">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="timeline-badge-current">CURRENT</span>
                    <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Jun 2025 — Present</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1 neon-glow">[+] Cyber Security Analyst | Cerner — MD</h4>
                  <p className="text-xs font-mono mb-4" style={{ color: "var(--text-muted)" }}>Healthcare Infrastructure // EHR Security // Cloud Visibility</p>
                  <div className="space-y-2 text-sm" style={{ color: "var(--text-dim)" }}>
                    <p>▸ Led global SIEM optimization initiative supporting EHR platforms, enhancing threat detection and ensuring HIPAA compliance across clinical and cloud infrastructure.</p>
                    <p>▸ Conducted Purple Team exercises combining red team TTPs with blue team detection to validate SOC alerting coverage, mapping to MITRE ATT&CK.</p>
                    <p>▸ Integrated Netskope CASB with Splunk for real-time cloud activity correlation, reducing uninvestigated cloud alerts by <span style={{ color: "var(--accent)" }}>30%</span>.</p>
                    <p>▸ Implemented automated SIEM alerting, improving Mean Time to Detect (MTTD) by <span style={{ color: "var(--accent)" }}>30%</span>.</p>
                    <p>▸ Managed EDR using CrowdStrike Falcon across 500+ clinical endpoints; deployed Proofpoint email security and Forcepoint DLP for PHI/EHR protection.</p>
                    <p>▸ Performed continuous vulnerability assessments using Tenable.io, prioritizing remediation based on CVSS scores.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Splunk", "CrowdStrike", "Netskope", "MITRE ATT&CK", "Purple Team", "HIPAA"].map((tag, j) => (
                      <SkillTag key={j} name={tag} />
                    ))}
                  </div>
                </TerminalCard>
              </div>

              {/* Job 2 - Capgemini */}
              <div className="timeline-item reveal-on-scroll">
                <div className="timeline-dot"></div>
                <TerminalCard title="rohith@kali:~/experience/capgemini.sh">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>Jun 2021 — Jul 2024</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1 neon-glow">[+] Cyber Security Engineer | Capgemini — India</h4>
                  <p className="text-xs font-mono mb-4" style={{ color: "var(--text-muted)" }}>Financial Infrastructure // Penetration Testing // Firewall Hardening</p>
                  <div className="space-y-2 text-sm" style={{ color: "var(--text-dim)" }}>
                    <p>▸ Integrated IBM QRadar SIEM with financial transaction logs to detect fraud attempts and insider misuse across banking networks.</p>
                    <p>▸ Performed penetration testing of online banking applications using Burp Suite, Kali Linux, and OWASP Top 10 methodologies.</p>
                    <p>▸ Deployed Palo Alto Next-Gen and Cisco ASA Firewalls to segment SWIFT and internet banking networks, reducing unauthorized access by <span style={{ color: "var(--accent)" }}>45%</span>.</p>
                    <p>▸ Designed data protection strategies under PCI DSS and GDPR via encryption, tokenization, and RBAC.</p>
                    <p>▸ Utilized EnCase and FTK Forensics, extracting digital evidence and increasing investigation turnaround speed by <span style={{ color: "var(--accent)" }}>75%</span>.</p>
                    <p>▸ Automated security compliance checks using Python scripts, reducing manual audit time by <span style={{ color: "var(--accent)" }}>40%</span>.</p>
                    <p>▸ Led incident response for 50+ security events, coordinating containment and recovery across cross-functional teams.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["QRadar", "Burp Suite", "Palo Alto", "PCI DSS", "EnCase", "Python"].map((tag, j) => (
                      <SkillTag key={j} name={tag} />
                    ))}
                  </div>
                </TerminalCard>
              </div>


            </div>
          </div>
        </div>
      </section>

      <TickerTape text="SCANNING TARGETS // VULNERABILITY DETECTED // PATCHING SYSTEMS // AUDIT TRAIL ACTIVE //" />

      {/* ════════════════ PROJECTS ════════════════ */}
      <section id="projects" className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase sticky top-32 flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="terminal-type" data-text="> ./list_protocols.sh"></span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-9 space-y-8 antigravity">

            {/* Project 1 - ZTEV (Featured) */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/ztev_project.py">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>Featured Case Study</span>
                </div>
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/ztev.svg" alt="Zero Trust Electronic Voting System" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] Zero Trust Electronic Voting System (ZTEV)</h4>
                <div className="space-y-2 text-sm mb-4" style={{ color: "var(--text-dim)" }}>
                  <p>▸ Developed and deployed a Zero Trust Electronic Voting System to mitigate security risks from BYOD and limited device monitoring.</p>
                  <p>▸ Integrated multi-factor authentication (MFA), blockchain audit logs, and AES-256 encryption to secure electronic voting processes.</p>
                  <p>▸ Configured Snort IDS for real-time threat monitoring and implemented Zero Trust Network Access (ZTNA) policies.</p>
                  <p>▸ Successfully secured a research grant for this project.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Blockchain", "AES-256", "Snort IDS", "ZTNA", "MFA"].map((tag, j) => (
                    <SkillTag key={j} name={tag} />
                  ))}
                </div>
                <GitHubLink href="https://github.com/Donthularohith" />
              </TerminalCard>
            </div>

            {/* Project 2 - IoT Healthcare (Featured) */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/pmrss_healthcare.py">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>Featured Case Study</span>
                </div>
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/iot-health.svg" alt="HIPAA-Compliant IoT Healthcare Privacy System" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] HIPAA-Compliant IoT Healthcare Privacy System (PMRSS)</h4>
                <div className="space-y-2 text-sm mb-4" style={{ color: "var(--text-dim)" }}>
                  <p>▸ Led a team of 3 to develop a Privacy-preserving Medical Record Searching Scheme for Intelligent Diagnosis in IoT Healthcare.</p>
                  <p>▸ Ensured strict compliance with HIPAA requirements, guaranteeing untraceable use of medical data.</p>
                  <p>▸ Implemented searchable encryption to enable secure queries over encrypted health records without data exposure.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["IoT", "HIPAA", "Encryption", "Privacy", "Healthcare"].map((tag, j) => (
                    <SkillTag key={j} name={tag} />
                  ))}
                </div>
                <GitHubLink href="https://github.com/Donthularohith" />
              </TerminalCard>
            </div>

            {/* Project 3 - Pentest Capstone */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/pentest_capstone.sh">
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/pentest.svg" alt="Penetration Testing Capstone" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] Penetration Testing & Threat Intelligence Capstone</h4>
                <div className="space-y-2 text-sm mb-4" style={{ color: "var(--text-dim)" }}>
                  <p>▸ Led a team in conducting penetration tests on enterprise applications, identifying critical vulnerabilities and implementing remediation strategies.</p>
                  <p>▸ Developed detailed risk assessment reports based on findings from MITRE ATT&CK framework analysis.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["MITRE ATT&CK", "Risk Assessment", "Pen Testing"].map((tag, j) => (
                    <SkillTag key={j} name={tag} />
                  ))}
                </div>
                <GitHubLink href="https://github.com/Donthularohith" />
              </TerminalCard>
            </div>

            {/* Project 4 - FBI Crime Analysis */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/fbi_crime_ml.py">
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/fbi-crime.svg" alt="FBI Crime Analysis" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] FBI Crime Analysis & Prediction</h4>
                <div className="space-y-2 text-sm mb-4" style={{ color: "var(--text-dim)" }}>
                  <p>▸ Developed machine learning models achieving 90% accuracy in predicting crime rates, enabling proactive law enforcement responses.</p>
                  <p>▸ Improved project organization and data pipeline architecture for large-scale FBI crime datasets.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Machine Learning", "Data Analysis", "Python"].map((tag, j) => (
                    <SkillTag key={j} name={tag} />
                  ))}
                </div>
                <GitHubLink href="https://github.com/Donthularohith" />
              </TerminalCard>
            </div>

          </div>
        </div>
      </section>

      <TickerTape text="CREDENTIALS VERIFIED // CERTIFICATES VALIDATED // KNOWLEDGE BASE UPDATED //" />

      {/* ════════════════ EDUCATION & CERTIFICATIONS ════════════════ */}
      <section id="education" className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase sticky top-32 flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="terminal-type" data-text="> ./credentials.sh"></span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-9 space-y-8 antigravity">

            {/* Education Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="reveal-on-scroll">
                <TerminalCard title="cat education_ms.log">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🎓</span>
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>Master&apos;s Degree</span>
                  </div>
                  <div className="text-lg font-bold mb-1">MS in Cybersecurity</div>
                  <div className="text-sm font-bold" style={{ color: "var(--accent)" }}>Yeshiva University</div>
                  <div className="text-xs" style={{ color: "var(--text-dim)" }}>Katz School of Science & Health, NY</div>
                  <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Dec 2025</div>
                  <div className="mt-3 text-xs" style={{ color: "var(--text-dim)" }}>
                    Courses: Cybersecurity Foundations, Architecture of Secure Operating Systems, Network & Data Security, Cybercrime & Threat Actors, Audit & Assessment
                  </div>
                </TerminalCard>
              </div>

              <div className="reveal-on-scroll">
                <TerminalCard title="cat education_pg.log">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📜</span>
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>Post Graduate</span>
                  </div>
                  <div className="text-lg font-bold mb-1">PG Diploma in Cybersecurity</div>
                  <div className="text-sm font-bold" style={{ color: "var(--accent)" }}>IIIT Bangalore</div>
                  <div className="text-xs" style={{ color: "var(--text-dim)" }}>Indian Institute of Information Technology</div>
                  <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>May 2024</div>
                </TerminalCard>
              </div>

              <div className="reveal-on-scroll">
                <TerminalCard title="cat education_btech.log">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🏛️</span>
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>Undergraduate</span>
                  </div>
                  <div className="text-lg font-bold mb-1">B.Tech in Computer Science</div>
                  <div className="text-sm font-bold" style={{ color: "var(--accent)" }}>JNTU Hyderabad</div>
                  <div className="text-xs" style={{ color: "var(--text-dim)" }}>Malla Reddy Institute of Technology</div>
                  <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Jul 2023</div>
                </TerminalCard>
              </div>

              {/* Achievements */}
              <div className="reveal-on-scroll">
                <TerminalCard title="cat achievements.log">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🏆</span>
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>Achievements</span>
                  </div>
                  <div className="space-y-3 text-sm" style={{ color: "var(--text-dim)" }}>
                    <p>▸ <span className="font-bold" style={{ color: "var(--text)" }}>2nd Place — CTF Competition</span> hosted by ISACA & Yeshiva University</p>
                    <p>▸ <span className="font-bold" style={{ color: "var(--text)" }}>Research Grant Recipient</span> for the Zero Trust Electronic Voting System project</p>
                  </div>
                </TerminalCard>
              </div>
            </div>

            {/* Certifications */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/certifications.sh">
                <h4 className="text-base font-bold mb-4 neon-glow">Certifications & Training</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="cert-item">
                    <div className="cert-item-status cert-active">ACTIVE</div>
                    <div className="font-bold text-sm">CompTIA Security+ CE</div>
                    <div className="text-xs" style={{ color: "var(--text-dim)" }}>Industry-standard cybersecurity certification</div>
                  </div>
                  <div className="cert-item">
                    <div className="cert-item-status cert-active">ACTIVE</div>
                    <div className="font-bold text-sm">CompTIA CySA+</div>
                    <div className="text-xs" style={{ color: "var(--text-dim)" }}>Cybersecurity Analyst — Threat detection & response</div>
                  </div>
                  <div className="cert-item">
                    <div className="cert-item-status cert-pursuing">PURSUING</div>
                    <div className="font-bold text-sm">OSCP</div>
                    <div className="text-xs" style={{ color: "var(--text-dim)" }}>Offensive Security Certified Professional</div>
                  </div>
                  <div className="cert-item">
                    <div className="cert-item-status cert-pursuing">PURSUING</div>
                    <div className="font-bold text-sm">CISSP</div>
                    <div className="text-xs" style={{ color: "var(--text-dim)" }}>Certified Information Systems Security Professional</div>
                  </div>
                  <div className="cert-item">
                    <div className="cert-item-status cert-active">ACTIVE</div>
                    <div className="font-bold text-sm">SOC Hands-On Lab</div>
                    <div className="text-xs" style={{ color: "var(--text-dim)" }}>Cyberbit, Yeshiva University</div>
                  </div>
                  <div className="cert-item">
                    <div className="cert-item-status cert-active">ACTIVE</div>
                    <div className="font-bold text-sm">Google Cybersecurity Professional</div>
                    <div className="text-xs" style={{ color: "var(--text-dim)" }}>Coursera Certificate Program</div>
                  </div>
                </div>
              </TerminalCard>
            </div>

          </div>
        </div>
      </section>

      <TickerTape text="TERMINATING SESSION // ENCRYPTING LOGS // CLOSING PORTS // GOODBYE //" />

      {/* ════════════════ FOOTER / CONTACT ════════════════ */}
      <footer id="contact" className="py-24 relative overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="antigravity">
            <TerminalCard title="rohith@kali:~/contact.sh">
              <div className="text-xs font-mono mb-6 tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
                <span className="terminal-type" data-text="// Transmission End"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-glow">
                READY TO <br /><span style={{ color: "var(--accent)" }}>COLLABORATE?</span>
              </h2>
              <div className="flex flex-col gap-3 text-lg">
                <a href="mailto:donthula.rohith22@gmail.com" className="transition-colors terminal-hover" style={{ color: "var(--text)" }}>donthula.rohith22@gmail.com</a>
                <a href="tel:5513259945" className="transition-colors terminal-hover" style={{ color: "var(--text)" }}>(551) 325-9945</a>
              </div>
            </TerminalCard>
          </div>
          <div className="flex flex-col justify-between items-start md:items-end antigravity" style={{ animationDelay: "-2s" }}>
            <TerminalCard title="rohith@kali:~/socials.txt">
              <div className="space-y-4 text-right">
                <a href="https://github.com/Donthularohith" target="_blank" className="block text-2xl font-bold transition-colors terminal-hover" style={{ color: "var(--text)" }}>GITHUB</a>
                <a href="http://www.linkedin.com/in/rohith-donthula" target="_blank" className="block text-2xl font-bold transition-colors terminal-hover" style={{ color: "var(--text)" }}>LINKEDIN</a>
              </div>
              <div className="text-xs mt-8 font-mono text-right" style={{ color: "var(--text-dim)" }}>
                © 2026 ROHITH DONTHULA. <span style={{ color: "var(--accent)" }}>ALL RIGHTS RESERVED.</span>
              </div>
            </TerminalCard>
          </div>
        </div>
      </footer>
    </div>
  );
}
