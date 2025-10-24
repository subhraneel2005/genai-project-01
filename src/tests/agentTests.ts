import { testAgent } from "@/agents/agents";
import { researchAgent } from "@/agents/researchAgent";

// const text =
//   "In a distant future, humanity has colonized several planets across the galaxy. The story follows a young explorer named Aria who embarks on a mission to discover new worlds and unravel the mysteries of an ancient alien civilization. Along the way, she encounters various challenges, forms alliances with alien species, and uncovers secrets that could change the fate of humanity forever. As Aria delves deeper into her journey, she must confront her own beliefs and make choices that will shape the future of interstellar relations, all while navigating the complexities of space travel and survival in uncharted territories, making for an epic tale of adventure, discovery, and self-discovery.";

// const result = testAgent.stream({
//   prompt:
//     "Please translate the following text from English to Japanese " + text,
// });

// for await (const chunk of result.textStream) {
//   process.stdout.write(chunk);
// }

const wsResult = researchAgent.stream({
  prompt:
    "Conduct a web search to find the latest advancements in renewable energy technologies and provide a concise summary of the findings.",
});

for await (const chunk of wsResult.textStream) {
  process.stdout.write(chunk);
}
