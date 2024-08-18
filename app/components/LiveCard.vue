<template>
  <div :class="[!disabled&&'cursor-pointer',isFlex &&'flex flex-col sm:flex-row gap-8']" @click="handleClickItem(0)">
    <div @click.stop="handleClickItem(1)" class="relative" :class="{'flex-1 sm:flex-none w-full sm:w-[24%]':isFlex}">
      <div v-if="isVideo" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black bg-opacity-50 border-white border-solid border flex justify-center flex-col items-center cursor-pointer">
        <UIcon name="heroicons:play-solid" class="text-white w-6 h-6" />
      </div>
      <div class="aspect-w-16 aspect-h-9">
        <img :src="item.coverImg" :alt="item.title" class="w-full h-full object-cover" />
      </div>
    </div>
    <div :class="[isFlex?'flex-1 sm:flex-auto w-full sm:w-[76%] flex flex-col justify-between':'mt-4']">
      <h3 class="text-xl text-black font-bold dark:text-white line-clamp-2 break-words">{{ item.title }}</h3>
      <div v-if="item.summary && showInfo" class="text-sm mt-3 mb-1 flex-1 break-words line-clamp-4">{{ item.summary }}</div>
      <div v-if="showInfo"  class="text-sm text-[#6e6e6e] mt-1 shrink-0 flex justify-between items-center">
        <div>{{ item.publishDate }}</div>
        <div class="flex items-center">
          <div>了解详情</div>
           <UIcon name="humbleicons:chevron-right" class="w-3 h-3" />
          </div>
      </div>
    </div>
    <slot />
  </div>
</template>
<script setup lang='ts'>
import { useDebounceFn } from '@vueuse/core';
import type { LiveItem } from 'types/live'
defineOptions({
  name: 'LiveCard'
})
const props =defineProps({
  item:{
    type:Object as PropType <LiveItem>,
    required:true
  },
  isVideo:{
    type:Boolean,
    default:false
  },
  isFlex:{
    type:Boolean,
    default:false
  },
  showInfo:{
    type:Boolean,
    default:true
  },
  disabled:{
    type:Boolean,
    default:false
  }
})
const emits = defineEmits(['clickItem','play'])
const handleClickItem = useDebounceFn((type:number) => {
  if(props.disabled) return
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
