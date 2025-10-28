import { Handle, Position } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { MessagesSquare } from "lucide-react";
import EmptyPDFstate from "./EmptyPDFstate";
import ChatWithPdfSheet from "./ChatWithPdfSheet";

// --- PDF Agent Node Component ---
const PDFAgentNode = ({ data }: any) => {
  return (
    <Card className="w-96 shadow-md border-muted bg-card">
      {!data.isFirst && <Handle type="target" position={Position.Left} />}
      {!data.isLast && <Handle type="source" position={Position.Right} />}

      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{data.label}</CardTitle>
        <CardDescription className="text-xs">
          {data.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 items-center">
        <div className="w-full h-60 rounded-xl border border-dashed border-muted-foreground/30 flex flex-col items-center justify-center bg-muted/30">
          <EmptyPDFstate />
        </div>
      </CardContent>

      <CardFooter>
        <ChatWithPdfSheet>
          <Button className="gap-2 w-full">
            Chat
            <MessagesSquare className="size-4" />
          </Button>
        </ChatWithPdfSheet>
      </CardFooter>
    </Card>
  );
};

export default PDFAgentNode;
