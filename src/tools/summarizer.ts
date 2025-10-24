import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import z from "zod";
import "dotenv/config";

const summarizerTool = tool({
  name: "summarize",
  description: "Summarizes a given text document.",
  inputSchema: z.object({
    text: z
      .string()
      .min(1)
      .max(10000)
      .describe("The text document to be summarized."),
  }),
  execute: async ({ text }) => {
    let finalSummary = "";
    const summary = streamText({
      model: google("gemini-2.5-flash"),
      prompt: `Summarize the following text concisely:\n\n${text}`,
    });

    console.log("\n\n--- Summary Started ---");

    for await (const chunk of summary.textStream) {
      process.stdout.write(chunk);
      finalSummary += chunk;
    }

    console.log("\n\n--- Summary Complete ---");
    return finalSummary;
  },
});

export { summarizerTool };
