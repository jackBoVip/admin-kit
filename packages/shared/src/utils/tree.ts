/**
 * 树形数据工具模块
 * @description 提供树形数据处理相关的工具函数，使用 ES2025 最新特性优化
 * @module tree
 */

/**
 * 树形结构配置选项
 */
export interface TreeConfigOptions {
  /** 子节点属性名称，默认为 'children' */
  childProps?: string;
}

/**
 * 遍历树形结构，并返回所有节点中指定的值
 * @param tree - 树形结构数组
 * @param getValue - 获取节点值的函数
 * @param options - 配置选项
 * @returns 所有节点中指定的值的数组
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * 
 * // 获取所有节点的 id
 * const ids = traverseTreeValues(tree, node => node.id)
 * // [1, 2]
 * 
 * // 获取所有节点的 name
 * const names = traverseTreeValues(tree, node => node.name)
 * // ['Node 1', 'Node 2']
 * ```
 */
export function traverseTreeValues<T, V>(
  tree: T[],
  getValue: (node: T) => V,
  options?: TreeConfigOptions,
): V[] {
  const result: V[] = [];
  const { childProps = 'children' } = options ?? {};
  
  const dfs = (treeNode: T): void => {
    const value = getValue(treeNode);
    result.push(value);
    
    const children = (treeNode as Record<string, any>)?.[childProps];
    if (!children || !Array.isArray(children) || children.length === 0) {
      return;
    }
    
    for (const child of children) {
      dfs(child);
    }
  };
  
  for (const treeNode of tree) {
    dfs(treeNode);
  }
  
  return result.filter(Boolean);
}

/**
 * 根据条件过滤树形结构的节点
 * @param tree - 要过滤的树形结构数组
 * @param filter - 过滤条件函数
 * @param options - 配置选项
 * @returns 过滤后的树形结构
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', active: true, children: [
 *     { id: 2, name: 'Node 2', active: false },
 *     { id: 3, name: 'Node 3', active: true }
 *   ]}
 * ]
 * 
 * // 只保留 active 为 true 的节点
 * const filtered = filterTree(tree, node => node.active)
 * // [{ id: 1, name: 'Node 1', active: true, children: [
 * //   { id: 3, name: 'Node 3', active: true }
 * // ]}]
 * ```
 */
export function filterTree<T extends Record<string, any>>(
  tree: T[],
  filter: (node: T) => boolean,
  options?: TreeConfigOptions,
): T[] {
  const { childProps = 'children' } = options ?? {};
  
  const _filterTree = (nodes: T[]): T[] => {
    return nodes.filter((node: Record<string, any>) => {
      if (filter(node as T)) {
        if (node[childProps]) {
          node[childProps] = _filterTree(node[childProps]);
        }
        return true;
      }
      return false;
    });
  };
  
  return _filterTree(tree);
}

/**
 * 映射树形结构的节点
 * @param tree - 要映射的树形结构数组
 * @param mapper - 映射函数
 * @param options - 配置选项
 * @returns 映射后的树形结构
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * 
 * // 为每个节点添加 label 字段
 * const mapped = mapTree(tree, node => ({
 *   ...node,
 *   label: node.name
 * }))
 * // [{ id: 1, name: 'Node 1', label: 'Node 1', children: [
 * //   { id: 2, name: 'Node 2', label: 'Node 2' }
 * // ]}]
 * ```
 */
export function mapTree<T, V extends Record<string, any>>(
  tree: T[],
  mapper: (node: T) => V,
  options?: TreeConfigOptions,
): V[] {
  const { childProps = 'children' } = options ?? {};
  
  return tree.map((node) => {
    const mappedNode: Record<string, any> = mapper(node);
    
    if (mappedNode[childProps]) {
      mappedNode[childProps] = mapTree(mappedNode[childProps], mapper, options);
    }
    
    return mappedNode as V;
  });
}

/**
 * 对树形结构数据进行递归排序
 * @param treeData - 树形数据数组
 * @param sortFunction - 排序函数
 * @param options - 配置选项
 * @returns 排序后的树形数据
 * @example
 * ```typescript
 * const tree = [
 *   { id: 3, name: 'C', children: [
 *     { id: 2, name: 'B' },
 *     { id: 1, name: 'A' }
 *   ]},
 *   { id: 1, name: 'A' }
 * ]
 * 
 * // 按 id 升序排序
 * const sorted = sortTree(tree, (a, b) => a.id - b.id)
 * // [{ id: 1, name: 'A' }, { id: 3, name: 'C', children: [
 * //   { id: 1, name: 'A' },
 * //   { id: 2, name: 'B' }
 * // ]}]
 * ```
 */
