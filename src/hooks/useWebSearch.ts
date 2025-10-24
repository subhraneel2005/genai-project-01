// import { useState } from "react";
// import { researchAgent } from "@/agents/researchAgent";

// export const useWebSearch = () => {
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const searchPrompt = `You are a web search assistant. Given the following query, perform a web search and return a list of relevant sources with titles and URLs.

// Query: ${query}`

//   const performSearch = async (query: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await researchAgent.invoke({
//         input: { query },
//       });

//       // Check if the agent used the tool and returned structured data
//       const sources = res?.results ?? res?.output?.results ?? [];
//       setResults(sources);
//     } catch (err: any) {
//       console.error(err);
//       setError("Failed to fetch results");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { results, loading, error, performSearch };
// };
