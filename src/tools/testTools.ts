import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import z from "zod";

const summarizeTool = tool({
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

    for await (const chunk of summary.textStream) {
      process.stdout.write(chunk);
      finalSummary += chunk;
    }

    console.log("\n\n--- Summary Complete ---");
    return finalSummary;
  },
});

const translateTool = tool({
  name: "translate",
  description:
    "Translates a given text from a source language into a target language.",
  inputSchema: z.object({
    text: z
      .string()
      .min(1)
      .max(10000)
      .describe("The text document to be translated."),
    sourceLang: z
      .string()
      .min(2)
      .max(50)
      .describe("The source language (e.g., 'English')."),
    targetLang: z
      .string()
      .min(2)
      .max(50)
      .describe("The target language (e.g., 'Spanish')."),
  }),
  execute: async ({ text, sourceLang, targetLang }) => {
    let fullTranslation = "";
    const translationStream = streamText({
      model: google("gemini-2.5-flash"),
      prompt: `Translate the following text from ${sourceLang} to ${targetLang}:\n\n${text}`,
    });

    for await (const chunk of translationStream.textStream) {
      process.stdout.write(chunk);
      fullTranslation += chunk;
    }

    console.log("\n--- Translation Complete ---");
    return { translation: fullTranslation };
  },
});

export { summarizeTool, translateTool };
