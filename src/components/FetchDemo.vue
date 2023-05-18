<template>
  <div>
    <h2>{{ message }}</h2>
    <ul>
      <li v-for="item in items" :key="item.id" @click="selectItem(item.id)">
        {{ item.name }}
      </li>
    </ul>
    <button @click="fetchData">Fetch Data</button>
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = ref('Hello')
    const items = reactive([])

    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      items.push(...data)
    }

    const selectItem = (id) => {
      message.value = `Selected item ${id}`
    }

    return {
      message,
      items,
      fetchData,
      selectItem
    }
  }
})
</script>
