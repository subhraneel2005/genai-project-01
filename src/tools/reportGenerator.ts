import { tool } from "ai";
import { z } from "zod";

const reportGeneratorTool = tool({
  name: "generate_report",
  description:
    "Generates a well-structured markdown report based on the provided topic and data. Creates professional reports with proper headings, sections, and formatting.",
  inputSchema: z.object({
    topic: z
      .string()
      .min(1)
      .max(200)
      .describe("The main topic or title of the report."),
    sections: z
      .array(
        z.object({
          title: z.string().describe("Section title"),
          content: z.string().describe("Section content"),
        })
      )
      .optional()
      .describe("Optional predefined sections for the report."),
    includeTableOfContents: z
      .boolean()
      .default(true)
      .describe("Whether to include a table of contents."),
    includeSummary: z
      .boolean()
      .default(true)
      .describe("Whether to include an executive summary."),
  }),
  execute: async ({
    topic,
    sections,
    includeTableOfContents,
    includeSummary,
  }) => {
    try {
      let markdown = `# ${topic}\n\n`;

      // Add metadata
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      markdown += `**Generated:** ${date}\n\n---\n\n`;

      // Add table of contents
      if (includeTableOfContents && sections && sections.length > 0) {
        markdown += `## Table of Contents\n\n`;
        sections.forEach((section, index) => {
          const anchor = section.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
          markdown += `${index + 1}. [${section.title}](#${anchor})\n`;
        });
        markdown += `\n---\n\n`;
      }

      // Add executive summary
      if (includeSummary) {
        markdown += `## Executive Summary\n\n`;
        markdown += `This report provides a comprehensive analysis of ${topic}. `;
        markdown += `The following sections detail key findings, insights, and recommendations.\n\n`;
        markdown += `---\n\n`;
      }

      // Add sections
      if (sections && sections.length > 0) {
        sections.forEach((section, index) => {
          markdown += `## ${section.title}\n\n`;
          markdown += `${section.content}\n\n`;

          if (index < sections.length - 1) {
            markdown += `---\n\n`;
          }
        });
      }

      // Add conclusion
      markdown += `## Conclusion\n\n`;
      markdown += `This report has provided an overview of ${topic}. `;
      markdown += `For further information or questions, please refer to the relevant sections above.\n\n`;
      markdown += `---\n\n`;
      markdown += `*End of Report*`;

      return {
        success: true,
        topic,
        markdown,
        wordCount: markdown.split(/\s+/).length,
        sectionCount: sections?.length || 0,
      };
    } catch (error) {
      console.error("Report generation error:", error);
      return {
        success: false,
        topic,
        markdown: "",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

export default reportGeneratorTool;
