<script lang="ts" setup>
import type { AdminDropdownMenuItem } from '@admin-core/ui';

import { ChevronDown } from '@admin-core/icons';
import { AdminDropdownMenu } from '@admin-core/ui';

interface Props {
  menus: AdminDropdownMenuItem[];
}

defineProps<Props>();
</script>

<template>
  <AdminDropdownMenu :menus="menus" :modal="false">
    <div
      class="flex-center h-full cursor-pointer border-l border-border px-2 text-lg font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      <ChevronDown class="size-4" />
    </div>
  </AdminDropdownMenu>
</template>
