"use client";
import { useEffect, useRef } from "react";

interface Line {
    x: number;
    y: number;
    angle: number;
    speed: number;
    length: number;
    opacity: number;
    curve: number;
}

export default function BackgroundCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const onResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", onResize);

        // Create gently drifting lines
        const lines: Line[] = [];
        const LINE_COUNT = 12;

        for (let i = 0; i < LINE_COUNT; i++) {
            lines.push({
                x: Math.random() * w,
                y: Math.random() * h,
                angle: Math.random() * Math.PI * 2,
                speed: 0.15 + Math.random() * 0.25,
                length: 120 + Math.random() * 200,
                opacity: 0.03 + Math.random() * 0.04,
                curve: (Math.random() - 0.5) * 0.005,
            });
        }

        let raf: number;

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // Check if terminal mode is active
            const isTerminal = document.body.classList.contains("terminal-view");
            const strokeColor = isTerminal
                ? "rgba(0, 255, 65,"
                : "rgba(37, 99, 235,";

            for (const line of lines) {
                // Update
                line.angle += line.curve;
                line.x += Math.cos(line.angle) * line.speed;
                line.y += Math.sin(line.angle) * line.speed;

                // Wrap around
                if (line.x < -100) line.x = w + 100;
                if (line.x > w + 100) line.x = -100;
                if (line.y < -100) line.y = h + 100;
                if (line.y > h + 100) line.y = -100;

                // Draw curved line
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);

                const steps = 6;
                let cx = line.x;
                let cy = line.y;
                let a = line.angle;
                const segLen = line.length / steps;

                for (let s = 0; s < steps; s++) {
                    a += line.curve * 8;
                    const nx = cx + Math.cos(a) * segLen;
                    const ny = cy + Math.sin(a) * segLen;
                    ctx.lineTo(nx, ny);
                    cx = nx;
                    cy = ny;
                }

                ctx.strokeStyle = `${strokeColor} ${line.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}
