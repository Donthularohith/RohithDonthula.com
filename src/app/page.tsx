"use client";

import Image from "next/image";
import TickerTape from "@/components/TickerTape";

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
              <p className="text-xl sm:text-2xl max-w-2xl leading-relaxed mb-6" style={{ color: "var(--text-dim)" }}>
                <span className="terminal-type" data-text="> Cybersecurity Specialist // Incident Response // Risk Management // Cloud Security"></span>
              </p>

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

              <div className="flex items-center gap-4 mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                <img src="/security-plus.png" alt="CompTIA Security+ CE Certified" className="w-16 h-16 object-contain" style={{ filter: "invert(1) brightness(2)" }} />
                <div className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                  <div style={{ color: "var(--accent)" }}>CompTIA Security+ CE</div>
                  <div>Certified Professional</div>
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
                <div className="absolute bottom-0 right-0 text-xs font-mono p-1 px-2" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>
                  LEVEL 5 ACCESS
                </div>
              </div>
            </TerminalCard>

            <div className="mt-6 grid grid-cols-2 gap-6 text-right font-mono text-xs w-full">
              <div>
                <div className="mb-1" style={{ color: "var(--text-dim)" }}>LOCATION</div>
                <div>Jersey City, NJ</div>
              </div>
              <div>
                <div className="mb-1" style={{ color: "var(--text-dim)" }}>AVAILABLE</div>
                <div style={{ color: "var(--accent)" }}>Dec 2025</div>
              </div>
              <div>
                <div className="mb-1" style={{ color: "var(--text-dim)" }}>FOCUS</div>
                <div>Blue Team / SOC</div>
              </div>
              <div>
                <div className="mb-1" style={{ color: "var(--text-dim)" }}>CLEARANCE</div>
                <div>Pending</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TickerTape text="INTELLIGENCE GATHERED // SECURITY AUDIT COMPLETE // ACCESS GRANTED // SYSTEM SECURE //" />

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
                I am a cybersecurity graduate student at <span className="font-bold underline underline-offset-4" style={{ textDecorationColor: "var(--accent)" }}>Yeshiva University</span>, bridging the gap between offensive insights and defensive strategies.
              </p>
              <p style={{ color: "var(--text-dim)" }}>
                My mission is to design systems that are difficult to compromise and easy to monitor. With experience in vendor risk assessments, penetration testing, and SOC analysis, I work with SIEM, IDS/IPS, and cloud-native controls to detect and neutralize threats.
              </p>
            </TerminalCard>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                { label: "Education", value: "MS Cybersecurity", sub: "Yeshiva University", file: "education.log" },
                { label: "Post Grad", value: "Cybersecurity Diploma", sub: "IIIT Bangalore", file: "postgrad.log" },
                { label: "Undergrad", value: "B.Tech CSE", sub: "JNTU Hyderabad", file: "undergrad.log" }
              ].map((item, i) => (
                <TerminalCard key={i} title={`cat ${item.file}`}>
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-dim)" }}>{item.label}</div>
                  <div className="text-lg font-bold">{item.value}</div>
                  <div className="text-sm" style={{ color: "var(--text-dim)" }}>{item.sub}</div>
                </TerminalCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TickerTape text="DEPLOYING COUNTERMEASURES // ANALYZING NETWORK TRAFFIC // ENCRYPTING DATA // FIREWALL ACTIVE //" />

      {/* ════════════════ EXPERIENCE ════════════════ */}
      <section id="experience" className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase sticky top-32 flex items-center gap-2" style={{ color: "var(--text-dim)" }}>
              <span className="w-2 h-2" style={{ backgroundColor: "var(--accent)" }}></span>
              <span className="terminal-type" data-text="> ./fetch_experience.sh"></span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-9 space-y-8 antigravity">
            {/* Job 1 - Cerner */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/experience/cerner.sh">
                <h4 className="text-lg font-bold mb-1 neon-glow">[+] Cyber Security Analyst | Cerner - MD</h4>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>    Timeline: Jun 2025 - Current</p>
                <pre className="terminal-type force-type text-sm whitespace-pre-wrap font-mono leading-relaxed" data-text={`    > Led a global SIEM optimization initiative supporting EHR platforms, enhancing threat detection and ensuring HIPAA compliance.\n    > Utilized Splunk Enterprise for centralized log management and event correlation across clinical and cloud infrastructure.\n    > Conducted continuous vulnerability assessments using Tenable.io, prioritizing remediation based on CVSS scores.\n    > Implemented automated SIEM alerting, improving Mean Time to Detect (MTTD) by 30%.\n    > Deployed Proofpoint email security to mitigate phishing, malware, and BEC attacks targeting clinical staff.\n    > Customized Forcepoint DLP policies to safeguard Electronic Health Records (EHR) and PHI.\n    > Managed endpoint detection and response (EDR) using CrowdStrike Falcon across 500+ clinical endpoints.\n    > Performed threat hunting and IOC analysis using MITRE ATT&CK framework to identify advanced persistent threats.`}></pre>
              </TerminalCard>
            </div>

            {/* Job 2 - Capgemini */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/experience/capgemini.sh">
                <h4 className="text-lg font-bold mb-1 neon-glow">[+] Cyber Security Engineer | Capgemini - India</h4>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>    Timeline: Jun 2021 - Jul 2024</p>
                <pre className="terminal-type force-type text-sm whitespace-pre-wrap font-mono leading-relaxed" data-text={`    > Integrated IBM QRadar SIEM with financial transaction logs to detect fraud attempts and insider misuse.\n    > Conducted vulnerability assessments using OpenVAS and Rapid7 Nexpose on payment gateways and APIs.\n    > Designed robust data protection strategies under PCI DSS and GDPR via encryption, tokenization, and RBAC.\n    > Deployed Palo Alto Next-Gen and Cisco ASA Firewalls to segment SWIFT and internet banking networks.\n    > Performed penetration testing of online banking apps using Burp Suite, Kali Linux, and OWASP Top 10.\n    > Utilized EnCase and FTK Forensics, extracting digital evidence and increasing investigation turnaround speed by 75%.\n    > Automated security compliance checks using Python scripts, reducing manual audit time by 40%.\n    > Led incident response for 50+ security events, coordinating containment and recovery across cross-functional teams.`}></pre>
              </TerminalCard>
            </div>
          </div>
        </div>
      </section>

      <TickerTape text="EXECUTING PROTOCOLS // INITIATING HANDSHAKE // VERIFYING CERTIFICATES // CONNECTION ESTABLISHED //" />

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

            {/* Project 1 - Pentest Capstone */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/pentest_capstone.sh">
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/pentest.svg" alt="Penetration Testing Capstone" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] Penetration Testing &amp; Threat Intelligence Capstone</h4>
                <pre className="terminal-type force-type text-sm whitespace-pre-wrap font-mono leading-relaxed mb-4" data-text={`    > Led a team in conducting penetration tests on enterprise applications, identifying vulnerabilities and implementing remediation strategies.\n    > Developed detailed risk assessment reports based on findings from MITRE ATT&CK framework analysis.`}></pre>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["MITRE ATT&CK", "Risk Assessment", "Pen Testing"].map((tag, j) => (
                    <span key={j} className="text-xs font-mono px-2 py-1 uppercase rounded" style={{ border: "1px solid var(--border)", color: "var(--accent)", backgroundColor: "var(--accent-dim)" }}>{tag}</span>
                  ))}
                </div>
                <a href="https://github.com/Donthularohith" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 border transition-colors terminal-hover" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  View on GitHub
                </a>
              </TerminalCard>
            </div>

            {/* Project 2 - ZTEV */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/ztev_project.py">
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/ztev.svg" alt="Zero Trust Electronic Voting System" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] Zero Trust Electronic Voting System (ZTEV)</h4>
                <pre className="terminal-type force-type text-sm whitespace-pre-wrap font-mono leading-relaxed mb-4" data-text={`    > Developed and deployed a Zero Trust Electronic Voting System (ZTEV) to mitigate security risks from BYOD and limited device monitoring.\n    > Integrated multi-factor authentication (MFA), blockchain audit logs, and AES-256 encryption.\n    > Configured Snort IDS for real-time threat monitoring and implemented Zero Trust Network Access (ZTNA) policies.`}></pre>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Blockchain", "AES-256", "Snort IDS", "ZTNA"].map((tag, j) => (
                    <span key={j} className="text-xs font-mono px-2 py-1 uppercase rounded" style={{ border: "1px solid var(--border)", color: "var(--accent)", backgroundColor: "var(--accent-dim)" }}>{tag}</span>
                  ))}
                </div>
                <a href="https://github.com/Donthularohith" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 border transition-colors terminal-hover" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  View on GitHub
                </a>
              </TerminalCard>
            </div>

            {/* Project 3 - IoT Healthcare */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/pmrss_healthcare.py">
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/iot-health.svg" alt="IoT Healthcare Privacy Scheme" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] IoT Healthcare Privacy Scheme (PMRSS)</h4>
                <pre className="terminal-type force-type text-sm whitespace-pre-wrap font-mono leading-relaxed mb-4" data-text={`    > Led a team of 3 members to develop a Privacy-preserving Medical Record Searching Scheme for Intelligent Diagnosis in IoT Healthcare.\n    > Ensured strict compliance with HIPAA requirements, guaranteeing untraceable use of medical data.`}></pre>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["IoT", "HIPAA", "Privacy", "Encryption"].map((tag, j) => (
                    <span key={j} className="text-xs font-mono px-2 py-1 uppercase rounded" style={{ border: "1px solid var(--border)", color: "var(--accent)", backgroundColor: "var(--accent-dim)" }}>{tag}</span>
                  ))}
                </div>
                <a href="https://github.com/Donthularohith" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 border transition-colors terminal-hover" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  View on GitHub
                </a>
              </TerminalCard>
            </div>

            {/* Project 4 - FBI Crime Analysis */}
            <div className="reveal-on-scroll">
              <TerminalCard title="rohith@kali:~/projects/fbi_crime_ml.py">
                <div className="mb-4 -mx-4 -mt-2 overflow-hidden rounded" style={{ border: "1px solid var(--border)" }}>
                  <img src="/projects/fbi-crime.svg" alt="FBI Crime Analysis" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <h4 className="text-xl font-bold mb-2 neon-glow">[+] FBI Crime Analysis and Prediction</h4>
                <pre className="terminal-type force-type text-sm whitespace-pre-wrap font-mono leading-relaxed mb-4" data-text={`    > Improved project organization in an FBI Crime Analysis and Prediction project using Machine Learning.\n    > Developed models achieving 90% accuracy in predicting crime rates, enabling proactive responses to high-crime areas.`}></pre>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Machine Learning", "Data Analysis", "Python"].map((tag, j) => (
                    <span key={j} className="text-xs font-mono px-2 py-1 uppercase rounded" style={{ border: "1px solid var(--border)", color: "var(--accent)", backgroundColor: "var(--accent-dim)" }}>{tag}</span>
                  ))}
                </div>
                <a href="https://github.com/Donthularohith" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 border transition-colors terminal-hover" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  View on GitHub
                </a>
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
                <a href="mailto:Donthula.rohith04@gmail.com" className="transition-colors terminal-hover" style={{ color: "var(--text)" }}>Donthula.rohith04@gmail.com</a>
                <a href="tel:9295347832" className="transition-colors terminal-hover" style={{ color: "var(--text)" }}>(929) 534-7832</a>
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
