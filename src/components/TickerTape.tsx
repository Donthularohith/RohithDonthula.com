"use client";

export default function TickerTape({ text = "CLASSIFIED DOSSIER // THREAT ASSESSMENT // SECURITY CLEARANCE // VULNERABILITY SCAN // INCIDENT RESPONSE // DIGITAL FORENSICS // PENETRATION TEST // ZERO DAY // MALWARE ANALYSIS // NETWORK RECON //" }: { text?: string }) {
    // Repeat text for seamless loop
    const repeatedText = `${text} ${text} ${text}`;

    return (
        <div className="ticker-tape-wrapper">
            <div className="ticker-tape-content">
                <span>{repeatedText}</span>
            </div>
        </div>
    );
}
