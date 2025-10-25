"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LucideSidebar,
  Brain,
  Megaphone,
  Share2,
  Search,
  FileText,
  Bot,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  const [open, setOpen] = useState(true);

  const agents = [
    {
      name: "Research Agent",
      icon: <Brain className="h-4 w-4 text-indigo-600" />,
      color: "text-indigo-600",
      tools: [
        { name: "Web Search Tool", icon: <Search className="h-3 w-3" /> },
        { name: "Summarizer Tool", icon: <FileText className="h-3 w-3" /> },
        { name: "Report Generator", icon: <FileText className="h-3 w-3" /> },
      ],
    },
    {
      name: "Social Media Agent",
      icon: <Megaphone className="h-4 w-4 text-pink-600" />,
      color: "text-pink-600",
      tools: [
        { name: "Post Generator", icon: <FileText className="h-3 w-3" /> },
        { name: "Content Scheduler", icon: <Share2 className="h-3 w-3" /> },
      ],
    },
    {
      name: "Mod Agent",
      icon: <Share2 className="h-4 w-4 text-emerald-600" />,
      color: "text-emerald-600",
      tools: [
        { name: "Community Scanner", icon: <Search className="h-3 w-3" /> },
        { name: "Post Distributor", icon: <FileText className="h-3 w-3" /> },
      ],
    },
  ];

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen} defaultOpen={true}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <LucideSidebar />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[265px] top-16 fixed overflow-y-auto h-[calc(100vh-4rem)] flex flex-col border-r border-slate-200 bg-white"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* HEADER */}
        <SheetHeader className="flex-shrink-0 px-4 py-3 border-b border-slate-100">
          <SheetTitle className="text-base font-semibold flex items-center gap-2">
            <Bot className="h-4 w-4 text-indigo-500" />
            Agents & Tools
          </SheetTitle>
        </SheetHeader>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {agents.map((agent, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-3 px-1">
                {agent.icon}
                <h3 className="text-sm font-semibold text-slate-800">
                  {agent.name}
                </h3>
              </div>
              <div className="flex flex-col gap-1 pl-6">
                {agent.tools.map((tool, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    className="justify-start text-xs text-slate-700 hover:bg-slate-100 gap-2 h-7 px-2"
                  >
                    {tool.icon}
                    {tool.name}
                  </Button>
                ))}
              </div>

              {index < agents.length - 1 && (
                <Separator className="my-4 opacity-50" />
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
