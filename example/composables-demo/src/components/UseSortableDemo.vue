<template>
  <div class="demo-section">
    <h3>useSortable 演示</h3>
    <p>拖拽排序功能演示 (基于 SortableJS)</p>
    
    <ul ref="sortableListRef" class="sortable-list">
      <li 
        v-for="(item, index) in items" 
        :key="item.id" 
        class="sortable-item"
      >
        <strong>{{ index + 1 }}.</strong> {{ item.text }}
      </li>
    </ul>
    
    <button class="btn" @click="initializeSortable">初始化拖拽</button>
    <button class="btn btn-secondary" @click="addItem">添加项目</button>
    
    <div class="result">
      <p>当前列表顺序:</p>
      <ul>
        <li v-for="(item, index) in items" :key="item.id">
          {{ index + 1 }}. {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSortable } from '@admin-core/composables'

interface Item {
  id: number
  text: string
}

const items = ref<Item[]>([
  { id: 1, text: '项目 1' },
  { id: 2, text: '项目 2' },
  { id: 3, text: '项目 3' },
  { id: 4, text: '项目 4' },
  { id: 5, text: '项目 5' }
])

const sortableListRef = ref<HTMLElement | null>(null)
const nextId = ref(6)

const addItem = () => {
  items.value.push({
    id: nextId.value++,
    text: `项目 ${nextId.value - 1}`
  })
}

const initializeSortable = async () => {
  if (sortableListRef.value) {
    const { initializeSortable: initSortable } = useSortable(sortableListRef.value, {
      animation: 150,
      ghostClass: 'dragging',
      onEnd: (evt) => {
        console.log('拖拽结束', evt)
        // 实现拖拽后的列表更新逻辑
        const movedItem = items.value.splice(evt.oldIndex!, 1)[0]
        items.value.splice(evt.newIndex!, 0, movedItem)
      }
    })
    
    const sortable = await initSortable()
    console.log('Sortable 初始化完成', sortable)
  }
}

onMounted(() => {
  // 自动初始化
  setTimeout(() => {
    initializeSortable()
  }, 100)
})
</script>