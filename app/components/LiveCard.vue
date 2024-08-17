<template>
  <div class="live-card cursor-pointer" @click="handleClickItem(0)">
    <div @click.stop="handleClickItem(1)" class="live-card-mask relative" v-if="isVideo">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black bg-opacity-50 border-white border-solid border flex justify-center flex-col items-center cursor-pointer">
        <UIcon name="heroicons:play-solid" class="text-white w-6 h-6" />
      </div>
      <div class="aspect-w-16 aspect-h-9">
        <img :src="item.coverImg" :alt="item.title" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-lg text-black dark:text-white line-clamp-2">{{ item.title }}</h3>
      <div class="text-sm text-[#6e6e6e] mt-1">{{ item.publishDate }}</div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { useDebounceFn } from '@vueuse/core';
import type { LiveItem } from 'types/live'
defineOptions({
  name: 'LiveCard'
})
defineProps({
  item:{
    type:Object as PropType <LiveItem>,
    required:true
  },
  isVideo:{
    type:Boolean,
    default:false
  }
})
const emits = defineEmits(['clickItem','play'])
const handleClickItem = useDebounceFn((type:number) => {
  const tmp = {
    0:()=>emits('clickItem'),
    1:()=>emits('play')
  }
  tmp[type]()

},100,
{
  maxWait: 1000,
})
</script>
