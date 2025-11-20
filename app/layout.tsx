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
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="smooth-scroll">
      <body className="antialiased overscroll-none">
        {children}
      </body>
    </html>
  );
}
