<template>
  <div>视频id：{{ id }}</div>
</template>
<script setup lang='ts'>
// import { ref } from 'vue'
const route = useRoute();
const { id } = route.params;
</script>
<style scoped>
</style>
