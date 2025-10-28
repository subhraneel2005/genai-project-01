"use client";

import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const title = "Empty with Single Action";

export default function EmptyPDFstate() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Upload />
        </EmptyMedia>
        <EmptyTitle>No Pdf uploaded</EmptyTitle>
        <EmptyDescription>Get started by uploading your pdf.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Upload />
          Upload pdf
        </Button>
      </EmptyContent>
    </Empty>
  );
}
