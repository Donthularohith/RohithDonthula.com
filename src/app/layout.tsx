import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import CustomCursor from "@/components/CustomCursor";
import BackgroundCanvas from "@/components/BackgroundCanvas";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohith Donthula | Cyber Security Analyst",
  description:
    "Rohith Donthula — Cyber Security Analyst with 3+ years of experience in offensive security testing, detection engineering, and incident response across healthcare (Cerner) and financial (Capgemini) infrastructures. CompTIA Security+ CE, CySA+ certified. Pursuing OSCP & CISSP.",
  keywords: [
    "cybersecurity analyst",
    "penetration testing",
    "incident response",
    "SIEM",
    "Splunk",
    "MITRE ATT&CK",
    "cloud security",
    "detection engineering",
    "Rohith Donthula",
  ],
  icons: {
    icon: "/shield-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} ${inter.variable} antialiased`}
      >
        <BackgroundCanvas />
        <CustomCursor />
        <div className="vignette"></div>
        <div className="texture-overlay"></div>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
