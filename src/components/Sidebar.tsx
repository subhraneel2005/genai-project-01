"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideSidebar, StepBack } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <Sheet modal={false} defaultOpen={true} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant="ghost">
          <LucideSidebar />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[265px] top-16 fixed overflow-y-auto h-[calc(100vh-4rem)] flex flex-col"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {/* HEADER */}
        <SheetHeader className="flex-shrink-0">
          <div>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </div>
        </SheetHeader>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto py-6">
          <div className="grid gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <SheetFooter className="flex-shrink-0 pt-4 pb-4">
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
