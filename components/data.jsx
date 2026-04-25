/* eslint-disable no-undef */
const { useState, useEffect, useRef } = React;

const T = window.useTweaks ? null : null; // placeholder

// Data
const PROJECTS = [
  {
    title: "Penetration Testing & Threat Intelligence Capstone",
    subtitle: "Team Lead · IIIT Bangalore · Capstone",
    classification: "TLP:AMBER",
    status: "DECLASSIFIED",
    stampColor: "amber",
    objective: "Lead a red-team engagement against simulated enterprise apps; map findings to MITRE ATT&CK and produce executive-grade risk reports.",
    outcome: "Delivered a 40-page threat intel report identifying 12 critical, 18 high vulns. Remediation playbook adopted by the program for subsequent cohorts.",
    steps: [
      "Scoped engagement boundaries with stakeholders; defined ROE",
      "Recon with Nmap + custom enumeration scripts",
      "Exploited OWASP Top-10 surface via Burp Suite",
      "Mapped TTPs to MITRE ATT&CK matrix (T1190, T1059, T1078)",
      "Authored remediation roadmap prioritized by CVSS + business impact",
    ],
    stack: ["MITRE ATT&CK", "Burp Suite", "Nmap", "Metasploit", "Kali", "OWASP Top 10"],
    metrics: [
      { value: "12", label: "CRIT FINDINGS" },
      { value: "40pp", label: "REPORT" },
      { value: "T1", label: "TEAM LEAD" },
    ],
  },
  {
    title: "Zero Trust Electronic Voting System (ZTEV)",
    subtitle: "Research grant · Advanced Cyber Cert · IIIT-B",
    classification: "TLP:RED",
    status: "OPERATIONAL",
    stampColor: "accent",
    objective: "Mitigate BYOD voting risks with a Zero Trust architecture: continuous verification, blockchain-backed audit, and AES-256 ballot envelopes.",
    outcome: "Working prototype with MFA, immutable audit log, and Snort-monitored ZTNA. Secured a research grant for continued development.",
    steps: [
      "Threat-modeled BYOD voting against STRIDE",
      "Designed ZTNA policy graph; implemented per-request reauthentication",
      "Layered AES-256 envelope encryption over ballot payloads",
      "Wired blockchain audit log for tamper evidence",
      "Tuned Snort IDS rules for ZTNA traffic anomalies",
    ],
    stack: ["Zero Trust", "Blockchain", "AES-256", "Snort IDS", "MFA", "ZTNA"],
    metrics: [
      { value: "AES-256", label: "ENVELOPE" },
      { value: "MFA", label: "ENFORCED" },
      { value: "GRANT", label: "AWARDED" },
    ],
  },
  {
    title: "PMRSS — Privacy-Preserving Medical Record Search (IoT)",
    subtitle: "Team Lead · Capstone · 3-engineer team",
    classification: "TLP:AMBER",
    status: "DELIVERED",
    stampColor: "signal",
    objective: "Enable searchable encrypted medical records over IoT diagnostics under strict HIPAA compliance — no plaintext leak at any node.",
    outcome: "Searchable scheme delivered with untraceable query patterns; passed compliance review for capstone evaluation.",
    steps: [
      "Modeled HIPAA-aligned threat surface for IoT diagnostics",
      "Designed searchable-encryption scheme with index-side blinding",
      "Built proof-of-concept service in Python + Flask",
      "Validated end-to-end with synthetic patient corpus",
    ],
    stack: ["HIPAA", "IoT", "Searchable Encryption", "Python", "Flask"],
    metrics: [
      { value: "HIPAA", label: "COMPLIANT" },
      { value: "0", label: "PLAINTEXT LEAKS" },
      { value: "T3", label: "TEAM SIZE" },
    ],
  },
  {
    title: "FBI Crime Analysis & Prediction (ML)",
    subtitle: "Mini-Project Team Lead",
    classification: "TLP:GREEN",
    status: "ARCHIVED",
    stampColor: "signal",
    objective: "Forecast crime hot-spots from open FBI datasets and surface actionable signals for proactive resource allocation.",
    outcome: "Models reached 90% accuracy on regional crime-rate prediction; presentation included a hot-spot map and intervention suggestions.",
    steps: [
      "Cleaned & feature-engineered FBI crime dataset",
      "Benchmarked logistic regression vs. random forest vs. GBM",
      "Cross-validated; final model at 90% accuracy",
      "Visualized hot-spots on a regional heatmap",
    ],
    stack: ["Python", "scikit-learn", "pandas", "Data Viz"],
    metrics: [
      { value: "90%", label: "ACCURACY" },
      { value: "5", label: "MODELS BENCHED" },
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Security Operations Center Analyst",
    company: "Security Validation | SecVal MSSP",
    location: "New Jersey, United States",
    from: "APR 2026",
    to: "PRESENT",
    current: true,
    bullets: [
      "Monitor and analyze security events across client environments using Stellar Cyber Open XDR and SIEM platforms to detect, triage, and respond to threats in real time.",
      "Leverage CrowdStrike Falcon for endpoint threat detection, investigation, and containment across client infrastructures.",
      "Support PCI DSS compliance monitoring for hospitality industry clients, ensuring cardholder data environments meet regulatory security standards.",
      "Perform alert investigation and incident response, correlating IOCs and TTPs against the MITRE ATT&CK framework.",
      "Conduct vulnerability assessments and communicate findings with actionable remediation guidance to clients.",
      "Tune detection rules and SIEM use cases to reduce false positives and improve signal fidelity.",
      "Collaborate cross-functionally to strengthen client security postures through continuous monitoring and threat intelligence integration.",
    ],
    tags: ["Stellar Cyber Open XDR", "SIEM", "CrowdStrike Falcon", "PCI DSS", "MITRE ATT&CK", "Incident Response", "Threat Intel"],
  },
  {
    role: "Cyber Security Analyst — Purple Team",
    company: "Cerner Healthcare Private Limited",
    location: "United States",
    from: "JUN 2025",
    to: "MAR 2026",
    current: false,
    bullets: [
      "Operated as a purple-team analyst across Cerner EHR environments — emulated adversary TTPs (red) and hardened detections (blue) in the same sprint, ensuring 100% alignment with HIPAA and healthcare security standards.",
      "Built centralized log aggregation across clinical apps, cloud platforms, and IAM — significantly increasing visibility and early threat identification.",
      "Improved MTTD by ~30% by developing automated detections tuned to healthcare-specific threats, ensuring EHR system integrity.",
      "Ran continuous vulnerability assessments using Tenable.io — prioritized remediation based on CVSS and clinical-risk impact to safeguard sensitive patient data.",
      "Tuned email security and DLP policies — mitigating phishing and BEC attacks while preventing unauthorized transmission of PHI across endpoints and cloud services.",
      "Partnered with cross-functional teams to enhance detection logic and response playbooks without disrupting critical patient-care workflows.",
    ],
    tags: ["Purple Team", "Splunk", "Sigma", "Tenable", "Proofpoint", "Forcepoint DLP", "CrowdStrike", "MITRE ATT&CK", "HIPAA", "EHR"],
  },
  {
    role: "Cyber Security Engineer",
    company: "Capgemini",
    location: "India",
    from: "JUN 2021",
    to: "JUL 2024",
    current: false,
    bullets: [
      "Integrated SIEM with financial transaction logs and ATM switches — built correlation rules that accelerated detection of fraud and insider misuse.",
      "Segmented SWIFT and payment networks by deploying NGFW and IDS/IPS; implemented RBAC and MFA to reduce the attack surface.",
      "Designed PCI-DSS and GDPR data-protection strategies — encryption, tokenization, and access controls — passing audits with zero major findings.",
      "Conducted pentests of online banking platforms using Burp Suite and OWASP methodology — identified and remediated critical SQLi and XSS vulnerabilities.",
      "Hardened payment gateways and APIs; partnered with risk teams to close audit gaps ahead of regulatory deadlines.",
      "Rolled out DLP across cloud and endpoints — automated compliance reporting and prevented unauthorized transfers of sensitive financial data.",
      "Improved forensic turnaround ~75% through expert use of EnCase and FTK — delivered litigation-ready reports for legal and compliance stakeholders.",
    ],
    tags: ["IBM QRadar", "Palo Alto NGFW", "Cisco ASA", "Burp Suite", "EnCase", "FTK", "PCI-DSS", "GDPR", "SWIFT"],
  },
];

const CERTS = [
  { year: "2026", name: "MS Cybersecurity (Expected)", issuer: "Yeshiva University · Aug 2024 – May 2026", status: "in-progress" },
  { year: "2024", name: "CompTIA CySA+ (Security Analytics)", issuer: "CompTIA · CSAP Stackable", status: "achieved" },
  { year: "2024", name: "CompTIA Security+ CE", issuer: "CompTIA · SY0-701", status: "achieved" },
  { year: "2024", name: "Cybersecurity Coursework", issuer: "IIIT Bangalore · Aug 2023 – Mar 2024", status: "achieved" },
  { year: "2023", name: "Tata Group Cybersecurity Analyst — Job Simulation", issuer: "Forage", status: "achieved" },
  { year: "2023", name: "Google Cybersecurity Professional", issuer: "Coursera · Foundations + Manage Risks + Tools of the Trade", status: "achieved" },
  { year: "2023", name: "B.Tech Computer Science & Engineering", issuer: "Malla Reddy Institute of Technology · Jun 2019 – Jul 2023", status: "achieved" },
];

const TESTIMONIALS = [
  {
    quote: "Methodical, calm under fire, and the rare analyst who writes incident reports leadership actually reads.",
    by: "Senior SOC Lead",
    org: "Healthcare · referenced",
  },
  {
    quote: "Took a vague threat-hunting brief and shipped Sigma rules that paid for themselves in a week.",
    by: "Detection Engineering Manager",
    org: "Financial Services",
  },
  {
    quote: "Treats every audit like a research problem. Closed gaps that had been open for two compliance cycles.",
    by: "Compliance & Risk Director",
    org: "Capstone Engagement",
  },
];

const NEWS = [
  { tag: "BLOG", title: "Tuning Splunk for EHR — three correlation rules that pulled their weight", read: "6 min" },
  { tag: "NOTE", title: "From Burp dry-run to executive risk memo: a translator's playbook", read: "4 min" },
  { tag: "TALK", title: "MITRE ATT&CK in healthcare: mapping clinical APT chains", read: "12 min" },
  { tag: "BLOG", title: "Zero Trust on a hospital LAN: the realistic version", read: "8 min" },
];

Object.assign(window, { PROJECTS, EXPERIENCE, CERTS, TESTIMONIALS, NEWS });
