import { webSearchTool } from "@/tools/webSearch";
import { Experimental_Agent as Agent, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import reportGeneratorTool from "@/tools/reportGenerator";
import "dotenv/config";

const researchAgent = new Agent({
  model: google("gemini-2.5-flash"),
  system:
    "You are a research assistant that uses web search to gather and condense information on various topics and generate detailed report in markdown format.",
  tools: {
    webSearch: webSearchTool,
    reportGenerator: reportGeneratorTool,
  },
  toolChoice: "auto",
  stopWhen: stepCountIs(4),
});

const webSearchAgent = new Agent({
  model: google("gemini-2.5-flash"),
  system: `
You are a web research assistant.

When given a query:
1. Use the "webSearch" tool to find relevant information.
2. Generate a concise summary (2–3 sentences) of the findings.
3. Then, output the raw JSON array of results that exactly follows this schema:
[
  {
    "title": "string",
    "url": "string",
    "snippet": "string",
    "source": "string"
  }
]

The final output must look like this:

Summary: <your short summary here>

Results:
<JSON array here>

Never alter the JSON keys or values.
`,
  tools: {
    webSearch: webSearchTool,
  },
  toolChoice: "auto",
  stopWhen: stepCountIs(4),
});

export { researchAgent, webSearchAgent };
