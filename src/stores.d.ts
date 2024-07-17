import type { Readable } from "svelte/store";

type NodeTab = {
  id: string;
  type: string;
  label: string;
  disabled?: boolean;
};
type NodeGroup = {
  id: string;
  type: string;
  name: string;
  h: number;
  w: number;
  x: number;
  y: number;
  nodes: string[];
  style: object
};

export declare const tabs: Readable<NodeTab[]>;
export declare const groups: Readable<NodeGroup[]>;
