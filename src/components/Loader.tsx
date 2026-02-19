"use client";

import { useEffect, useState, useRef } from "react";

const ASCII_ART = `
██████╗ ██████╗ 
██╔══██╗██╔══██╗
██████╔╝██║  ██║
██╔══██╗██║  ██║
██║  ██║██████╔╝
╚═╝  ╚═╝╚═════╝ 
`;

const BOOT_LOGS = [
    "[OK] Loading kernel modules...",
    "[OK] Mounting encrypted volumes...",
    "[OK] Verifying security protocols...",
    "[OK] Establishing secure connection...",
    "[OK] System ready. Welcome, operator.",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;

        const runBoot = async () => {
            // Type out each boot log line with a delay
            for (let i = 0; i < BOOT_LOGS.length; i++) {
                if (cancelled) return;
                await new Promise((resolve) => setTimeout(resolve, 500));
                setLogs((prev) => [...prev, BOOT_LOGS[i]]);
                setProgress(Math.round(((i + 1) / BOOT_LOGS.length) * 100));
            }

            // Hold for a moment, then complete
            await new Promise((resolve) => setTimeout(resolve, 600));
            if (!cancelled) {
                setIsComplete(true);
                setTimeout(onComplete, 500);
            }
        };

        runBoot();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleSkip = () => {
        setIsComplete(true);
        onComplete();
    };

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono p-4"
            style={{
                backgroundColor: "#050505",
                color: "#00FF41",
            }}
        >
            <div className="w-full max-w-lg space-y-8">

                {/* ASCII Art */}
                <pre
                    className="text-xs sm:text-sm leading-none opacity-0"
                    style={{
                        color: "#00FF41",
                        textShadow: "0 0 10px rgba(0, 255, 65, 0.6)",
                        animation: "fadeIn 0.5s ease-out forwards",
                    }}
                >
                    {ASCII_ART}
                </pre>

                {/* Metadata Bar */}
                <div
                    className="flex justify-between pb-2 text-xs uppercase tracking-widest opacity-0"
                    style={{
                        borderBottom: "1px solid #008F11",
                        animation: "fadeIn 0.5s ease-out 0.3s forwards",
                    }}
                >
                    <span>boot_sequence.sh</span>
                    <span>rd@sec-ops</span>
                </div>

                {/* Boot Logs */}
                <div className="h-36 overflow-hidden font-mono text-xs sm:text-sm space-y-1.5">
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className="flex gap-2 fade-in"
                            style={{
                                color: log.includes("System ready") ? "#00FF41" : "#008F11",
                            }}
                        >
                            <span style={{ color: "#00FF41" }}>➜</span>
                            <span>{log}</span>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="text-right text-xs font-bold" style={{ color: "#00FF41" }}>
                        {progress}%
                    </div>
                    <div
                        className="h-1 w-full relative overflow-hidden"
                        style={{ backgroundColor: "#0a0a0a", border: "1px solid #008F11" }}
                    >
                        <div
                            className="absolute inset-y-0 left-0 transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: "#00FF41",
                                boxShadow: "0 0 10px rgba(0, 255, 65, 0.6)",
                            }}
                        />
                    </div>
                </div>

                {/* Skip Button */}
                <button
                    onClick={handleSkip}
                    className="text-xs transition-colors uppercase tracking-widest mt-8 animate-pulse cursor-pointer"
                    style={{ color: "#008F11" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#00FF41"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#008F11"; }}
                >
                    [ Click to Skip ]
                </button>

            </div>
        </div>
    );
}
