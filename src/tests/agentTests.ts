import { researchAgent, webSearchAgent } from "@/agents/researchAgent";

const wsResult = webSearchAgent.stream({
  prompt: "Do a web search about the latest news on AI advancements",
});

for await (const chunk of wsResult.textStream) {
  process.stdout.write(chunk);
}
