import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Divyansh Singh - Senior Frontend Engineer",
  description: "Senior Frontend Engineer with expertise in React, TypeScript, and modern web technologies",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Software Engineer",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
