<template>
  <div class="m-auto box-border bg-gray-50 dark:bg-black py-2 lg:px-12 px-5">
    <UBreadcrumb class="max-w-main m-auto" :links="links" :ui="{
      divider: {
        base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 text-black dark:text-white sm:opacity-70',
      },
    }" >
    </UBreadcrumb>
  </div>
  <div class="max-w-[55.75rem] m-auto text-center py-14">
    <h1 class="text-4xl font-bold text-[#222] dark:text-white">{{ info.title }}</h1>
    <h4 class="time mt-[.56rem] text-[#666]">{{ info.publishDate }}</h4>
    <div class="video-box relative mt-14 bg-gray-100"
    autofocus
    @keydown.prevent.space="playing = !playing"
    @keydown.right="currentTime += 10"
    @keydown.left="currentTime -= 10">
      <video ref="video" class="w-full h-full" :poster="info.coverImg" crossorigin="anonymous"
        :loop="true"
        @click="playing = !playing" />
      <div
        v-if="waiting"
        class="absolute inset-0 grid place-items-center pointer-events-none bg-black bg-opacity-20"
      >
        <UIcon name="svg-spinners:pulse-3" class="text-white w-40 h-40"/>
      </div>
      <div @click="playing = !playing" v-if="!playing" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black bg-opacity-50 border-white border-solid border flex justify-center flex-col items-center cursor-pointer">
        <UIcon name="heroicons:play-solid" class="text-white w-6 h-6" />
      </div>
    </div>

  </div>
</template>
<script setup lang='ts'>
import { useDebounceFn,useMediaControls } from '@vueuse/core';
import type { LiveDetail,LiveDetailResponseData } from '~/types/live'
import lang from 'locales/live'
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
const info:LiveDetail = ref({})
const video = ref()
loading.value = true
const res:LiveDetailResponseData<LiveDetail>  = await liveApi.liveVideoDetail(id);
console.log('res===',res)
const {data} = res
info.value = data ?? {}
loading.value = false
title.value = data?.title??''
const { playing, currentTime, duration, volume,waiting } = useMediaControls(video, {
  src: data.videoUrl ?? '',
})
// onMounted(() => {
//   volume.value = 0.5
//   currentTime.value = 60
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
  ogVideo: data?.videoUrl??'',
  ogVideoType: 'video/mp4',
  ogVideoWidth: videoWidth,
  ogVideoHeight: videoHeight,
  ogVideoSecureUrl: data?.videoUrl??'',
  twitterCard: 'player',
  twitterPlayer: data?.videoUrl??'',
  twitterPlayerWidth: videoWidth,
  twitterPlayerHeight: videoHeight,
})
</script>
<style scoped>
</style>
