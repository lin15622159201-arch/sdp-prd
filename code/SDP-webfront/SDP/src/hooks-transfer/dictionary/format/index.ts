import type { treeNode } from '@/hooks-transfer/dictionary/types';

export function fixTreeLayer<N extends treeNode>(tree: N[], layer: number | undefined) {
  if (typeof layer === 'undefined') return tree;
  const currentLayer = 0;
  /* 修剪 */
  const fix = (nodes: treeNode[], current: number) => {
    current += 1;

    nodes.forEach((node) => {
      if (current === layer) {
        delete node.children;
      } else if (node.children) {
        fix(node.children, current);
      }
    });
  };
  fix(tree, currentLayer);
  return tree;
}
