import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Un pokédex fait avec Next.js pour le tp noté",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} antialiased`}>
      <body className=" bg-gray-900 text-white font-sans">{children}</body>
    </html>
  );
}
