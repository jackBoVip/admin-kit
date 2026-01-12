<template>
  <div class="demo-section">
    <h3>useClipboard 演示</h3>
    <p>是否支持剪贴板: {{ isSupported ? '是' : '否' }}</p>
    <p>是否已复制: {{ copied ? '是' : '否' }}</p>
    <input v-model="textToCopy" placeholder="输入要复制的文本" class="input" />
    <button class="btn" @click="copyText">复制文本</button>
    <div class="result" v-if="error">
      错误: {{ error.message }}
    </div>
    <div class="result" v-else-if="copied">
      已复制: {{ textToCopy }}
    </div>
    <div class="result" v-else>
      准备复制文本
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@admin-core/composables'

const textToCopy = ref('这是一段要复制的文本')
const { copy, copied, isSupported, error } = useClipboard()

const copyText = async () => {
  await copy(textToCopy.value)
}
</script>