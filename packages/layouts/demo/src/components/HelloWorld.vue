<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const message = ref('Hello World!');
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold">测试页面</h2>
    <p class="text-gray-600">{{ message }}</p>
    <button
      @click="count++"
      class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      点击次数: {{ count }}
    </button>
  </div>
</template>
