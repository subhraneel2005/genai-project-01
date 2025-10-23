"use client";

import React, { useCallback } from "react";
import {
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DottedArrowEdge from "./DottedArrowEdge";

// --- Custom Node Component ---
const AgentNode = ({ data }: any) => {
  return (
    <Card className="w-80 shadow-md border-muted">
      {!data.isFirst && <Handle type="target" position={Position.Left} />}
      {!data.isLast && <Handle type="source" position={Position.Right} />}

      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{data.label}</CardTitle>
        <CardDescription className="text-xs">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-start">
        <p className="text-sm text-muted-foreground">{data.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-2 mt-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="outline">
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

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
      <Background gap={12} size={1} />
      <Controls />
    </ReactFlow>
  );
}

// --- Main Export ---
export default function WorkflowCanvas() {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <InnerCanvas />
      </ReactFlowProvider>
    </div>
  );
}
