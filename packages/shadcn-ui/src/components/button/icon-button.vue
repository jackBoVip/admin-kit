<script setup lang="ts">
import type { ButtonVariants } from '../../ui';
import type { AdminButtonProps } from './button';

import { computed, useSlots } from 'vue';

import { cn } from '@admin-core/shared/utils';

import { AdminTooltip } from '../tooltip';
import AdminButton from './button.vue';

interface Props extends AdminButtonProps {
  class?: any;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
  tooltipDelayDuration?: number;
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top';
  variant?: ButtonVariants;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'icon',
});

const slots = useSlots();

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip);
</script>

<template>
  <AdminButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot></slot>
  </AdminButton>

  <AdminTooltip
    v-else
    :delay-duration="tooltipDelayDuration"
    :side="tooltipSide"
  >
    <template #trigger>
      <AdminButton
        :class="cn('rounded-full', props.class)"
        :disabled="disabled"
        :variant="variant"
        size="icon"
        @click="onClick"
      >
        <slot></slot>
      </AdminButton>
    </template>
    <slot v-if="slots.tooltip" name="tooltip"> </slot>
    <template v-else>
      {{ tooltip }}
    </template>
  </AdminTooltip>
</template>
