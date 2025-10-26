"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LucideSidebar,
  Search,
  MessageSquare,
  BookMarked,
  Notebook,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserHoverCard } from "./UserHoverCard";

export function Sidebar() {
  const [open, setOpen] = useState(true);

  const agents = [
    {
      name: "Web Search Agent",
      description: "Searches relevant research papers.",
      icon: <Search className="h-5 w-5 text-muted-foreground" />,
      type: "webSearchNode",
      defaultData: {
        label: "Web Search Agent",
        description: "Searches the web for information",
        query: "",
        sources: [],
      },
    },
    {
      name: "Chat with PDF Agent",
      description: "Chat with your uploaded PDFs.",
      icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />,
      type: "agentNode",
      defaultData: {
        label: "Chat with PDF Agent",
        description: "Chat with your uploaded PDFs",
      },
    },
    {
      name: "Summarizer Agent",
      description: "Summarizes long text or documents.",
      icon: <BookMarked className="h-5 w-5 text-muted-foreground" />,
      type: "agentNode",
      defaultData: {
        label: "Summarizer Agent",
        description: "Summarizes long text or documents",
      },
    },
    {
      name: "Flashcards Agent",
      description: "Generates study flashcards automatically.",
      icon: <Notebook className="h-5 w-5 text-muted-foreground" />,
      type: "agentNode",
      defaultData: {
        label: "Flashcards Generator Agent",
        description: "Generates study flashcards automatically",
      },
    },
    {
      name: "Save Notes Agent",
      description: "Saves notes to Notion or exports as PDF.",
      icon: <FileText className="h-5 w-5 text-muted-foreground" />,
      type: "agentNode",
      defaultData: {
        label: "Save Notes Agent",
        description: "Saves notes to Notion or exports as PDF",
      },
    },
  ];

  const onDragStart = (event: React.DragEvent, agent: (typeof agents)[0]) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        type: agent.type,
        data: agent.defaultData,
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <LucideSidebar />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[280px] top-16 fixed overflow-y-auto h-[calc(100vh-4rem)] flex flex-col border-r border-border select-none"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="flex-shrink-0 px-4 py-3 border-b border-border">
          <SheetTitle className="text-3xl leading-[52.8px] tracking-[-1.5px] font-semibold">
            Agents
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Agents and tools available
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          {agents.map((agent, index) => (
            <Card
              key={index}
              className="border border-border shadow-none cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => onDragStart(e, agent)}
            >
              <CardContent className="flex items-start gap-3">
                <div className="flex-shrink-0">{agent.icon}</div>
                <div>
                  <h3 className="text-sm font-medium">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {agent.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
