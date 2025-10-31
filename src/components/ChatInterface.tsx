"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";

import { Action, Actions } from "@/components/ai-elements/actions";

import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  PromptInputMessage,
  PromptInputButton,
  PromptInputHeader,
  PromptInputBody,
  PromptInputFooter,
} from "@/components/ai-elements/prompt-input";

import {
  CopyIcon,
  ExternalLink,
  Loader2,
  MessageSquare,
  PlusIcon,
  RefreshCcwIcon,
  X,
} from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Response } from "./ai-elements/response";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { usePdfStore } from "@/stores/usePdfStore";

async function convertFilesToDataURLs(
  files: FileList
): Promise<
  { type: "file"; filename: string; mediaType: string; url: string }[]
> {
  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<{
          type: "file";
          filename: string;
          mediaType: string;
          url: string;
        }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              type: "file",
              filename: file.name,
              mediaType: file.type,
              url: reader.result as string, // Data URL
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}

export default function ChatInterface() {
  const { messages, setMessages, status, sendMessage, regenerate, stop } =
    useChat({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
    });

  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<
    Array<{ id: string; name: string; contentType: string; file: File }>
  >([]);

  const handleSubmit = async (
    message: PromptInputMessage,
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (input.trim() || attachments.length > 0) {
      const fileParts =
        attachments.length > 0
          ? await convertFilesToDataURLs(
              (() => {
                const dt = new DataTransfer();
                attachments.forEach((att) => dt.items.add(att.file));
                return dt.files;
              })()
            )
          : [];

      sendMessage({
        role: "user",
        parts: [{ type: "text", text: input }, ...fileParts],
      });

      setInput("");
      // setAttachments([]);
      // setFiles(undefined);
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }
    }
  };

  const handleRemoveAttachment = (fileId: string) => {
    setAttachments((prev) => prev.filter((f) => f.id !== fileId));
  };

  const actions = [
    {
      icon: RefreshCcwIcon,
      label: "Retry",
      onClick: () => regenerate(),
    },
    {
      icon: CopyIcon,
      label: "Copy",
      onClick: () => {},
    },
  ];

  const { pdfFile, pdfName, pdfDataUrl } = usePdfStore();

  useEffect(() => {
    if (pdfFile && pdfDataUrl) {
      setAttachments([
        {
          id: `pdf-${Date.now()}`,
          name: pdfName,
          contentType: pdfFile.type,
          file: pdfFile,
        },
      ]);
    }
  }, [pdfFile, pdfName, pdfDataUrl]);

  return (
    <div className="bg-background border border-accent max-w-4xl mt-6 w-full px-4 py-4 rounded-2xl shadow-lg">
      {/* Conversation container */}
      <Conversation
        className="relative w-full rounded-xl"
        style={{ height: "500px" }}
      >
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-12" />}
              title="No messages yet"
              description="Start a conversation to see messages here"
            />
          ) : (
            messages.map((message) => (
              <>
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <div>
                              <Response key={`${message.id}-${i}`}>
                                {part.text}
                              </Response>
                              <Actions className="mt-4">
                                {actions.map((action) => (
                                  <Action
                                    variant={"secondary"}
                                    size={"icon-sm"}
                                    onClick={action.onClick}
                                    key={action.label}
                                    label={action.label}
                                  >
                                    <action.icon className="size-4" />
                                  </Action>
                                ))}
                              </Actions>
                            </div>
                          );
                        case "reasoning":
                          return (
                            <Reasoning
                              className="w-full"
                              isStreaming={
                                message.parts[-1]?.type === "reasoning" &&
                                status === "streaming"
                              }
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        case "file":
                          return (
                            <Badge
                              key={`${message.id}-${i}`}
                              variant="secondary"
                              className="flex items-center gap-2 px-3 py-2 mb-2"
                            >
                              <img
                                src="/acrobat.png"
                                alt="PDF"
                                className="size-5 object-contain"
                              />
                              <span className="text-sm font-medium">
                                {part.filename}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-2"
                                onClick={() => {
                                  const newWindow = window.open();
                                  if (newWindow) {
                                    newWindow.document.write(
                                      `<iframe src="${part.url}" width="100%" height="100%" style="border:none;"></iframe>`
                                    );
                                  }
                                }}
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </Badge>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                  <MessageAvatar name={message.role} src={message.role} />
                </Message>
              </>
            ))
          )}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Generating response...</span>
                </div>
              </MessageContent>
              <MessageAvatar name="assistant" src="assistant" />
            </Message>
          )}
        </ConversationContent>
      </Conversation>

      <PromptInput
        onSubmit={status === "streaming" ? () => stop() : handleSubmit}
        className="mt-4"
      >
        <PromptInputHeader>
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {attachments.map((file) => (
                <Badge
                  key={file.id}
                  variant="secondary"
                  className="flex items-center justify-between gap-3 px-3 py-2 w-full sm:w-auto"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="/acrobat.png"
                      alt="PDF"
                      className="size-5 object-contain"
                    />
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {file.name}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => handleRemoveAttachment(file.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </PromptInputHeader>

        <PromptInputBody>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton
              variant={"secondary"}
              onClick={() => fileInputRef?.current?.click()}
              aria-label="Attach PDF"
            >
              <PlusIcon size="4" />
            </PromptInputButton>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(e.target.files);
                  const file = e.target.files[0];
                  setAttachments([
                    {
                      id: `pdf-${Date.now()}`,
                      name: file.name,
                      contentType: file.type,
                      file,
                    },
                  ]);
                }
              }}
              accept="application/pdf"
              ref={fileInputRef}
            />
            <PromptInputSubmit
              disabled={!input && status !== "streaming"}
              status={status}
            />
          </PromptInputTools>
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
