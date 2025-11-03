import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Script from "next/script";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AWS Price Tracker",
  description: "View and compare pricing for AWS services",
  // Next.js automatically handles icon.svg in app/ directory
  // Custom icons can be added here if needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-text`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var root=document.documentElement;root.classList.add('disable-transitions');root.classList.remove('no-touch');var stored=localStorage.getItem('theme');var isDark=stored?stored==='dark':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);root.classList.toggle('dark',isDark);requestAnimationFrame(function(){root.classList.remove('disable-transitions')});}catch(e){}})();`}
        </Script>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
