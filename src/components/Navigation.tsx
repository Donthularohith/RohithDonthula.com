"use client";

import { useState, useEffect } from "react";

const navItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
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

        navItems.forEach(({ href }) => {
            const id = href.replace("#", "");
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
            {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                    <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className="group flex flex-row-reverse items-center"
                    >
                        {/* Dot */}
                        <div
                            className={`rounded-full transition-all duration-300 ${isActive
                                ? "w-3 h-3 sm:w-4 sm:h-4 scale-125"
                                : "w-2 h-2 sm:w-3 sm:h-3 group-hover:scale-125"
                                }`}
                            style={{
                                backgroundColor: isActive ? "var(--accent)" : "var(--text-dim)",
                                boxShadow: isActive ? "0 0 12px var(--accent)" : "none",
                            }}
                        />

                        {/* Label Pill */}
                        <span
                            className={`mr-4 translate-x-4 transition-all duration-300 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full whitespace-nowrap ${isActive
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                }`}
                            style={{
                                backgroundColor: "var(--accent)",
                                color: "var(--bg)",
                            }}
                        >
                            0{index} // {item.label}
                        </span>
                    </a>
                );
            })}
        </nav>
    );
}
