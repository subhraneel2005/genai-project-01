"use client";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { Search } from "lucide-react";
import { useState } from "react";

type SearchResult = {
  title: string;
  url: string;
  snippet?: string;
  source?: string;
};

const WebSearchNode = ({ data }: any) => {
  const [query, setQuery] = useState(data.query || "");
  const [isSearching, setIsSearching] = useState(false);
  const [summary, setSummary] = useState("");
  const [sources, setSources] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSummary("");
    setSources([]);
    setError(null);

    try {
      const response = await fetch("/api/tools/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Failed to fetch search results");

      const text = await response.text();

      // Parse the "Summary:" and "Results:" sections safely
      // Match Summary: <text> Results:
      const summaryMatch = text.match(/Summary:\s*([\s\S]*?)\nResults:/);
      const resultsMatch = text.match(/Results:\s*(\[[\s\S]*\])$/);

      const extractedSummary = summaryMatch ? summaryMatch[1].trim() : "";
      let parsedResults: SearchResult[] = [];

      try {
        if (resultsMatch) parsedResults = JSON.parse(resultsMatch[1]);
      } catch (parseErr) {
        console.error("Failed to parse JSON results:", parseErr);
        throw new Error("Invalid results format from agent");
      }

      setSummary(extractedSummary);
      setSources(parsedResults);

      data.onSearch?.(query, parsedResults);
    } catch (err: any) {
      console.error("Search error:", err);
      setError("Failed to fetch search results.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="w-96 shadow-sm border-slate-200 transition-all">
      {!data.isFirst && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-slate-400"
        />
      )}
      {!data.isLast && (
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-slate-400"
        />
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Search className="h-4 w-4" />
          {data.label || "Web Search"}
        </CardTitle>
        {data.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {data.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Query Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="text-sm"
          />
          <Button
            size="sm"
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
          >
            {isSearching ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Loading / Error */}
        {isSearching && (
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <div className="h-3 w-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            Searching...
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 bg-red-50 p-2 rounded-md">
            {error}
          </p>
        )}

        {/* Summary */}
        {summary && (
          <div className="p-2 text-xs bg-slate-50 rounded-md">
            <strong>Summary:</strong> {summary}
          </div>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <div className="pt-4">
            <Sources>
              <SourcesTrigger count={sources.length} />
              <SourcesContent>
                {sources.map((source, i) => (
                  <Source key={i} href={source.url} title={source.title} />
                ))}
              </SourcesContent>
            </Sources>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebSearchNode;
