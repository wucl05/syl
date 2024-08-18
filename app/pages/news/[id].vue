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
    <div class="video-container flex items-center justify-space-between gap-10">
      <nuxt-link :to="info.prev.id?`/live/${info.prev.id}`:''" :class="['prev sm:flex hidden flex-shrink-0 items-center justify-start 2xl:w-96 xl:w-80 lg:w-60 md:w-40 sm:w-10 md:pl-10 md:pr-5 md:py-4 pl-12 pr-7 py-6 ease-in-out duration-300',info?.prev?.id?'xl:hover:bg-primary-blue cursor-pointer opacity-100':'cursor-not-allowed opacity-50']">
        <div class="md:w-10 md:h-10 2xl:w-16 2xl:h-16 bg-primary-yelleow shrink-0 md:mr-5 2x:mr-7 flex flex-col items-center justify-center">
          <UIcon name="humbleicons:chevron-left" class="w-6 h-6"></UIcon>
        </div>
        <div class="sm:hidden xl:block child line-clamp-2 break-words text-white">{{info.prev.title}}</div>
      </nuxt-link>
      <div class="max-w-[55.75rem] m-auto flex-1 px-4 sm:px-0">
        <article v-html="info.content">
        </article>
        <content></content>
      </div>
      <nuxt-link :to="info.next.id?`/live/${info.next.id}`:''" :class="['next sm:flex hidden flex-shrink-0 items-center justify-end 2xl:w-96 xl:w-80 lg:w-60 md:w-40 sm:w-10 pr-12 pl-7 md:pr-10 md:pl-5 md:py-4 py-6  ease-in-out duration-300',info?.next?.id?'xl:hover:bg-primary-blue cursor-pointer opacity-100':'cursor-not-allowed opacity-50']">
        <div class="order-2 md:w-10 md:h-10 2xl:w-16 2xl:h-16 bg-primary-yelleow shrink-0 md:ml-5 2x:ml-7 flex flex-col items-center justify-center">
          <UIcon name="humbleicons:chevron-right" class="w-6 h-6"></UIcon>
        </div>
        <div class="sm:hidden xl:block child line-clamp-2 break-words text-white order-1">{{info.next.title}}</div>
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
    label: lang[locale.value]['links:live'],
    labelClass:'text-black dark:text-white opacity-70',
    to: '/live'
  }
]
const title =ref('');
const loading = ref(false)
const info:NewsDetail = ref({})
loading.value = true
const res:NewsDetailResponseData<NewsDetail>  = await newsApi.newsDetail(id);
console.log('res===',res)
const {data} = res
data.prev = data?.prev ?? {}
data.next = data?.next ?? {}
info.value = data ?? {}
loading.value = false
title.value = data?.title??''

console.log('info.value',info.value)

// useSeoMeta({
//   title: title,
//   keywords:keywords,
//   ogTitle: title,
//   description: description,
//   ogDescription: description,
// })
</script>
<style scoped>
.child {
  @apply invisible;
}

.prev:hover .child,
.next:hover .child {
  @apply visible;
}
</style>
