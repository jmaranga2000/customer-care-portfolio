import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Customer Care Portfolio",
  description:
    "Professional Customer Care Representative portfolio showcasing skills, experience, and client-focused solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-black text-white antialiased overflow-x-hidden`}
      >
        {/* 🌌 GLOBAL BACKGROUND */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          
          {/* Main Glow */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full" />
          
          {/* Secondary Glow */}
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-400/10 blur-[100px] rounded-full" />

          {/* OPTIONAL: remove noise to avoid 404 */}
          {/* <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" /> */}
        </div>

        {/* 📦 APP WRAPPER */}
        <div className="relative z-10 flex flex-col min-h-screen">
          
          {/* 🧭 NAVBAR */}
          <Navbar />

          {/* 📄 MAIN CONTENT */}
          <main className="flex-1 w-full pt-20">
            {children}
          </main>

          {/* 📌 FOOTER */}
          <Footer />
        </div>
      </body>
    </html>
  );
}