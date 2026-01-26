import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Portfolio of a passionate web developer and IT student building modern web experiences.",
  keywords: ["web developer", "portfolio", "IT student", "React", "Next.js"],
  icons: {
    icon: "/portfolio.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300`}>
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30" />
        <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-violet-500/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        
        <footer className="relative z-10 border-t border-violet-200/50 dark:border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © {new Date().getFullYear()} Cresan J. Cuanan. All rights reserved.
                </p>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <a href="https://github.com" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    GitHub
                  </a>
                  <a href="https://www.facebook.com/cresan.cuanan" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Facebook
                  </a>
                  <a href="mailto:cresan.cuanan@urios.edu.ph" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Email
                  </a>
                </div>
              </div>
            </div>
          </footer>
      </body>
    </html>
  );
}