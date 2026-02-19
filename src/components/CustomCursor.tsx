"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const trailPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", onMove);

        let raf: number;
        const animate = () => {
            // Cursor follows instantly
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
            }
            // Trail follows with lag
            trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.15;
            trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.15;
            if (trailRef.current) {
                trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
            }
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            {/* Crosshair cursor */}
            <div
                ref={cursorRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "20px",
                    height: "20px",
                    marginLeft: "-10px",
                    marginTop: "-10px",
                    pointerEvents: "none",
                    zIndex: 99999,
                    mixBlendMode: "difference",
                }}
            >
                {/* Vertical line */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "0",
                        width: "1px",
                        height: "100%",
                        backgroundColor: "#00FF41",
                        transform: "translateX(-50%)",
                    }}
                />
                {/* Horizontal line */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "0",
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#00FF41",
                        transform: "translateY(-50%)",
                    }}
                />
            </div>

            {/* Trail dot */}
            <div
                ref={trailRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "36px",
                    height: "36px",
                    marginLeft: "-18px",
                    marginTop: "-18px",
                    borderRadius: "50%",
                    border: "1px solid rgba(0, 255, 65, 0.3)",
                    pointerEvents: "none",
                    zIndex: 99998,
                    mixBlendMode: "difference",
                    transition: "width 0.2s, height 0.2s",
                }}
            />
        </>
    );
}
