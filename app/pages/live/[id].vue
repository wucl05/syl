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
    <div class="max-w-main m-auto text-center py-14 ">
      <h1 class="text-4xl font-bold text-[#222] dark:text-white">{{ info?.data?.title || '' }}</h1>
      <h4 class="time mt-[.56rem] text-[#666]">{{ info?.data?.publishDate || '' }}</h4>
    </div>
    <div class="video-container flex flex-col lg:flex-row items-center justify-space-between lg:gap-10 gap-5">
      <nuxt-link :to="info?.data?.prev?.id?`/live/${info?.data?.prev?.id}`:''" :class="['order-3 lg:order-1 prev flex flex-shrink-0 items-center justify-start 2xl:w-96 xl:w-80 lg:w-60 w-full md:pl-10 md:pr-5 md:py-4 pl-4 lg:pl-12 pr-7 py-6 ease-in-out duration-300',info?.data?.prev?.id? 'xl:hover:bg-primary-blue bg-primary-blue lg:bg-transparent cursor-pointer opacity-100' :'h-0 opacity-0']">
        <div class="w-16 h-16 bg-primary-yelleow shrink-0 mr-5 2x:mr-7 flex flex-col items-center justify-center">
          <UIcon name="humbleicons:chevron-left" class="w-6 h-6 text-black"></UIcon>
        </div>
        <div class="child line-clamp-2 break-words text-white">{{info?.data?.prev?.title || ''}}</div>
      </nuxt-link>
      <div class="max-w-[55.75rem] w-full m-auto flex-1 sm:px-4 lg:px-0 content order-2 lg:order-2 pb-4 xl:pb-8">
        <div class="relative aspect-w-16 aspect-h-9">
          <ClientOnly>
              <Myvideo
                v-if="info?.data?.liveVideoUrl"
               :src="info?.data?.liveVideoUrl"
            ></Myvideo>
          </ClientOnly>
        </div>
      </div>
      <nuxt-link :to="info?.data?.next?.id?`/live/${info?.data?.next?.id}`:''" :class="['order-3 lg:order-3 next flex flex-shrink-0 items-center justify-end 2xl:w-96 xl:w-80 lg:w-60 w-full pr-4 lg:pr-12 pl-7 md:pr-10 md:pl-5 md:py-4 py-6  ease-in-out duration-300',info?.data?.next?.id?'xl:hover:bg-primary-blue bg-primary-blue lg:bg-transparent cursor-pointer opacity-100':'h-0 opacity-0']">
        <div class="w-16 h-16 bg-primary-yelleow shrink-0 ml-5 2x:ml-7 flex flex-col items-center justify-center order-2">
          <UIcon name="humbleicons:chevron-right" class="w-6 h-6 text-black"></UIcon>
        </div>
        <div class="child line-clamp-2 break-words text-white order-1">{{info?.data?.next?.title || ''}}</div>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { useDebounceFn,useMediaControls } from '@vueuse/core';
import type { LiveDetail,LiveDetailResponseData } from '~/types/live'
import lang from 'locales/live'
import Myvideo from './video.vue'
const { locale } = useI18n()
const { liveApi } = useApi();
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
    label: lang[locale.value]['links:live'],
    labelClass:'text-black dark:text-white',
    to: '/live'
  },
]
const title =ref('');
const loading = ref(false)
// const info:LiveDetail = ref({})
// const video = ref()
loading.value = true
const {refData:info}:LiveDetail  = await liveApi.liveVideoDetail(id);
console.log('res===',info)
info.value.data.prev = info?.value?.data?.prev ?? {}
info.value.data.next = info?.value?.data?.next ?? {}
loading.value = false
title.value = info?.value?.data?.title??''

// const { playing, currentTime, volume,waiting } = useMediaControls(video, {
//   src: data.videoUrl ?? '',
// })
// onMounted(() => {
// })

console.log('info.value',info.value)
const videoWidth = 1280;
const videoHeight = 720;

useSeoMeta({
  title: title,
  // keywords:keywords,
  ogTitle: title,
  // description: description,
  // ogDescription: description,
  ogVideo: info?.value?.data?.videoUrl??'',
  ogVideoType: 'video/mp4',
  ogVideoWidth: videoWidth,
  ogVideoHeight: videoHeight,
  ogVideoSecureUrl: info?.value?.data?.videoUrl??'',
  twitterCard: 'player',
  twitterPlayer: info?.value?.data?.videoUrl??'',
  twitterPlayerWidth: videoWidth,
  twitterPlayerHeight: videoHeight,
})
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
