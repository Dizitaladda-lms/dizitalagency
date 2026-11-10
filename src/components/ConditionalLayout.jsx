"use client";

import { usePathname } from "next/navigation";
import Header from "@/Children/Header";
import Footer from "@/Children/Footer";
import HomesectionGlobalHero from "@/Homesections/HomesectionGlobalHero";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isHome = pathname === "/";

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <HomesectionGlobalHero backgroundOnly />
      <div className="relative z-10">
        <Header />
        <main style={{ paddingTop: isHome ? 0 : "100px" }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
