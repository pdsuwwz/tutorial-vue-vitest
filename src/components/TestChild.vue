<template>
  <div>{{ testMsg }}</div>
</template>

<script setup>
defineOptions({
  name: 'TestChild'
})

const testMsg = '来自子组件的值'

</script>
