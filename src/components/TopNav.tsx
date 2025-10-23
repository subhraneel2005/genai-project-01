import React from "react";
import { Button } from "./ui/button";
import { Sidebar } from "./Sidebar";

export default function TopNav() {
  return (
    <div className="h-16 justify-start items-center px-2 w-full border-b border-border flex gap-4 fixed top-0 left-0 right-0 bg-background z-50">
      <Sidebar />
      <nav className="flex">
        <Button variant="ghost" className="cursor-pointer">
          Canvas
        </Button>
        <Button variant="ghost" className="cursor-pointer">
          Agents
        </Button>
        <Button variant="ghost" className="cursor-pointer">
          Members
        </Button>
        <Button variant="ghost" className="cursor-pointer">
          Profile
        </Button>
      </nav>
    </div>
  );
}
