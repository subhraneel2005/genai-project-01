"use client";

import { Map, PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const title = "Feature Card";

export default function MinimapToggle() {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary">
        <Map className="size-5 text-white" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <Label className="font-medium" htmlFor="feature-toggle">
            Enable Minimap
          </Label>
          <Switch id="feature-toggle" />
        </div>
        <p className="text-muted-foreground text-sm">
          Toggle the minimap, navigate workflows with ease.
        </p>
      </div>
    </div>
  );
}
