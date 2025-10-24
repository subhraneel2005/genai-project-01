"use client";

import React, { useCallback } from "react";
import {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import DottedArrowEdge from "./DottedArrowEdge";
import AgentNode from "./AgentNode";
import WebSearchNode from "./WebSearchNode";
import ReportGeneratorNode from "./ReportGeneratorNode";

const initialNodes = [
  {
    id: "1",
    type: "webSearchNode",
    position: { x: 0, y: 0 },
    data: {
      label: "Web Search Agent",
      description: "Searches the web for information",
      query: "",
      sources: [],
      isFirst: true,
      isLast: false,
      onSearch: (query: string) => {
        console.log("Searching for:", query);
        // TODO: Implement search logic here
        // Example: Call your web search tool API
        // Then update node with results using updateNodeData
      },
    },
  },

  {
    id: "2",
    type: "reportGeneratorNode",
    position: { x: 700, y: 0 },
    data: {
      label: "Report Generator",
      description: "Generates comprehensive reports",
      topic: "",
      markdown: "",
      isGenerating: false,
      isFirst: false,
      isLast: true,
    },
  },
];

const initialEdges: any[] = [];

const nodeTypes = {
  agentNode: AgentNode,
  webSearchNode: WebSearchNode,
  reportGeneratorNode: ReportGeneratorNode,
};

// --- Inner Canvas (for ReactFlowProvider) ---
function InnerCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: any) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: {
              type: "arrowclosed",
              width: 30,
              height: 30,
            },
          },
          eds
        )
      ),
    []
  );

  const edgeTypes = {
    dottedArrow: DottedArrowEdge,
  };

  // Helper function to update node data dynamically
  const updateNodeData = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    },
    [setNodes]
  );

  // Example: Handle search completion
  const handleSearchComplete = useCallback(
    (nodeId: string, sources: any[]) => {
      updateNodeData(nodeId, { sources, isSearching: false });
    },
    [updateNodeData]
  );

  // Example: Handle report generation stream
  const handleReportStream = useCallback(
    (nodeId: string, markdown: string) => {
      updateNodeData(nodeId, { markdown, isGenerating: true });
    },
    [updateNodeData]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodesConnectable={true}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      fitViewOptions={{ padding: 0.7 }}
      minZoom={0.3}
      maxZoom={1.5}
      panOnDrag
      zoomOnScroll
      zoomOnPinch
      zoomOnDoubleClick={false}
    >
      <Controls />
    </ReactFlow>
  );
}

export default function WorkflowCanvas() {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <InnerCanvas />
      </ReactFlowProvider>
    </div>
  );
}
