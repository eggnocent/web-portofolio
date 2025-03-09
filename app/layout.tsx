import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/portfolio/theme/theme-provider"; // 🔥 Tambahkan import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egi Wiratama - Portfolio",
  description: "Backend Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider> {/* 🔥 Bungkus children dengan ThemeProvider */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
