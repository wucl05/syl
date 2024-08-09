<script setup lang="ts">
const emit = defineEmits(["input"]);
const { total } = defineProps({
  total: {
    type: Number,
    default: 5
  }
})
const model = defineModel({ default: 1 })
const change = (index) => {
  model.value = index
}
</script>
<template>
  <div class="col">
    <div @click="change(index)" v-for="index in total" :class="{ active: model === index }"
      class="m-2 row fc w-4 h-4 rounded-full cursor-pointer hover:bg-[rgba(255,255,255,0.5)]" :key="index">
      <div class="w-1 h-1 bg-[#fff] rounded-full">
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  border: 1px solid #fff
}
</style>