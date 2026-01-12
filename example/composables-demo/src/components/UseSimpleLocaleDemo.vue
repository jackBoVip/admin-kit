<template>
  <div class="demo-section">
    <h3>useSimpleLocale 演示</h3>
    <p>当前语言: {{ currentLocale }}</p>
    
    <button class="btn" @click="() => setSimpleLocale('zh-CN')">切换到中文</button>
    <button class="btn" @click="() => setSimpleLocale('en-US')">切换到英文</button>
    
    <div class="result">
      <p>确认按钮: {{ $t('confirm') }}</p>
      <p>取消按钮: {{ $t('cancel') }}</p>
      <p>提交按钮: {{ $t('submit') }}</p>
      <p>重置按钮: {{ $t('reset') }}</p>
      <p>未知键: {{ $t('unknown_key') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSimpleLocale } from '@admin-core/composables'

const { $t, currentLocale, setSimpleLocale } = useSimpleLocale()
</script>