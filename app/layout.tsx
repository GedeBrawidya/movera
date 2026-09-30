import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Movera — AI Background Removal",
  description:
    "Remove backgrounds from images instantly with AI-powered technology. Fast, precise, and free to start. Professional-grade results in seconds.",
  keywords: ["background removal", "AI image editing", "remove bg", "photo editor"],
  openGraph: {
    title: "Movera — AI Background Removal",
    description: "Remove backgrounds from images instantly with AI-powered technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
