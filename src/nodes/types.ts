import type { Node, BuiltInNode } from "@xyflow/react";

export type CustomNodeData = {
  label: string;
  isInserting?: boolean;
  rows?: Array<{ id: number; name: string; age: number }>;
};

export type AppServerNodeType = Node<CustomNodeData, "app-server">;
export type ProxyNodeType = Node<CustomNodeData, "proxy">;
export type ShardNodeType = Node<CustomNodeData, "shard">;

export type AppNode = BuiltInNode | AppServerNodeType | ProxyNodeType | ShardNodeType;
