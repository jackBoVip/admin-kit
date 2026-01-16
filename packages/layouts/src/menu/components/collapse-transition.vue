<script lang="ts" setup>
import type { RendererElement } from 'vue';

defineOptions({
  name: 'CollapseTransition',
});

const reset = (_el: RendererElement) => {
  const el = _el as HTMLElement;
  el.style.maxHeight = '';
  el.style.overflow = el.dataset.oldOverflow ?? '';
  el.style.paddingTop = el.dataset.oldPaddingTop ?? '';
  el.style.paddingBottom = el.dataset.oldPaddingBottom ?? '';
};

const on = {
  afterEnter(_el: RendererElement) {
    const el = _el as HTMLElement;
    el.style.maxHeight = '';
    el.style.overflow = el.dataset.oldOverflow ?? '';
  },

  afterLeave(_el: RendererElement) {
    reset(_el);
  },

  beforeEnter(_el: RendererElement) {
    const el = _el as HTMLElement;

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldMarginTop = el.style.marginTop;

    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldMarginBottom = el.style.marginBottom;
    if (el.style.height) el.dataset.elExistsHeight = el.style.height;

    el.style.maxHeight = '0';
    el.style.paddingTop = '0';
    el.style.marginTop = '0';
    el.style.paddingBottom = '0';
    el.style.marginBottom = '0';
  },

  beforeLeave(_el: RendererElement) {
    const el = _el as HTMLElement;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldMarginTop = el.style.marginTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldMarginBottom = el.style.marginBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },

  enter(_el: RendererElement) {
    const el = _el as HTMLElement;
    requestAnimationFrame(() => {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.dataset.elExistsHeight) {
        el.style.maxHeight = el.dataset.elExistsHeight;
      } else if (el.scrollHeight === 0) {
        el.style.maxHeight = '0';
      } else {
        el.style.maxHeight = `${el.scrollHeight}px`;
      }

      el.style.paddingTop = el.dataset.oldPaddingTop ?? '';
      el.style.paddingBottom = el.dataset.oldPaddingBottom ?? '';
      el.style.marginTop = el.dataset.oldMarginTop ?? '';
      el.style.marginBottom = el.dataset.oldMarginBottom ?? '';
      el.style.overflow = 'hidden';
    });
  },

  enterCancelled(_el: RendererElement) {
    reset(_el);
  },

  leave(_el: RendererElement) {
    const el = _el as HTMLElement;
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
      el.style.marginTop = '0';
      el.style.marginBottom = '0';
    }
  },

  leaveCancelled(_el: RendererElement) {
    reset(_el);
  },
};
</script>

<template>
  <transition name="collapse-transition" v-on="on">
    <slot></slot>
  </transition>
</template>
