import React from 'react';
import { Handle, Position } from "@xyflow/react";
import type { CustomNodeData } from "./types";

const NODE_WIDTH = 200;

export function AppServerNode({ data }: { data: CustomNodeData }) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-green-500" style={{ width: NODE_WIDTH }}>
      <div className="font-bold text-xl text-green-500 mb-2">{data.label}</div>
      <div className="text-gray-600 font-mono space-y-1">
        {data.rows?.map(row => (
          <div key={row.id} className="text-sm bg-gray-50 px-2 py-1 rounded truncate">
            {row.id} | {row.name} | {row.age}
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function ProxyNode({ data }: { data: CustomNodeData }) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-gray-500" style={{ width: NODE_WIDTH }}>
      <div className="font-bold text-xl text-gray-700">{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="shard1" style={{ top: "25%" }} />
      <Handle type="source" position={Position.Right} id="shard2" style={{ top: "50%" }} />
      <Handle type="source" position={Position.Right} id="shard3" style={{ top: "75%" }} />
    </div>
  );
}

export function ShardNode({ data }: { data: CustomNodeData }) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-blue-500" style={{ width: NODE_WIDTH }}>
      <div className="font-bold text-xl text-blue-500 mb-2">{data.label}</div>
      <div className="text-gray-600 font-mono space-y-1">
        {data.rows?.map(row => (
          <div key={row.id} className="text-sm bg-gray-50 px-2 py-1 rounded truncate">
            {row.id} | {row.name} | {row.age}
          </div>
        ))}
        {(!data.rows || data.rows.length === 0) && (
          <div className="text-gray-400 italic text-sm">Empty shard</div>
        )}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

export function DataBox({ data }: { data: { id: number; name: string; age: number } }) {
  return (
    <div 
      className="bg-blue-50 border border-blue-200 rounded px-2 py-1 text-sm font-mono shadow-md text-gray-600 truncate"
      style={{ width: NODE_WIDTH - 32 }}
    >
      {data.id} | {data.name} | {data.age}
    </div>
  );
} 