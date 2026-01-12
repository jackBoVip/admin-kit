<template>
  <div class="demo-section">
    <h3>useLocalStorage 演示</h3>
    <p>存储的数据: {{ data }}</p>
    <input v-model="inputValue" placeholder="输入新值" class="input" />
    <button class="btn" @click="updateData">更新数据</button>
    <button class="btn btn-danger" @click="removeData">删除数据</button>
    <div class="result">
      当前存储值: {{ JSON.stringify(data) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@admin-core/composables'

const inputValue = ref('新数据')
const { data, remove } = useLocalStorage('composables-demo-storage', { name: '测试', count: 0 })

const updateData = () => {
  data.value = { name: inputValue.value, count: data.value.count + 1 }
}

const removeData = () => {
  remove()
}
</script>