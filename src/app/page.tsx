"use client";

import ChatInterface from "@/components/ChatInterface";
import UserInput from "@/components/Input";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col bg-background px-4">
      <h1 className="text-primary leading-[-0.5%] text-4xl font-bold">
        Multimodel chat project
      </h1>
      <p className="text-muted-foreground text-lg">
        Including features like Streaming and Generative UI
      </p>

      {/* <div className="w-full max-w-2xl mt-8">
        <UserInput />
      </div> */}
      <ChatInterface />
    </div>
  );
}
