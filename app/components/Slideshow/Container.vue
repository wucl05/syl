<script setup lang="ts">
import langue from '@/locales/header.js'
const { locale, setLocale } = useI18n()
const active = ref(2)
watch(active, (value) => {
})
</script>
<template>
  <div class="w-screen	h-screen relative">
    <div class="absolute row fc w-12 h-full z-10 right-12">
      <SlideshowPoint v-model="active" />
    </div>
    <SlideshowFirst v-if="active === 1" class="z-0"/>
    <SlideshowSecond v-if="active === 2" class="z-0"/>
  </div>
</template>
<style scoped></style>