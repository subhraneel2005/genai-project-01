import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "GenAI Project 01",
  description:
    "A multimodel chat project with streaming and generative UI features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${GeistSans.className} antialiased`}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
