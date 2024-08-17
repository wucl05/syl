<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)
const loading = ref(false)
const loadHandler = () => {
  console.log('加载成功啦')
  loading.value = true
}
</script>

<template>
  <div class="app">
    <AppHeader />
      <slot />
    <PageLoading v-if="!loading" @success="loadHandler" />
  </div>
</template>
