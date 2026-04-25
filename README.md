# Handoff: Rohith Donthula — Cybersecurity Portfolio

## Overview
A personal portfolio site for **Rohith Donthula**, a purple‑team cybersecurity analyst. The design is positioned as a "Dossier OS" — an intelligence‑agency / classified‑file aesthetic, with a tri‑mode toggle so the same site can present as a polished dossier (default), a phosphor terminal (full hacker mode), or a recruiter‑friendly clean layout.

The bundle includes the working HTML prototype, all JSX component sources, the design‑token CSS, and the assets (profile photo, cert badge, shield icon).

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly.

The implementation task is to **recreate this prototype in your target codebase**:
- If the live site is **Next.js / React** (which it is — `rohithdonthula.com`), port each component into a proper component file, move design tokens into your existing token system (Tailwind config, CSS vars, or theme provider), and split the long monolithic JSX files at logical seams.
- If you don't have a framework yet, Next.js + Tailwind is the natural fit — every component here is already React.

The HTML prototype loads React + Babel from a CDN at runtime; the production version should compile.

## Fidelity
**High‑fidelity.** Final colors, typography, spacing, and interactions are all decided. Recreate it pixel‑close.

## Modes (tri‑mode toggle)
The page exposes a Tweaks panel (bottom‑right). The three core modes are driven by `body[data-mode="..."]`:

| Mode | Trigger | Use |
|---|---|---|
| `dossier` | default | Dark ink + parchment ink + classified‑red accent. Intelligence‑agency feel. |
| `terminal` | toggle | Full phosphor‑green CRT — type, accent, signals all green on near‑black. |
| `recruiter` | toggle | Light, ATS‑friendly, blue accent, minimal motifs. |

Other body data‑attributes:
- `data-density` — `compact` / `roomy` (default) / `airy` — drives `--pad-x`, `--pad-y`, `--gutter`.
- `data-bg` — `grid` (default) / `grain` / `scan` / `none` — picks the background motif.
- `data-cursor` — `on` / `off` — custom crosshair cursor.

The Tweaks panel persists changes via the `__edit_mode_set_keys` postMessage protocol; in production you'll likely drop the panel and just default to `dossier` (or save preference in `localStorage`).

## Sections (top → bottom)
Each section is one element in `app.jsx`. Order is fixed; copy is final.

1. **ClassifiedHeader** — top bar. Mono caption: `DOSSIER #882‑991 · DEPT/CYBERSEC · TLP:AMBER · RD‑0001`. Right‑side nav links to anchors.
2. **Hero** — split layout: left = oversized name, role, lede, CTAs; right = "dossier card" with photo, crosshair overlay, KV table (Subject, Discipline, Specialization, Sector, Education, Status), 4‑up stat strip (4+ yrs, 30% MTTD, 75% forensics, 100% audits). The dossier card title (`dossier://subject/RD-0001`) uses the `<TypeURL>` component — scrambles in, types out, blinks caret, re‑runs every 6s.
3. **BriefMarquee (variant a)** — horizontally scrolling mono ticker (`INTELLIGENCE GATHERED · AUDIT COMPLETE · ...`).
4. **About** — `001 / Subject Brief`. Three‑paragraph `brief.md` panel (purple‑team positioning) + side panel with Frameworks, Field Achievements, Education.
5. **ExperienceSection** — `002 / Service Record`. Timeline with active‑node pulse. Three roles (see Content section below).
6. **BriefMarquee (variant b)**.
7. **ProjectsSection** — `003 / Operations`. Click‑to‑expand case‑study cards (objective, outcome, op log, stack, metrics).
8. **CapabilitySection** — `004 / Capabilities`. **MITRE ATT&CK matrix** (6 tactics × 3 techniques, hover readout) + **interactive force‑graph** of skills (hover focuses neighbors) + recent‑activity log.
9. **CertsAndTestimonials** — `005 / Verifications`. Certifications timeline + 3 testimonial cards.
10. **BriefMarquee (variant c)**.
11. **NewsSection** — `006 / Field Notes`. Blog/talk cards.
12. **Contact** — `007 / Open A Channel`. Encrypted‑line panel + availability strip.
13. **Footer**.

