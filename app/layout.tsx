import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jadwal Shalat Indonesia - Waktu Sholat Akurat",
  description: "Aplikasi jadwal waktu shalat untuk seluruh kota di Indonesia dengan data akurat dari Kemenag RI",
  keywords: ["jadwal shalat", "waktu sholat", "prayer times", "indonesia", "kemenag"],
  authors: [{ name: "Shalat Schedule" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
