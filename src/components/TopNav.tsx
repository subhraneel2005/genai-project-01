"use client";
import React from "react";
import { Button } from "./ui/button";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserHoverCard } from "./UserHoverCard";

export default function TopNav() {
  const pathname = usePathname();
  const isCanvas = pathname === "/";

  return (
    <div className="h-16 justify-start items-center px-2 w-full border-b border-border flex gap-4 fixed top-0 left-0 right-0 bg-background z-50">
      {isCanvas && <Sidebar />}
      <nav className="flex">
        <Link href={"/"}>
          <Button variant="ghost" className="cursor-pointer ">
            Canvas
          </Button>
        </Link>
        <Link href={"/myApps"}>
          <Button variant="ghost" className="cursor-pointer">
            Apps
          </Button>
        </Link>
        <Link href={"/profile"}>
          <Button variant="ghost" className="cursor-pointer mr-3">
            Profile
          </Button>
        </Link>
        <UserHoverCard />
      </nav>
    </div>
  );
}