## Content (canonical — source of truth)

### Hero
- Name: **Rohith Donthula**
- Role line: **Purple‑Team Cybersecurity Analyst** · NYC Metro
- Lede mentions: purple‑team ops, currently securing client environments at SecVal MSSP under PCI DSS.

### Subject Brief (`brief.md`)
Three paragraphs — see `app.jsx` `About()` for exact copy. Key claims:
- MS Cybersecurity at Yeshiva University (expected May 2026)
- CompTIA Security+ and CySA+ certified
- Currently SOC analyst at SecVal MSSP
- Ex‑Cerner Healthcare, Ex‑Capgemini

### Experience (in `components/data.jsx` → `EXPERIENCE`)
Three roles, in this order:
1. **Security Operations Center Analyst** — Security Validation | SecVal MSSP — Apr 2026–Present, NJ
2. **Cyber Security Analyst — Purple Team** — Cerner Healthcare — Jun 2025–Mar 2026
3. **Cyber Security Engineer** — Capgemini — Jun 2021–Jul 2024, India

### Education / Certs (in `components/data.jsx` → `CERTS`)
- MS Cybersecurity, Yeshiva University (expected May 2026)
- CompTIA CySA+, Security+
- IIIT Bangalore Cybersecurity (2023–2024)
- Tata Group Cybersecurity Job Simulation
- Google Cybersecurity Professional
- B.Tech CSE, Malla Reddy Institute of Technology (2019–2023)

### Projects, Testimonials, News
All in `components/data.jsx`. Testimonials and news titles are placeholders — swap with real content before launch.

## Design Tokens

### Colors (oklch — see `styles/design-system.css` `:root`)

**Dossier (default):**
| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(0.16 0.012 250)` | Page background |
| `--bg-elev` | `oklch(0.20 0.014 250)` | Panel surface |
| `--bg-deep` | `oklch(0.11 0.010 250)` | Inset / deep wells |
| `--ink` | `oklch(0.96 0.008 80)` | Primary text (parchment white) |
| `--ink-dim` | `oklch(0.74 0.012 80)` | Body copy |
| `--ink-mute` | `oklch(0.52 0.010 250)` | Mono labels, captions |
| `--accent` | `oklch(0.66 0.20 25)` | **Classified red** — primary accent |
| `--amber` | `oklch(0.78 0.16 80)` | Stamps / amber alerts |
| `--signal` | `oklch(0.78 0.18 145)` | Green status dots |
| `--rule` | `oklch(0.96 0.008 80 / 0.14)` | Hairlines |
| `--rule-strong` | `oklch(0.96 0.008 80 / 0.28)` | Stronger hairlines |

**Terminal mode** swaps to phosphor green (`#6affa0` accent on `#050a05` bg).
**Recruiter mode** swaps to a clean light theme with `oklch(0.55 0.18 255)` blue accent.

### Typography
- Display: **Space Grotesk** (300/400/500/600/700)
- Mono: **JetBrains Mono** (300/400/500/700)
- Sans: **Inter** (300/400/500/600)
- Loaded from Google Fonts in `design-system.css`.

Type usage:
- Section labels (`001 / Brief`) — JetBrains Mono, 11px, letter‑spacing 0.2em, `--ink-mute`
- Section H2 — Space Grotesk 56–80px, weight 500, tight letter‑spacing
- Body — Inter 16–18px, `--ink-dim`
- KV tables, badges, terminal lines — JetBrains Mono 11–13px

### Spacing
Density‑driven (controlled by `body[data-density]`):
- Compact: `--pad-x: 18px / --pad-y: 14px / --gutter: 16px`
- Roomy (default): `28 / 22 / 24`
- Airy: `40 / 32 / 36`

