import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"
import ClientAuthLoader from "@/components/ClientAuthLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyncBoard — Collaborate Visually, Instantly",
  description: "SyncBoard is a real-time collaborative whiteboard for teams, educators, and creators. Draw, brainstorm, and create together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#07060f] bg-[radial-gradient(ellipse_at_top,_rgb(30,20,60)_0%,_rgb(7,6,15)_70%)]`}
      >
        <ClientAuthLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
