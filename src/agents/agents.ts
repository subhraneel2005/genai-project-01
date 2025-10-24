import { Experimental_Agent as Agent, stepCountIs, streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { summarizeTool, translateTool } from "@/tools/testTools";

const testAgent = new Agent({
  model: google("gemini-2.5-flash"),
  system:
    "You are a helpful assistant that summarizes, translates text documents .",
  tools: {
    summaryTool: summarizeTool,
    traslateTool: translateTool,
  },
  toolChoice: "auto",
});

export { testAgent };
