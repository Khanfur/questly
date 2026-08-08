import type { Metadata } from "next";
import { Geist, Cinzel } from "next/font/google";
import { Container } from "@/components/layout/container";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Questly",
  description: "An old school Runescape Companion",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Container className="flex-1">{children}</Container>
      </body>
    </html>
  );
}
