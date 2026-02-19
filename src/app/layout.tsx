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
  title: "Rohith Donthula | Cybersecurity Specialist",
  description:
    "Rohith Donthula – Cybersecurity specialist with experience in incident response, risk management, penetration testing, and cloud security. Open to internships and full-time security roles.",
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
