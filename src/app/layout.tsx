import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Divyansh Singh - Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with expertise in React, TypeScript, and modern web technologies",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Software Engineer",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="shortcut icon"
          href="/Portfolio-v5/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/Portfolio-v5/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${dmSans.className} bg-[rgb(245,240,232)] text-[rgb(15,14,12)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
