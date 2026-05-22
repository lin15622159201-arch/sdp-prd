export type Node = { isRoot: boolean; children: MapTree; version: string; };
export type MapTree = Record<string, Node>;

export type Tree = { value: string; label: string; children: Tree[]; version: string; };
