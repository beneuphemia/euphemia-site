import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Euphemia — Physics-Based Drug Discovery & Solvation Science",
  description: "Computational drug discovery powered by rigorous molecular physics simulation and machine learning. Mapping cryptic binding-site water networks and solvation thermodynamics.",
  keywords: ["drug discovery", "molecular simulation", "computational chemistry", "FEP", "solvation", "water networks", "biophysics", "GCMC"],
  openGraph: {
    title: "Euphemia — Physics-Based Drug Discovery",
    description: "Where rigorous molecular physics meets computational drug discovery.",
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
