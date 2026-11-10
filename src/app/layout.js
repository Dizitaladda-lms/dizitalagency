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
  title: "Performance Marketing for Education & Growth Brands | DigitalAdda",
  description:
    "DigitalAdda is a Delhi-based digital growth agency for education and growth brands, delivering SEO, paid media, content, social, and web development.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitaladdaagency.com"
  ),
  openGraph: {
    title: "Performance Marketing for Education & Growth Brands | DigitalAdda",
    description:
      "A Delhi-based digital growth agency for education and growth brands, delivering SEO, paid media, content, social, and web development.",
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