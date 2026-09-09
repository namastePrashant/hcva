import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import { SiteJsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_ORIGIN } from "./seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Humanitarian CVA | Digital Systems, Advisory & Knowledge";
const DESCRIPTION =
  "Aria Technologies’ global platform for Cash and Voucher Assistance digital services, consulting, Lali360 tools, learning, and sector knowledge.";

export async function generateMetadata(): Promise<Metadata> {
  // Prefer the request host so the .com domain and preview URLs resolve their
  // own absolute links, but fall back to the canonical production origin.
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : SITE_ORIGIN;
  const socialImage = "/og-hcva.png";

  return {
    metadataBase: new URL(origin),
    title: TITLE,
    description: DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: "Aria Technologies" }],
    creator: "Aria Technologies",
    publisher: "Aria Technologies",
    category: "Humanitarian technology",
    keywords: [
      "Cash and Voucher Assistance",
      "CVA",
      "humanitarian cash",
      "digital payments",
      "Lali360",
      "cash preparedness",
      "anticipatory action",
      "Nepal",
      "South Asia",
      "Aria Technologies",
    ],
    alternates: { canonical: "/" },
    formatDetection: { telephone: false, address: false, email: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: "/",
      type: "website",
      siteName: SITE_NAME,
      locale: "en",
      images: [
        {
          url: socialImage,
          width: 1731,
          height: 909,
          alt: "Humanitarian CVA — The global home for humanitarian cash.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#861f24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <SiteJsonLd />
      </body>
    </html>
  );
}
