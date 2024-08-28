<template>
  <div class="outline-none"
    :tabindex="0"
    autofocus
    @keydown.prevent.space="playing = !playing"
    @keydown.right="currentTime += 10"
    @keydown.left="currentTime -= 10">

    <div class="m-auto box-border bg-gray-50 dark:bg-black py-2 lg:px-12 px-5">
      <UBreadcrumb class="max-w-main m-auto" :links="links" :ui="{
        divider: {
          base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 text-black dark:text-white sm:opacity-70',
        },
      }" >
      </UBreadcrumb>
    </div>
    <div class="max-w-main m-auto text-center py-14 ">
      <h1 class="text-4xl font-bold text-[#222] dark:text-white">{{ info.title }}</h1>
      <h4 class="time mt-[.56rem] text-[#666]">{{ info.publishDate }}</h4>
    </div>
    <div class="video-container flex flex-col lg:flex-row items-center justify-space-between lg:gap-10 gap-5">
      <nuxt-link :to="info.prev.id?`/live/${info.prev.id}`:''" :class="['order-3 lg:order-1 prev flex flex-shrink-0 items-center justify-start 2xl:w-96 xl:w-80 lg:w-60 w-full md:pl-10 md:pr-5 md:py-4 pl-4 lg:pl-12 pr-7 py-6 ease-in-out duration-300',info?.prev?.id? 'xl:hover:bg-primary-blue bg-primary-blue lg:bg-transparent cursor-pointer opacity-100' :'h-0 opacity-0']">
        <div class="w-16 h-16 bg-primary-yelleow shrink-0 mr-5 2x:mr-7 flex flex-col items-center justify-center">
          <UIcon name="humbleicons:chevron-left" class="w-6 h-6 text-black"></UIcon>
        </div>
        <div class="child line-clamp-2 break-words text-white">{{info.prev.title}}</div>
      </nuxt-link>
      <div class="max-w-[55.75rem] w-full m-auto flex-1 sm:px-4 lg:px-0 content order-2 lg:order-2 pb-4 xl:pb-8">
        <div class="relative aspect-w-16 aspect-h-9">
          <ClientOnly>

            <!-- <video ref="video" class="w-full h-full bg-black" crossorigin="anonymous" controls autoplay
              :loop="true"/> -->
              <Myvideo
                v-if="info.liveVideoUrl"
               :src="info.liveVideoUrl"
            ></Myvideo>
          </ClientOnly>
          <!-- <div
            v-if="waiting"
            class="absolute inset-0 grid place-items-center pointer-events-none bg-black bg-opacity-20"
          >
            <UIcon name="svg-spinners:pulse-3" class="text-white w-40 h-40"/>
          </div>
          <div @click="playing = !playing" v-if="!playing" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black bg-opacity-50 border-white border-solid border flex justify-center flex-col items-center cursor-pointer">
            <UIcon name="heroicons:play-solid" class="text-white w-6 h-6" />
          </div> -->
        </div>
      </div>
      <nuxt-link :to="info.next.id?`/live/${info.next.id}`:''" :class="['order-3 lg:order-3 next flex flex-shrink-0 items-center justify-end 2xl:w-96 xl:w-80 lg:w-60 w-full pr-4 lg:pr-12 pl-7 md:pr-10 md:pl-5 md:py-4 py-6  ease-in-out duration-300',info?.next?.id?'xl:hover:bg-primary-blue bg-primary-blue lg:bg-transparent cursor-pointer opacity-100':'h-0 opacity-0']">
        <div class="w-16 h-16 bg-primary-yelleow shrink-0 ml-5 2x:ml-7 flex flex-col items-center justify-center order-2">
          <UIcon name="humbleicons:chevron-right" class="w-6 h-6 text-black"></UIcon>
        </div>
        <div class="child line-clamp-2 break-words text-white order-1">{{info.next.title}}</div>
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
const info:LiveDetail = ref({})
const video = ref()
loading.value = true
const res:LiveDetailResponseData<LiveDetail>  = await liveApi.liveVideoDetail(id);
console.log('res===',res)
const {data} = res
data.prev = data?.prev ?? {}
data.next = data?.next ?? {}
info.value = data ?? {}
loading.value = false
title.value = data?.title??''

// const { playing, currentTime, volume,waiting } = useMediaControls(video, {
//   src: data.videoUrl ?? '',
// })
onMounted(() => {
})

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
.child {
  @apply invisible;
}

.prev:hover .child,
.next:hover .child {
  @apply visible;
}
</style>
