import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { 
    id: 'app-to-proxy', 
    source: 'app-server', 
    target: 'proxy', 
    animated: true 
  },
  { 
    id: 'proxy-to-shard1', 
    source: 'proxy',
    sourceHandle: 'shard1',
    target: 'shard1', 
    animated: true 
  },
  { 
    id: 'proxy-to-shard2', 
    source: 'proxy',
    sourceHandle: 'shard2',
    target: 'shard2', 
    animated: true 
  },
  { 
    id: 'proxy-to-shard3', 
    source: 'proxy',
    sourceHandle: 'shard3',
    target: 'shard3', 
    animated: true 
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
