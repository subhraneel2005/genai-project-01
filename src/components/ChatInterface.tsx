"use client";

import React from "react";
import { Input } from "./ui/input";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message";

import { MessageSquare } from "lucide-react";
import UserInput from "./Input";

export default function ChatInterface() {
  // 🧠 Dummy messages for testing the UI
  const messages = [
    {
      id: 1,
      from: "user",
      content: "Hey! Can you summarize this paragraph for me?",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      from: "ai",
      content:
        "Sure! Its basically saying that Zustand is a lightweight, fast state management library for React that can persist data using localStorage.",
      avatar: "https://github.com/openai.png",
    },
    {
      id: 3,
      from: "user",
      content: "Perfect, thanks! Also, can I use it with Next.js App Router?",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 4,
      from: "ai",
      content:
        "Absolutely. Zustand works great with both App Router and Client Components — you just need to mark the file as `use client`.",
      avatar: "https://github.com/openai.png",
    },
  ];

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
            messages.map((message, index) => (
              <Message
                from={index % 2 === 0 ? "user" : "assistant"}
                key={message.id}
              >
                <MessageContent>{message.content}</MessageContent>
                <MessageAvatar name={message.from} src={message.avatar} />
              </Message>
            ))
          )}
        </ConversationContent>

        {/* Scroll to bottom button */}
        <ConversationScrollButton />
      </Conversation>

      <UserInput />
    </div>
  );
}