export function sortTree<T extends Record<string, any>>(
  treeData: T[],
  sortFunction: (a: T, b: T) => number,
  options?: TreeConfigOptions,
): T[] {
  const { childProps = 'children' } = options ?? {};
  
  return treeData.toSorted(sortFunction).map((item) => {
    const children = item[childProps];
    
    if (children && Array.isArray(children) && children.length > 0) {
      return {
        ...item,
        [childProps]: sortTree(children, sortFunction, options),
      };
    }
    
    return item;
  });
}

/**
 * 将树形结构扁平化为一维数组
 * @param tree - 树形结构数组
 * @param options - 配置选项
 * @returns 扁平化后的数组
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * 
 * const flattened = flattenTree(tree)
 * // [
 * //   { id: 1, name: 'Node 1', children: [...] },
 * //   { id: 2, name: 'Node 2' }
 * // ]
 * ```
 */
export function flattenTree<T extends Record<string, any>>(
  tree: T[],
  options?: TreeConfigOptions,
): T[] {
  const { childProps = 'children' } = options ?? {};
  const result: T[] = [];
  
  const flatten = (nodes: T[]): void => {
    for (const node of nodes) {
      result.push(node);
      
      const children = node[childProps];
      if (children && Array.isArray(children) && children.length > 0) {
        flatten(children);
      }
    }
  };
  
  flatten(tree);
  return result;
}

/**
 * 将扁平数组转换为树形结构
 * @param list - 扁平数组
 * @param options - 配置选项
 * @returns 树形结构数组
 * @example
 * ```typescript
 * const list = [
 *   { id: 1, name: 'Node 1', parentId: null },
 *   { id: 2, name: 'Node 2', parentId: 1 },
 *   { id: 3, name: 'Node 3', parentId: 1 }
 * ]
 * 
 * const tree = arrayToTree(list, {
 *   idKey: 'id',
 *   parentKey: 'parentId',
 *   childProps: 'children'
 * })
 * // [{ id: 1, name: 'Node 1', parentId: null, children: [
 * //   { id: 2, name: 'Node 2', parentId: 1 },
 * //   { id: 3, name: 'Node 3', parentId: 1 }
 * // ]}]
 * ```
 */
export function arrayToTree<T extends Record<string, any>>(
  list: T[],
  options?: TreeConfigOptions & {
    idKey?: string;
    parentKey?: string;
    rootValue?: any;
  },
): T[] {
  const {
    childProps = 'children',
    idKey = 'id',
    parentKey = 'parentId',
    rootValue = null,
  } = options ?? {};
  
  const map = new Map<any, T>();
  const result: T[] = [];
  
  // 第一遍：建立 id 到节点的映射
  for (const item of list) {
    map.set(item[idKey], { ...item, [childProps]: [] });
  }
  
  // 第二遍：建立父子关系
  for (const item of list) {
    const node = map.get(item[idKey]);
    const parentId = item[parentKey];
    
    if (parentId === rootValue || parentId === undefined) {
      result.push(node!);
    } else {
      const parent = map.get(parentId);
      if (parent) {
        parent[childProps].push(node!);
      }
    }
  }
  
  return result;
}

/**
 * 在树形结构中查找节点
 * @param tree - 树形结构数组
 * @param predicate - 查找条件函数
 * @param options - 配置选项
 * @returns 找到的节点，未找到返回 undefined
 * @example
 * ```typescript
 * const tree = [
 *   { id: 1, name: 'Node 1', children: [
 *     { id: 2, name: 'Node 2' }
 *   ]}
 * ]
 * 
 * const node = findTreeNode(tree, node => node.id === 2)
 * // { id: 2, name: 'Node 2' }
 * ```
 */
export function findTreeNode<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options?: TreeConfigOptions,
): T | undefined {
  const { childProps = 'children' } = options ?? {};
  
  for (const node of tree) {
    if (predicate(node)) {
      return node;
    }
    
    const children = node[childProps];
    if (children && Array.isArray(children) && children.length > 0) {
      const found = findTreeNode(children, predicate, options);
      if (found) {
        return found;
      }
    }
  }
  
  return undefined;
}


