<script setup lang="ts">
import type { TabsEmits, TabsProps } from './types';

import type { ComponentPublicInstance } from 'vue';

import { ref } from 'vue';

import { useForwardPropsEmits } from '@admin-core/composables';
import { ChevronLeft, ChevronRight } from '@admin-core/icons';
import { AdminScrollbar } from '@admin-core/ui';

import { Tabs, TabsChrome } from './components';
import { useTabsDrag } from './use-tabs-drag';
import { useTabsViewScroll } from './use-tabs-view-scroll';

interface Props extends TabsProps {}

defineOptions({
  name: 'TabsView',
});

const props = withDefaults(defineProps<Props>(), {
  contentClass: 'admin-tabs-content',
  draggable: true,
  styleType: 'chrome',
  wheelable: true,
});

const emit = defineEmits<TabsEmits>();

const forward = useForwardPropsEmits(props, emit);

const {
  handleScrollAt,
  handleWheel,
  scrollbarRef,
  scrollDirection,
  scrollIsAtLeft,
  scrollIsAtRight,
  showScrollButton,
} = useTabsViewScroll(props);

function onWheel(e: WheelEvent) {
  if (props.wheelable) {
    handleWheel(e);
    e.stopPropagation();
    e.preventDefault();
  }
}

type TabsContentExposed = { getContentEl?: () => HTMLElement | null | undefined };
const tabsChromeRef = ref<(ComponentPublicInstance & TabsContentExposed) | null>(null);
const tabsRef = ref<(ComponentPublicInstance & TabsContentExposed) | null>(null);

useTabsDrag(props, emit, () => {
  const exposed =
    props.styleType === 'chrome' ? tabsChromeRef.value : tabsRef.value;
  return exposed?.getContentEl?.() ?? undefined;
});
</script>

<template>
  <div class="flex h-full flex-1 overflow-hidden">
    <!-- 左侧滚动按钮 -->
    <span
      v-show="showScrollButton"
      :class="{
        'cursor-pointer text-muted-foreground hover:bg-muted': !scrollIsAtLeft,
        'pointer-events-none opacity-30': scrollIsAtLeft,
      }"
      class="border-r px-2"
      @click="scrollDirection('left')"
    >
      <ChevronLeft class="size-4 h-full" />
    </span>

    <div
      :class="{
        'pt-[3px]': styleType === 'chrome',
      }"
      class="size-full flex-1 overflow-hidden"
    >
      <AdminScrollbar
        ref="scrollbarRef"
        :shadow-bottom="false"
        :shadow-top="false"
        class="h-full"
        horizontal
        scroll-bar-class="z-10 hidden "
        shadow
        shadow-left
        shadow-right
        @scroll-at="handleScrollAt"
        @wheel="onWheel"
      >
        <TabsChrome
          v-if="styleType === 'chrome'"
          ref="tabsChromeRef"
          v-bind="{ ...forward, ...$attrs, ...$props }"
        />

        <Tabs v-else ref="tabsRef" v-bind="{ ...forward, ...$attrs, ...$props }" />
      </AdminScrollbar>
    </div>

    <!-- 右侧滚动按钮 -->
    <span
      v-show="showScrollButton"
      :class="{
        'cursor-pointer text-muted-foreground hover:bg-muted': !scrollIsAtRight,
        'pointer-events-none opacity-30': scrollIsAtRight,
      }"
      class="cursor-pointer border-l px-2 text-muted-foreground hover:bg-muted"
      @click="scrollDirection('right')"
    >
      <ChevronRight class="size-4 h-full" />
    </span>
  </div>
</template>
