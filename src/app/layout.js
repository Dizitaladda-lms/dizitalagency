import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DigitalAdda - Leading Digital Marketing & Growth Agency",
  description:
    "DigitalAdda Agency delivers high-impact digital marketing, SEO, PPC ads, web development, and social media growth strategies.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitaladdaagency.com"
  ),
  openGraph: {
    title: "DigitalAdda - Leading Digital Marketing & Growth Agency",
    description:
      "DigitalAdda Agency delivers high-impact digital marketing, SEO, PPC ads, web development, and social media growth strategies.",
    type: "website",
    locale: "en_US",
    siteName: "DigitalAdda Agency",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}