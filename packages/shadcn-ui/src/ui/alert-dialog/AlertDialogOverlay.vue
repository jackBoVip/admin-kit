<script setup lang="ts">
import { useScrollLock } from '@admin-core/composables';

useScrollLock(document.body);
</script>
<template>
  <div class="z-popup inset-0 bg-overlay"></div>
</template>
