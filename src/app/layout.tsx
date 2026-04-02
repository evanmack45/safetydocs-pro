import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafetyDocs Pro - AI-Powered OSHA Compliance Documents",
  description:
    "Generate professional OSHA toolbox talks and safety documents for residential construction subcontractors. AI-powered, instant PDF download.",
  keywords: [
    "OSHA compliance",
    "toolbox talks",
    "construction safety",
    "safety documents",
    "residential construction",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
