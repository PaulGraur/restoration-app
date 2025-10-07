"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyBackground() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.backgroundColor =
      pathname === "/simulator" ? "#1e1e1e" : "";
  }, [pathname]);

  return null;
}
