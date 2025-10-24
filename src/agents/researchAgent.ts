import { summarizerTool } from "@/tools/summarizer";
import { webSearchTool } from "@/tools/webSearch";
import { Experimental_Agent as Agent, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";

const researchAgent = new Agent({
  model: google("gemini-2.5-flash"),
  system:
    "You are a research assistant that uses web search and text summarization to gather and condense information on various topics.",
  tools: {
    webSearch: webSearchTool,
    summarizer: summarizerTool,
  },
  toolChoice: "auto",
  stopWhen: stepCountIs(5),
});

export { researchAgent };
