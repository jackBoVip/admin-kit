<template>
  <div class="card-box overflow-hidden">
    <div :class="[bgClass, textClass, 'p-6 flex items-center justify-center h-32']">
      <div class="text-center">
        <div class="text-2xl font-bold mb-1">{{ name }}</div>
        <div class="text-sm opacity-90">{{ description }}</div>
      </div>
    </div>
    <div class="p-4 bg-muted/50">
      <div class="text-xs font-mono space-y-1">
        <div class="text-muted-foreground">背景: <span class="text-foreground">{{ bgClass }}</span></div>
        <div class="text-muted-foreground">文字: <span class="text-foreground">{{ textClass }}</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
  bgClass: string
  textClass: string
}>()
</script>
