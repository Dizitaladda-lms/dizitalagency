"use client";

import { usePathname } from "next/navigation";
import Header from "@/Children/Header";
import Footer from "@/Children/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isHome = pathname === "/";

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: isHome ? 0 : "100px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
