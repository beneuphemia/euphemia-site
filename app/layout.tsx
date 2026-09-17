import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  keywords: site.meta.keywords,
  openGraph: {
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="noise-overlay font-sans antialiased selection:bg-[#C9A84C]/25 selection:text-[#FAFBFF]">
        {children}
      </body>
    </html>
  );
}
