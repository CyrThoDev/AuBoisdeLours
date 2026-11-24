// app/layout.tsx
import type { Metadata } from "next";
import { Young_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Au bois de l'ours — Nicolas Kreutz, tourneur sur bois à Lacaugne",
  description:
    "Tournage sur bois à Lacaugne (Haute-Garonne). Le nouveau site arrive bientôt : contactez Nicolas Kreutz au 06 65 77 71 51.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-[#3A2A20]">{children}</body>
    </html>
  );
}
