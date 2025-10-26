"use client";

import TopNav from "@/components/TopNav";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavWrapper() {
  const pathname = usePathname();
  const hideNav = pathname === "/waitlist";

  if (hideNav) {
    return null;
  }

  return <TopNav />;
}
