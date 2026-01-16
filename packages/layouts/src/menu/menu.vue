<script setup lang="ts">
import type { MenuRecordRaw } from '@admin-core/shared/types';

import type { MenuProps } from './types';

import { computed } from 'vue';
import { useForwardProps } from '@admin-core/composables';

import { Menu } from './components';
import SubMenu from './sub-menu.vue';

interface Props extends MenuProps {
  menus: MenuRecordRaw[];
}

defineOptions({
  name: 'MenuView',
});

const props = withDefaults(defineProps<Props>(), {
  collapse: false,
});

const forward = useForwardProps(props);

/**
 * 生成稳定的 key，并在开发期尽早暴露 menus/path 的数据问题
 *
 * @description
 * - Menu 内部以 `path` 作为唯一标识（注册、展开、激活、事件 payload）
 * - 若 `path` 为空或重复，会导致渲染 diff 异常或菜单行为错乱
 */
const __menuKeys = computed(() => {
  const keys = new Set<string>();
  const duplicates: string[] = [];
  const empties: number[] = [];

  props.menus?.forEach((m, idx) => {
    const k = String((m as any)?.path ?? '');
    if (!k) {
      empties.push(idx);
      return;
    }
    if (keys.has(k)) {
      duplicates.push(k);
    } else {
      keys.add(k);
    }
  });

  if (import.meta.env.DEV) {
    if (empties.length) {
      console.warn(
        `[MenuView]: menus[*].path 不能为空。当前空 path 的索引：${empties.join(', ')}`,
      );
    }
    if (duplicates.length) {
      console.warn(
        `[MenuView]: menus[*].path 存在重复，会导致 key 冲突与菜单行为异常。重复项：${[
          ...new Set(duplicates),
        ].join(', ')}`,
      );
    }
  }

  // 记录每个顶层 menu 的 key（fallback: __index）
  const keyMap = new Map<number, string>();
  props.menus?.forEach((m, idx) => {
    const k = String((m as any)?.path ?? '');
    keyMap.set(idx, k || `__index_${idx}`);
  });
  return keyMap;
});
</script>

<template>
  <Menu v-bind="forward">
    <template v-for="(menu, idx) in menus" :key="__menuKeys.get(idx)">
      <SubMenu :menu="menu" />
    </template>
  </Menu>
</template>
