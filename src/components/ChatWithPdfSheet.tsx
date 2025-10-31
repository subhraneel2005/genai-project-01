import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatInterface from "./ChatInterface";

export const title = "Sheet with Title and Description";

const ChatWithPdfSheet = ({ children }: { children: React.ReactNode }) => (
  <Sheet>
    <SheetTrigger asChild>{children}</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Chat with PDF</SheetTitle>
        <SheetDescription>
          This is a description that provides additional context about the sheet
          content.
        </SheetDescription>
        <ChatInterface />
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

export default ChatWithPdfSheet;
