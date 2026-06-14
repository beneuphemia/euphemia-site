import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euphemia — Physics-Based Drug Discovery",
  description: "Computational drug discovery powered by rigorous physics simulation and machine learning. Specialists in water network and solvation modeling.",
  keywords: ["drug discovery", "molecular simulation", "computational chemistry", "FEP", "solvation", "water networks"],
  openGraph: {
    title: "Euphemia",
    description: "Where physics meets drug discovery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  );
}
