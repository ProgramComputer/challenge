import React, { useState } from "react";
import { 
  ReactFlow,
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges } from "./edges";
import { RunButton } from "./components/RunButton";
import { RunReportPanel } from "./components/RunReportPanel";
import { Logo } from "./components/Logo";
import type { CustomNodeData } from "./nodes/types";

// Types for our data
type Row = {
  id: number;
  name: string;
  age: number;
}

function Flow() {
  // State
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [reportData, setReportData] = useState<{ rows: (Row & { shard: number })[] }>();
  
  // Shard data state
  const [shardData, setShardData] = useState({
    shard1: [] as Row[],
    shard2: [] as Row[],
    shard3: [] as Row[],
  });

  // Update the shards when data changes
  React.useEffect(() => {
    setNodes(nodes => 
      nodes.map(node => {
        if (!node.id.startsWith('shard')) return node;
        
        const num = node.id.replace('shard', '');
        const key = `shard${num}` as keyof typeof shardData;
        
        return {
          ...node,
          data: {
            ...node.data,
            rows: shardData[key],
          },
        };
      })
    );
  }, [shardData, setNodes]);

  // Handle new connections
  const onConnect = React.useCallback((params: any) => {
    setEdges(edges => addEdge(params, edges));
  }, [setEdges]);

  // Main function to distribute data
  const distributeData = async () => {
    try {
      setIsRunning(true);
      
      // Get rows from app server
      const appServer = nodes.find(n => n.id === 'app-server');
      const rows = (appServer?.data as CustomNodeData).rows || [];

      // Sort rows into shards
      const newShards = {
        shard1: [] as Row[],
        shard2: [] as Row[],
        shard3: [] as Row[],
      };

      // Put each row in its shard based on ID
      rows.forEach(row => {
        const shardNum = row.id % 3 + 1;
        const key = `shard${shardNum}` as keyof typeof newShards;
        newShards[key].push(row);
      });

      // Update everything
      setShardData(newShards);
      setReportData({ 
        rows: rows.map(row => ({
          ...row,
          shard: row.id % 3 + 1
        }))
      });
      setIsPanelOpen(true);
    } catch (err) {
      console.error('Failed to distribute data:', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      minZoom={0.5}
      maxZoom={2}
    >
      <Background />
      <Logo />
      <RunButton onRun={distributeData} disabled={isRunning} />
      <RunReportPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        reportData={reportData}
      />
    </ReactFlow>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
