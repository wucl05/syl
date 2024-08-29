<template>
  <div class="flex flex-col justify-center items-center w-full h-full m-auto">
    <img :src="img || info.img" class="max-w-full block m-auto min-h-1" />
    <p class="mt-4 2xl:mt-6 text-lg xl:text-xl  2xl:text-2xl text-gray-400">{{ text || info.text }}</p>
  </div>
</template>
<script setup lang='ts'>
import emptyImg from '~/assets/images/empty_1.webp'
import errorImg from '~/assets/images/empty_2.webp'
import emptyLang from 'locales/empty'
const { locale } = useI18n()
defineOptions({
  name: 'Empty'
})
const props = defineProps({
  type: {
    type: String,
    default: 'empty' // error
  },
  img: {
    type: String,
    default: ''
  },
  imgWidth:{
    type: Number,
    default: 200
  },
  imgHeight:{
    type: Number,
    default: 200
  },
  text:{
    type: String,
    default: ''
  }
})
const info = computed(() => {
  return {
    img: props.type === 'error' ? errorImg : emptyImg,
    text: props.type === 'error' ? emptyLang[locale.value].error : emptyLang[locale.value].empty,
  }
})
</script>
<style scoped>
</style>
