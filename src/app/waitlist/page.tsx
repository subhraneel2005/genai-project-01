"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";

export default function Waitlist() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <h1 className="text-5xl leading-[52.8px] tracking-[-1.5px] font-semibold">
        Join waitlist. Get early access.
      </h1>

      <p className="mt-4 mb-8 text-md text-center text-muted-foreground">
        <span className="block max-w-3xl mx-auto">
          A single intelligent workspace where students can search topics,
        </span>
        <span className="block max-w-2xl mx-auto">
          get research papers, web resources. Drag & drop PDFs of papers,
        </span>
        <span className="block max-w-xl mx-auto">
          directly chat with them Generate flashcards or summaries
        </span>
        <span className="block max-w-md mx-auto">from those papers.</span>
      </p>

      <div className="w-full max-w-md space-y-2">
        <Label htmlFor="email-input">Email Address</Label>
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Mail className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="bg-background pl-9"
              id="email-input"
              placeholder="you@example.com"
              type="email"
            />
          </div>
          {loading ? (
            <Button className="gap-2" disabled>
              <Loader2 className="size-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button>Join Waitlist</Button>
          )}
        </div>
      </div>
    </div>
  );
}
