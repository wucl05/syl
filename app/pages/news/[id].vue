<template>
  <div class="outline-none">
    <div class="m-auto box-border bg-gray-50 dark:bg-black py-2 lg:px-12 px-5">
      <UBreadcrumb class="max-w-main m-auto" :links="links" :ui="{
        divider: {
          base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 text-black dark:text-white sm:opacity-70',
        },
      }" >
      </UBreadcrumb>
    </div>
    <div class="max-w-main m-auto text-center py-8 sm:py-10 lg:py-14 ">
      <h1 class="text-4xl font-bold text-[#222] dark:text-white">{{ info.title }}</h1>
      <h4 class="time mt-[.56rem] text-[#666]">{{ locale !== 'cn' ? info.publishDateEn : info.publishDate }}</h4>
    </div>
    <div class="video-container flex flex-col lg:flex-row items-center justify-space-between lg:gap-10 gap-5">
      <nuxt-link class="lg:fixed lg:top-[50%] lg:mt-[-32px]" :to="info.prev.id?`/news/${info.prev.id}`:''" :class="['order-3 lg:order-1 prev flex flex-shrink-0 items-center justify-start 2xl:w-96 xl:w-80 lg:w-60 w-full md:pl-10 md:pr-5 md:py-4 pl-4 lg:pl-12 pr-7 py-6 ease-in-out duration-300',info?.prev?.id? 'xl:hover:bg-primary-blue bg-primary-blue lg:bg-transparent cursor-pointer opacity-100' :'h-0 opacity-0']">
        <div class="w-16 h-16 bg-primary-yelleow shrink-0 mr-5 2x:mr-7 flex flex-col items-center justify-center">
          <UIcon name="humbleicons:chevron-left" class="w-6 h-6 text-black"></UIcon>
        </div>
        <div class="child line-clamp-2 break-words text-white">{{info.prev.title}}</div>
      </nuxt-link>
      <div class="max-w-[55.75rem] m-auto flex-1 px-4 lg:px-0 content order-2 lg:order-2">
        <article v-html="info?.content ?? ''">
        </article>
      </div>
      <nuxt-link class="lg:fixed lg:top-[50%] lg:right-[0px] lg:mt-[-32px]" :to="info.next.id?`/news/${info.next.id}`:''" :class="['order-3 lg:order-3 next flex flex-shrink-0 items-center justify-end 2xl:w-96 xl:w-80 lg:w-60 w-full pr-4 lg:pr-12 pl-7 md:pr-10 md:pl-5 md:py-4 py-6  ease-in-out duration-300',info?.next?.id?'xl:hover:bg-primary-blue bg-primary-blue lg:bg-transparent cursor-pointer opacity-100':'h-0 opacity-0']">
        <div class="w-16 h-16 bg-primary-yelleow shrink-0 ml-5 2x:ml-7 flex flex-col items-center justify-center order-2">
          <UIcon name="humbleicons:chevron-right" class="w-6 h-6 text-black"></UIcon>
        </div>
        <div class="child line-clamp-2 break-words text-white order-1">{{info.next.title}}</div>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang='ts'>
import type { NewsDetail,NewsDetailResponseData } from '~/types/news'
import lang from 'locales/live'
const { locale } = useI18n()
const { newsApi } = useApi();
const route = useRoute();
const { id } = route.params;
console.log('route',route.name)
const links = [
  {
    label: lang[locale.value]['links:home'],
    labelClass:'text-black dark:text-white',
    to: '/'
  },
  {
    label: lang[locale.value]['links:news'],
    labelClass:'text-black dark:text-white',
    to: '/news'
  },
  {
    label: lang[locale.value]['links:newsDetail'],
    labelClass:'text-black dark:text-white opacity-70',
  }
]
const title =ref('');
const loading = ref(false)
const info:NewsDetail = ref({})
try {
  loading.value = true
  const res:NewsDetailResponseData<NewsDetail>  = await newsApi.newsDetail(id);
  console.log('res===',res)
  const {data} = res
  data.prev = data?.prev ?? {}
  data.next = data?.next ?? {}
  info.value = data ?? {}
  loading.value = false
  title.value = data?.title??''
  const description = data?.summary ?? ''
  useSeoMeta({
    title: title.value,
    keywords:title.value,
    ogTitle: title.value,
    description: description,
    ogDescription: description,
    ogImage: data.coverImg??'',
    twitterImage: data.coverImg??'',
    twitterCard: 'summary_large_image',
  })
} catch (error) {
  info.value = {}
  loading.value = false
  console.log('error',error)
}


</script>
<style scoped>
.child {
  @apply lg:invisible;
}

.prev:hover .child,
.next:hover .child {
  @apply visible;
}
.content :deep(p) {
  margin-bottom: 12px;
  word-break: break-all;
}
.content :deep(img) {
  max-width: 100%;
}
.content :deep(video) {
  width: 100%;
  height: 480px;
}
</style>
