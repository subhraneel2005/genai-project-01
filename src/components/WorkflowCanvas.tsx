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

const initialNodes = [
  {
    id: "1",
    type: "agentNode",
    position: { x: 0, y: 0 },
    data: {
      label: "Summarizer Agent",
      description: "Summarizes text using AI",
      content: "Takes long-form text and outputs concise summaries",
      isFirst: true, // <--- mark first node
      isLast: false,
    },
  },
  {
    id: "2",
    type: "agentNode",
    position: { x: 350, y: 150 },
    data: {
      label: "Telegram Agent",
      description: "Sends messages via Telegram",
      content: "Uses Telegram Bot API for communication",
      isFirst: false,
      isLast: false,
    },
  },
  {
    id: "3",
    type: "agentNode",
    position: { x: 700, y: 0 },
    data: {
      label: "Gmail Agent",
      description: "Reads and sends emails",
      content: "Integrated with Gmail API",
      isFirst: false,
      isLast: true, // <--- mark last node
    },
  },
];

const initialEdges: any[] = [];

const nodeTypes = {
  agentNode: AgentNode,
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
