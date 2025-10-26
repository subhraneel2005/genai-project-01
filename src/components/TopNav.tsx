"use client";
import React from "react";
import { Button } from "./ui/button";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserHoverCard } from "./UserHoverCard";
import AuthModals from "./AuthModals";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function TopNav() {
  const pathname = usePathname();
  const isCanvas = pathname === "/";

  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="h-16 justify-start items-center px-2 w-full border-b border-border flex gap-4 fixed top-0 left-0 right-0 bg-background z-50">
      {isCanvas && <Sidebar />}
      <nav className="flex">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>

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
        <div className="mx-4"></div>
        <AuthModals />
      </nav>
    </div>
  );
}
