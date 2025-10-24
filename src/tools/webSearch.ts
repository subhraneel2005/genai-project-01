import { tool } from "ai";
import z from "zod";
import "dotenv/config";

const GOOGLE_SEARCH_BASE_URL = process.env.GOOGLE_SEARCH_BASE_URL;
const SERPER_API_KEY = process.env.SERPER_API_KEY;

const webSearchTool = tool({
  name: "web_search",
  description:
    "Performs a web search for a given query and returns the top results.",
  inputSchema: z.object({
    query: z
      .string()
      .min(1)
      .max(200)
      .describe("The search query to look up on the web."),
    numResults: z
      .number()
      .int()
      .min(1)
      .max(20)
      .default(5)
      .describe("The number of top search results to return."),
  }),
  outputSchema: z.array(
    z.object({
      title: z.string().describe("The title of the search result."),
      url: z.string().url().describe("The URL of the search result."),
      snippet: z.string().optional().describe("Optional snippet/summary."),
      source: z.string().optional().describe("Optional source/domain name."),
    })
  ),
  execute: async ({ query, numResults }) => {
    try {
      const response = await fetch(GOOGLE_SEARCH_BASE_URL!, {
        method: "POST",
        headers: {
          "X-API-KEY": SERPER_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: query,
          num: numResults,
        }),
      });

      if (!response.ok) {
        throw new Error(`Serper API error: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Web search error:", error);
      throw new Error("Failed to perform web search.");
    }
  },
});

export { webSearchTool };
