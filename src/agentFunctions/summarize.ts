import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Function that uses Gemini to summarize text
export async function summarizeText(text: string) {
  let finalSummary = "";
  const summary = streamText({
    model: google("gemini-2.5-flash"),
    prompt: `Summarize the following text concisely:\n\n${text}`,
  });

  for await (const chunk of summary.textStream) {
    process.stdout.write(chunk);
    finalSummary += chunk;
  }

  console.log("\n--- Summary Complete ---");
  return finalSummary;
}
