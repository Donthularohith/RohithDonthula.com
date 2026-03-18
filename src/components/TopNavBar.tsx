"use client";

import { useState, useEffect } from "react";

const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "IMPACT", href: "#impact" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
];

export default function TopNavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isTerminalView, setIsTerminalView] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // IntersectionObserver for active section tracking
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );

        navLinks.forEach(({ href }) => {
            const id = href.replace("#", "");
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.getElementById(href.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    };

    const toggleMode = () => {
        const next = !isTerminalView;
        setIsTerminalView(next);
        if (next) {
            document.body.classList.add("terminal-view");
        } else {
            document.body.classList.remove("terminal-view");
        }
    };

    if (!mounted) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${scrolled
                ? "py-3 backdrop-blur-xl"
                : "py-5"
                }`}
            style={{
                backgroundColor: scrolled
                    ? (isTerminalView ? "rgba(5, 5, 5, 0.85)" : "rgba(250, 250, 250, 0.85)")
                    : "transparent",
                borderBottom: scrolled
                    ? "1px solid var(--border)"
                    : "1px solid transparent",
            }}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {/* Left: Name / Logo */}
                <a
                    href="#home"
                    onClick={(e) => handleClick(e, "#home")}
                    className="font-mono font-bold text-sm tracking-widest uppercase transition-colors"
                    style={{ color: "var(--text)" }}
                >
                    ROHITH<span style={{ color: "var(--accent)" }}>.</span>DONTHULA
                </a>

                {/* Center: Nav Links (hidden on mobile) */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((item) => {
                        const isActive = activeSection === item.href.replace("#", "");
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className="font-mono text-[10px] tracking-widest uppercase transition-all duration-300 relative"
                                style={{
                                    color: isActive ? "var(--accent)" : "var(--text-dim)",
                                    textShadow: isActive && isTerminalView ? "0 0 8px rgba(0, 255, 65, 0.4)" : "none",
                                }}
                            >
                                {item.label}
                                {isActive && (
                                    <span
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] transition-all duration-300"
                                        style={{ backgroundColor: "var(--accent)" }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Mode Toggle */}
                    <button
                        onClick={toggleMode}
                        id="mode-toggle"
                        className="px-4 py-2 border font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer"
                        style={{
                            borderColor: "var(--accent)",
                            color: "var(--accent)",
                            backgroundColor: "var(--accent-dim)",
                            textShadow: isTerminalView ? "0 0 8px rgba(0, 255, 65, 0.4)" : "none",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--accent)";
                            e.currentTarget.style.color = "var(--bg)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--accent-dim)";
                            e.currentTarget.style.color = "var(--accent)";
                        }}
                    >
                        {isTerminalView ? "[ recruiter_mode ]" : "[ hacker_mode ]"}
                    </button>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        <span className="w-5 h-0.5 transition-all duration-300" style={{
                            backgroundColor: "var(--accent)",
                            transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none"
                        }}></span>
                        <span className="w-5 h-0.5 transition-all duration-300" style={{
                            backgroundColor: "var(--accent)",
                            opacity: mobileOpen ? 0 : 1
                        }}></span>
                        <span className="w-5 h-0.5 transition-all duration-300" style={{
                            backgroundColor: "var(--accent)",
                            transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none"
                        }}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden mt-2 mx-6 p-4 rounded-lg backdrop-blur-xl" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                    <nav className="flex flex-col gap-3">
                        {navLinks.map((item) => {
                            const isActive = activeSection === item.href.replace("#", "");
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href)}
                                    className="font-mono text-xs tracking-widest uppercase py-2 px-3 rounded transition-all duration-300"
                                    style={{
                                        color: isActive ? "var(--accent)" : "var(--text-dim)",
                                        backgroundColor: isActive ? "var(--accent-dim)" : "transparent",
                                    }}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}
