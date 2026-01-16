import type {
  ComponentInternalInstance,
  VNode,
  VNodeChild,
  VNodeNormalizedChildren,
} from 'vue';

import { isVNode } from 'vue';

type VNodeChildAtom = Exclude<VNodeChild, Array<any>>;
type RawSlots = Exclude<VNodeNormalizedChildren, Array<any> | null | string>;

type FlattenVNodes = Array<RawSlots | VNodeChildAtom>;

export interface FlattenChildrenOptions {
  /**
   * 是否递归遍历组件实例的 subTree
   *
   * @default false
   * @description
   * 遍历 subTree 代价高、且可能带来意料之外的节点展开（甚至引发递归风险）。
   * 绝大多数场景只需要“展开数组/Fragment children”即可。
   */
  traverseSubTree?: boolean;
}

/**
 * @zh_CN Find the parent component upward
 * @param instance
 * @param parentNames
 */
function findComponentUpward(
  instance: ComponentInternalInstance,
  parentNames: string[],
) {
  let parent = instance.parent;
  while (parent && !parentNames.includes(parent?.type?.name ?? '')) {
    parent = parent.parent;
  }
  return parent;
}

const flattedChildren = (
  children: FlattenVNodes | VNode | VNodeNormalizedChildren,
  options: FlattenChildrenOptions = {},
): FlattenVNodes => {
  const vNodes = Array.isArray(children) ? children : [children];
  const result: FlattenVNodes = [];

  vNodes.forEach((child) => {
    if (Array.isArray(child)) {
      result.push(...flattedChildren(child, options));
    } else if (isVNode(child) && Array.isArray(child.children)) {
      result.push(...flattedChildren(child.children, options));
    } else {
      result.push(child);
      if (options.traverseSubTree && isVNode(child) && child.component?.subTree) {
        result.push(...flattedChildren(child.component.subTree, options));
      }
    }
  });
  return result;
};

export { findComponentUpward, flattedChildren };
