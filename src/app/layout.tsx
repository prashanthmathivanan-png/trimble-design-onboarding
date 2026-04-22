import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeToggleFloat } from "@/components/ThemeToggleFloat";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome, Jay — Trimble Design APAC",
  description:
    "Jay's quarterly onboarding and leadership plan — a welcome letter from the Trimble Design APAC team.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} light antialiased`}
      data-theme="modus-modern-light"
      data-mode="light"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SmoothScroll />
          <SiteHeader />
          <main className="relative">{children}</main>
          <ThemeToggleFloat />
          <KeyboardShortcuts />
        </ThemeProvider>
      </body>
    </html>
  );
}
