import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Children/Header";
import Footer from "@/Children/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DizitalAdda - Digital Marketing Agency",
  description: "India's leading digital growth agency delivering results since 2009.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />

        <main style={{ paddingTop: "100px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}