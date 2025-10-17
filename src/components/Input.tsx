"use client";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useModelStore } from "@/stores/useModelStore";
import { GlobeIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const models = [
  { id: "openai/gpt-4", name: "GPT-4" },
  { id: "openai/gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-2", name: "Claude 2" },
  { id: "claude-instant", name: "Claude Instant" },
  { id: "palm-2", name: "PaLM 2" },
  { id: "llama-2-70b", name: "Llama 2 70B" },
  { id: "llama-2-13b", name: "Llama 2 13B" },
  { id: "mistral-7b", name: "Mistral 7B" },
  { id: "gemini-1.5", name: "Gemini 1.5" },
  { id: "gemini-pro", name: "Gemini Pro" },
];

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

// 🧠 Helper function to map models to icons
const getModelIcon = (id: string): string => {
  if (id.startsWith("gpt")) return "/openai.png";
  if (id.startsWith("gemini")) return "/gemini.png";
  if (id.startsWith("mistral")) return "/mistral.png";
  if (id.startsWith("palm")) return "/palm.png";
  if (id.startsWith("claude")) return "/color.png";
  if (id.startsWith("llama")) return "/ollama.png";
  return "/openai.png"; // fallback
};

const UserInput = () => {
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { selectedModel, setSelectedModel } = useModelStore();

  const stop = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus("ready");
  };

  const handleSubmit = (message: PromptInputMessage) => {
    if (status === "streaming" || status === "submitted") {
      stop();
      return;
    }

    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) return;

    setStatus("submitted");
    console.log("Submitting message:", message);

    setTimeout(() => {
      setStatus("streaming");
    }, SUBMITTING_TIMEOUT);

    timeoutRef.current = setTimeout(() => {
      setStatus("ready");
      timeoutRef.current = null;
    }, STREAMING_TIMEOUT);
  };

  return (
    <div className="flex flex-col justify-end size-full">
      <PromptInput globalDrop multiple onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>

          <PromptInputTextarea
            onChange={(e) => setText(e.target.value)}
            ref={textareaRef}
            value={text}
          />
        </PromptInputBody>

        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputModelSelect
              onValueChange={setSelectedModel}
              value={selectedModel}
            >
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>

              <PromptInputModelSelectContent>
                {models.map((modelOption) => (
                  <PromptInputModelSelectItem
                    key={modelOption.id}
                    value={modelOption.id}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={getModelIcon(modelOption.id)}
                        alt={modelOption.name}
                        width={15}
                        height={15}
                        className="rounded-sm object-contain"
                      />
                      <span>{modelOption.name}</span>
                    </div>
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
          </PromptInputTools>

          <PromptInputSubmit className="!h-8" status={status} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
};

export default UserInput;
