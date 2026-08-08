import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Container } from "@/components/layout/container";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Container className="flex-1">{children}</Container>
      </body>
    </html>
  );
}
