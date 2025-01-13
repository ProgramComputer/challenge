import type { NodeTypes } from "@xyflow/react";
import type { AppNode } from "./types";
import { AppServerNode, ProxyNode, ShardNode } from "./CustomNodes";

// Sample data to be distributed across shards
const sampleData = [
  { id: 1, name: "joe", age: 30 },
  { id: 2, name: "bob", age: 45 },
  { id: 3, name: "ben", age: 43 },
  { id: 4, name: "aly", age: 76 },
  { id: 5, name: "ian", age: 29 },
  { id: 6, name: "cam", age: 25 },
  { id: 7, name: "sam", age: 55 },
  { id: 8, name: "kim", age: 33 },
];

export const initialNodes: AppNode[] = [
  {
    id: "app-server",
    type: "app-server",
    position: { x: 50, y: 150 },
    data: { 
      label: "App server",
      rows: sampleData
    },
  },
  {
    id: "proxy",
    type: "proxy",
    position: { x: 400, y: 150 },
    data: { label: "Proxy" },
  },
  {
    id: "shard1",
    type: "shard",
    position: { x: 750, y: 0 },
    data: { label: "Shard 1" },
  },
  {
    id: "shard2",
    type: "shard",
    position: { x: 750, y: 150 },
    data: { label: "Shard 2" },
  },
  {
    id: "shard3",
    type: "shard",
    position: { x: 750, y: 300 },
    data: { label: "Shard 3" },
  },
];

export const nodeTypes = {
  "app-server": AppServerNode,
  proxy: ProxyNode,
  shard: ShardNode,
} satisfies NodeTypes;
