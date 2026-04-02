import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { OrganizationJsonLd } from "@/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://safetydocspro.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SafetyDocs Pro - AI-Powered OSHA Compliance Documents",
    template: "%s | SafetyDocs Pro",
  },
  description:
    "Generate professional OSHA toolbox talks, Job Safety Analyses (JSA), and Site-Specific Safety Plans for residential construction subcontractors. AI-powered, instant PDF download.",
  keywords: [
    "OSHA compliance",
    "toolbox talks",
    "job safety analysis",
    "JSA",
    "SSSP",
    "construction safety",
    "safety documents",
    "residential construction",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "SafetyDocs Pro",
    title: "SafetyDocs Pro - AI-Powered OSHA Compliance Documents",
    description:
      "Generate professional OSHA compliance documents for residential construction subcontractors. Instant PDF download.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafetyDocs Pro - AI-Powered OSHA Compliance Documents",
    description:
      "Generate professional OSHA compliance documents for residential construction. Instant PDF download.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <OrganizationJsonLd
          name="SafetyDocs Pro"
          url={BASE_URL}
          description="AI-powered OSHA compliance document generator for residential construction subcontractors."
        />
        {children}
      </body>
    </html>
  );
}
