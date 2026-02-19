"use client";

import { useState, useEffect, useCallback } from "react";
import Loader from "./Loader";
import Navigation from "./Navigation";
import TopNavBar from "./TopNavBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleComplete = useCallback(() => {
        setLoading(false);
    }, []);

    // Scroll Observer for Reveal and Typing effects
    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;

                        // Handle .reveal-on-scroll (CSS fade/slide up)
                        if (target.classList.contains("reveal-on-scroll")) {
                            target.classList.add("revealed");
                            observer.unobserve(target);
                        }

                        // Handle .terminal-type (Text typing)
                        // If it's inside a reveal-on-scroll, wait for that to start?
                        // For now, just trigger if it hasn't been typed
                        if (target.classList.contains("terminal-type") && !target.hasAttribute("data-typed")) {
                            target.setAttribute("data-typed", "true");
                            const isTerminal = document.body.classList.contains("terminal-view");

                            // In terminal mode, type it out. In recruiter mode, show instantly unless forced
                            if (isTerminal || target.classList.contains("force-type")) {
                                typeElement(target);
                            } else {
                                // Instant reveal in recruiter mode for readability
                                const text = target.getAttribute("data-text") || "";
                                if (text) target.textContent = text;
                            }
                            observer.unobserve(target);
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        // Observe elements
        document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
        document.querySelectorAll(".terminal-type").forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [loading]); // Re-run when loading finishes

    const typeElement = async (el: HTMLElement) => {
        const text = el.getAttribute("data-text") || "";
        if (!text) return;

        el.textContent = "";
        const cursorSpan = document.createElement("span");
        cursorSpan.className = "cursor";
        cursorSpan.textContent = "█";
        el.appendChild(cursorSpan);

        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createTextNode(text[i]);
            el.insertBefore(charSpan, cursorSpan);
            await new Promise((resolve) => setTimeout(resolve, 30));
        }
    };

    if (!mounted) return null;

    return (
        <>
            {loading && <Loader onComplete={handleComplete} />}

            <div
                className={`transition-all duration-1000 ease-out ${loading ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
                    }`}
            >
                <TopNavBar />
                <Navigation />
                <main className="min-h-screen relative z-10">
                    {children}
                </main>
            </div>
        </>
    );
}

