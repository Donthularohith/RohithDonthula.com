"use client";

import { useState, useEffect } from "react";

export default function ModeToggle() {
    const [isTerminalView, setIsTerminalView] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
        <button
            onClick={toggleMode}
            id="mode-toggle"
            className="fixed top-4 right-4 z-[9999] px-4 py-2 border font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
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
            {isTerminalView ? "[ RUN recruiter_mode.exe ]" : "[ RUN hacker_mode.exe ]"}
        </button>
    );
}
