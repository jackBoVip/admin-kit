<template>
  <div class="demo-section">
    <h3>useIsMobile 演示</h3>
    <p>当前设备类型: {{ isMobile ? '移动设备' : '桌面设备' }}</p>
    <p>移动端检测状态: {{ isMobile }}</p>
    
    <div class="result">
      <p>移动端检测结果: {{ isMobile ? '当前为移动设备' : '当前为桌面设备' }}</p>
      <p>说明：当屏幕宽度小于 md 断点（通常为 768px）时，视为移动设备</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsMobile } from '@admin-core/composables'

const { isMobile } = useIsMobile()
</script>