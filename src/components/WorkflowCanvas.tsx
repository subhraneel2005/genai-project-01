"use client";

import React, { useCallback, useRef } from "react";
import {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
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
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

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

  // Handle drop event
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const { type, data: nodeData } = JSON.parse(data);

      // Calculate position on canvas
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create new node
      const newNode = {
        id: `${Date.now()}`, // Generate unique ID
        type,
        position,
        data: {
          ...nodeData,
          isFirst: false,
          isLast: false,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
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
    </div>
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