### Radii
- `--radius-sm: 2px` — pills, tags
- `--radius: 4px` — panels (default)
- `--radius-lg: 6px` — large cards

Corners are intentionally **sharp** — the Dossier aesthetic uses small radii throughout.

### Background motifs (body::before)
- `grid` — 56×56 grid lines, radial mask focused on hero
- `grain` — 4×4 dot grid, opacity 0.25
- `scan` — repeating horizontal scanlines

## Notable Components / Behavior

### `<TypeURL>` (in `app.jsx`)
Animates a string with three phases: scramble (random glyphs ~700ms) → type (letter‑by‑letter ~55ms) → idle (with blinking accent caret) → loops every 6s. Used for the hero dossier panel title.

### MITRE ATT&CK matrix (`components/visualizations.jsx`)
6 tactics × 3 techniques. Cells hover‑highlight, fill the readout panel with technique ID + description. Pure CSS grid + React state — no library.

### Force graph (`components/visualizations.jsx`)
Interactive node graph of skills/tools. Slight wobble animation; hovering a node dims unrelated nodes and highlights neighbors via `<line>` SVG strokes.

### Tweaks panel (`tweaks-panel.jsx`)
Floating bottom‑right control panel. In production you'll probably **drop this entirely** and just default to dossier mode — or, if you want users to be able to switch, expose just the mode toggle in the nav.

### Reveal (`components/primitives.jsx`)
IntersectionObserver wrapper that adds an `.in` class on enter — drives the fade‑up animations on every section.

### Custom cursor
Crosshair cursor via `body[data-cursor="on"]`. Disable on touch devices.

## Assets
- `public/profile.jpg` — profile photo (replace with a fresher shot if available)
- `public/security-plus.png` — CompTIA Security+ badge
- `public/shield-icon.svg` — shield icon used in stamps/badges

## File Map
```
Rohith Donthula.html        Entry HTML — loads Babel/React + all JSX
app.jsx                     Root App, ClassifiedHeader, Hero, About, TypeURL, Footer
tweaks-panel.jsx            Tweaks panel + protocol (drop in prod)
components/
  primitives.jsx            Panel, Reveal, Stamp, Dot, etc.
  sections.jsx              ExperienceSection items, ProjectsSection, NewsSection, Contact
  visualizations.jsx        MITRE matrix, ForceGraph, ActivityLog
  data.jsx                  PROJECTS, EXPERIENCE, CERTS, TESTIMONIALS, NEWS arrays
styles/
  design-system.css         Tokens, mode overrides, primitives styling
  layout.css                Section, hero, panel layout
public/                     Images and icons
```

## Implementation Notes for Claude Code

1. **Fonts**: switch from the Google Fonts `<link>` to `next/font` for performance.
2. **Modes**: keep the `data-mode` attribute approach — it's already token‑driven. If only ever shipping one mode, drop the others to slim the CSS.
3. **Data**: move the `EXPERIENCE`, `PROJECTS`, etc. arrays out of `components/data.jsx` and into typed TS files (`data/experience.ts`) with proper interfaces.
4. **Animations**: the IntersectionObserver `Reveal` is fine; or swap for `framer-motion` if already in the codebase.
5. **MITRE matrix and ForceGraph**: self‑contained — port verbatim, just wrap with proper TS types.
6. **Resume PDF**: the resume CTA links to `resume.pdf` at site root — drop the actual PDF there.
7. **A11y pass**: the prototype has placeholder alt text on the profile image and unlabeled SVG decorations — add proper `aria-hidden` / alt text in the production build.

## Caveats
- Testimonial quotes and blog/talk titles in `data.jsx` are placeholders.
- The dossier number (`#882‑991`) and `RD‑0001` ID are decorative — keep or change.
- The "Field Achievements" stats (30% MTTD, 75% forensics) come straight from the LinkedIn profile; verify before publishing externally.
