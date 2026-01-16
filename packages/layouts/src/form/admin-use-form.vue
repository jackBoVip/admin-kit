<script setup lang="ts">
import type { Recordable } from '@admin-core/shared/types';

import type { ExtendedFormApi, AdminFormProps } from './types';

// import { toRaw, watch } from 'vue';
import { computed, nextTick, onMounted, watch, watchEffect } from 'vue';

import { useForwardPriorityValues } from '@admin-core/composables';
import { cloneDeep, get, isEqual, set } from '@admin-core/shared/utils';

import { useDebounceFn } from '@vueuse/core';

import FormActions from './components/form-actions.vue';
import {
  COMPONENT_BIND_EVENT_MAP,
  COMPONENT_MAP,
  DEFAULT_FORM_COMMON_CONFIG,
} from './config';
import { Form } from './form-render';
import {
  provideComponentRefMap,
  provideFormProps,
  useFormInitial,
} from './use-form-context';
// 通过 extends 会导致热更新卡死，所以重复写了一遍
interface Props extends AdminFormProps {
  formApi?: ExtendedFormApi;
}

const props = defineProps<Props>();

const state = props.formApi?.useStore?.();

const forward = useForwardPriorityValues(props, state);

const componentRefMap = new Map<string, unknown>();

const { delegatedSlots, form } = useFormInitial(forward);

provideFormProps([forward, form]);
provideComponentRefMap(componentRefMap);

props.formApi?.mount?.(form, componentRefMap);

const handleUpdateCollapsed = (value: boolean) => {
  props.formApi?.setState({ collapsed: value });
  // 触发收起展开状态变化回调
  forward.value.handleCollapsedChange?.(value);
};

function handleKeyDownEnter(event: KeyboardEvent) {
  if (!state?.value.submitOnEnter || !forward.value.formApi?.isMounted) {
    return;
  }
  // 如果是 textarea 不阻止默认行为，否则会导致无法换行。
  // 跳过 textarea 的回车提交处理
  if (event.target instanceof HTMLTextAreaElement) {
    return;
  }
  event.preventDefault();

  forward.value.formApi?.validateAndSubmitForm();
}

const handleValuesChangeDebounced = useDebounceFn(async () => {
  state?.value.submitOnChange && forward.value.formApi?.validateAndSubmitForm();
}, 300);

const valuesCache: Recordable<any> = {};

/**
 * 需要追踪的字段列表（从 schema 派生）
 *
 * @description
 * 性能优化：避免在每次 values 变化时都对 schema 做一次 map。
 */
const trackedFields = computed(() => state?.value.schema?.map((i) => i.fieldName) ?? []);

/**
 * schema 字段值快照（仅追踪 schema 中声明的字段）
 *
 * @description
 * 性能优化：替代对 `form.values` 的 deep watch，避免整棵 values 树都被递归追踪。
 */
const trackedValues = computed(() => {
  const fields = trackedFields.value;
  return fields.map((field) => get(form.values, field));
});

/**
 * handleValuesChange 的载荷策略（默认 deep，保持兼容）
 *
 * 优先级：props/commonConfig > 全局 DEFAULT_FORM_COMMON_CONFIG
 */
const valuesChangePayload = computed<'deep' | 'shallow' | 'patch'>(() => {
  return (
    (forward.value.commonConfig as any)?.valuesChangePayload ??
    DEFAULT_FORM_COMMON_CONFIG.valuesChangePayload ??
    'deep'
  );
});

/**
 * 构造 handleValuesChange 的 values 参数
 *
 * @description
 * - deep：全量深拷贝（默认，兼容最强）
 * - shallow：全量浅拷贝（GC 更少，但嵌套引用共享）
 * - patch：仅构造变更字段片段（最省，但 values 不再是“全量快照”）
 */
function buildValuesPayload(
  fullValues: Record<string, any>,
  fieldsChanged: string[],
): Record<string, any> {
  const strategy = valuesChangePayload.value;
  if (strategy === 'patch') {
    const patch: Record<string, any> = {};
    for (const field of fieldsChanged) {
      set(patch, field, get(fullValues, field));
    }
    return patch;
  }
  if (strategy === 'shallow') {
    return { ...fullValues };
  }
  // default: deep（保持现有行为）
  return cloneDeep(fullValues) as Record<string, any>;
}

onMounted(async () => {
  // 只在挂载后开始监听，form.values 会有一个初始化的过程
  await nextTick();

  watchEffect((onCleanup) => {
    const hasValuesChangeHook = !!forward.value.handleValuesChange;
    const shouldSubmitOnChange = !!state?.value.submitOnChange;
    // 若两者都不需要，直接不建立 watcher
    if (!hasValuesChangeHook && !shouldSubmitOnChange) return;

    const fields = trackedFields.value;

    // 初始化 cache：避免首次建立 watcher 时把所有字段都当作“变更”
    for (let i = 0; i < fields.length; i++) {
      set(valuesCache, fields[i]!, trackedValues.value[i]);
    }

    const stop = watch(
      trackedValues,
      async (newVals, oldVals) => {
        // oldVals 可能为 undefined（取决于 Vue 内部优化），这里兜底成空数组
        const prev = oldVals ?? [];

        // 仅当需要回调时才计算 changedFields
        if (hasValuesChangeHook) {
          const changedFields: string[] = [];
          for (let i = 0; i < fields.length; i++) {
            const field = fields[i]!;
            const nextVal = newVals[i];
            const prevVal = prev[i];
            // 这里优先用“快照对比”，避免重复 get/遍历
            if (!isEqual(nextVal, prevVal)) {
              changedFields.push(field);
              set(valuesCache, field, nextVal);
            }
          }

          if (changedFields.length > 0) {
            const values = await forward.value.formApi?.getValues();
            const fullValues = (values ?? {}) as Record<string, any>;
            forward.value.handleValuesChange?.(
              buildValuesPayload(fullValues, changedFields),
              changedFields,
            );
          }
        }

        if (shouldSubmitOnChange) handleValuesChangeDebounced();
      },
      {
        // 行为保持：不立即触发（与原先非-immediate 的 watch 一致）
        immediate: false,
      },
    );

    onCleanup(stop);
  });
});
</script>

<template>
  <Form
    @keydown.enter="handleKeyDownEnter"
    v-bind="forward"
    :collapsed="state?.collapsed"
    :component-bind-event-map="COMPONENT_BIND_EVENT_MAP"
    :component-map="COMPONENT_MAP"
    :form="form"
    :global-common-config="DEFAULT_FORM_COMMON_CONFIG"
  >
    <template
      v-for="slotName in delegatedSlots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
    <template #default="slotProps">
      <slot v-bind="slotProps">
        <FormActions
          v-if="forward.showDefaultActions"
          :model-value="state?.collapsed"
          @update:model-value="handleUpdateCollapsed"
        >
          <template #reset-before="resetSlotProps">
            <slot name="reset-before" v-bind="resetSlotProps"></slot>
          </template>
          <template #submit-before="submitSlotProps">
            <slot name="submit-before" v-bind="submitSlotProps"></slot>
          </template>
          <template #expand-before="expandBeforeSlotProps">
            <slot name="expand-before" v-bind="expandBeforeSlotProps"></slot>
          </template>
          <template #expand-after="expandAfterSlotProps">
            <slot name="expand-after" v-bind="expandAfterSlotProps"></slot>
          </template>
        </FormActions>
      </slot>
    </template>
  </Form>
</template>
