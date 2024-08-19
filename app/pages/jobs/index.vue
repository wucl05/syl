<template>
  <section class="banner flex flex-col bg-no-repeat bg-cover bg-center w-full md:min-h-[400px] min-h-60 m-auto" :style="{'background-image': `url(${banner})`}">
    <div class="p-4 max-w-main m-auto w-full text-white text-left">
      <h1 class="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold">{{ title }}</h1>
    </div>
  </section>
  <div class="pl-4 pr-4 max-w-main m-auto box-border">
    <UBreadcrumb :links="links" class="sm:-mt-[1.8rem] mt-[1rem]" :ui="{
      divider: {
        base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 sm:text-white text-black dark:text-white sm:opacity-70',
      },
    }" >
    </UBreadcrumb>
  </div>
  <section class="px-4 2xl:px-0 my-8 sm:my-12 md:my-16 xl:my-20">
    <div class="max-w-main m-auto ">
      <div class="flex flex-col-reverse lg:flex-row justify-center items-center gap-10">
        <div class="w-full lg:w-1/2">
          <h2 class="font-bold text-4xl mb-8">{{ JobsLang[locale]['jobs']['section1']['title'] }}</h2>
          <div class="before:block before:shrink-0 before:w-[0.38rem] before:h-[0.38rem] before:mt-2 before:mr-2 before:-inset-1 before:bg-primary-blue flex mt-4" v-for="(item, index) in JobsLang[locale]['jobs']['section1']['list']" :key="index">
            {{ item }}
          </div>
          <NuxtLink :to="link" class="w-40 h-10 text-sm leading-10 border border-solid text-center font-bold inline-block box-border mt-9 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition delay-150 duration-300 ease-in-out">{{ title }}</NuxtLink>
        </div>
        <div class="w-full lg:w-1/2">
          <img :src="imgCard0" :alt="JobsLang[locale]['jobs']['section1']['title']" class="w-full object-cover block m-auto" />
        </div>
      </div>
    </div>
  </section>
  <section class="px-4 2xl:px-0 my-8 sm:my-12 md:my-16 xl:my-20 bg-no-repeat bg-cover bg-center h-[37.5rem] m-auto before:block before:absolute before:-inset-1 before:bg-opacity-90 before:bg-primary-blue relative flex flex-col items-center overflow-hidden text-white" :style="{'background-image': `url(${banner2})`}">
    <div class="w-full max-w-main m-auto relative z-10 ">
      <h2 class="font-bold text-4xl mb-8">{{ JobsLang[locale]['jobs']['section2']['title'] }}</h2>
      <div class="before:block before:shrink-0 before:w-[0.38rem] before:h-[0.38rem] before:mt-2 before:mr-2 before:-inset-1 before:bg-primary-yelleow flex mt-4 relative " v-for="(item, index) in JobsLang[locale]['jobs']['section2']['list']" :key="index">
        {{ item }}
      </div>
      <NuxtLink :to="link" class="w-40 h-10 text-sm leading-10 border border-solid text-center font-bold inline-block box-border mt-9 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition delay-150 duration-300 ease-in-out">{{ title }}</NuxtLink>

    </div>
  </section>
  <section class="px-4 2xl:px-0 my-8 sm:my-12 md:my-16 xl:my-20">
    <div class="max-w-main m-auto ">
      <h2 class="font-bold text-4xl mb-8">{{ JobsLang[locale]['jobs']['section3']['title'] }}</h2>
      <div class="flex-row lg:flex justify-center gap-5">
        <div class="flex-1" v-for="(item, index) in JobsLang[locale]['jobs']['section3']['list']" :key="index">
          <div class="w-full relative overflow-hidden rounded-lg">
            <img :src="imgCards[index]" :alt="JobsLang[locale]['jobs']['section1']['title']" class="rounded-lg w-full object-cover block m-auto hover:scale-110 transition delay-150 duration-300 ease-in-out" />
          </div>
          <div class="p-5 text-black dark:text-white">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="text-center">
        <NuxtLink :to="link" class="w-40 h-10  mt-9 mx-auto text-sm leading-10 border border-solid text-center font-bold inline-block box-border hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition delay-150 duration-300 ease-in-out">{{ title }}</NuxtLink>
      </div>
    </div>
  </section>

</template>
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import banner from '~/assets/images/banner_6.jpg'
import banner2 from '~/assets/images/banner_7.jpg'
import imgCard0 from '~/assets/images/jobs_card_0.jpg'
import imgCard1 from '~/assets/images/jobs_card_1.jpg'
import imgCard2 from '~/assets/images/jobs_card_2.jpg'
import imgCard3 from '~/assets/images/jobs_card_3.jpg'
import lang from 'locales/live'
import JobsLang from 'locales/jobs'
const { locale } = useI18n()
const link = ref('https://www.risenenergy.com/contact/join_list?lx=1')
const title = lang[locale.value]['links:jobs'];
const imgCards = [imgCard1, imgCard2, imgCard3]
const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 1000)

// useSeoMeta({
//     title: title,
//     keywords:keywords,
//     ogTitle: title,
//     description: description,
//     ogDescription: description,
//     ogImage: list?.[0]?.coverImg??banner,
//     twitterImage: list?.[0]?.coverImg??banner,
//     twitterCard: 'summary_large_image',
//   })
//   defineOgImage({
//     component: 'events',
//     title: title,
//     description: description,
//     keywords:keywords
//   })
// 链接
const links = [
  {
    label: lang[locale.value]['links:home'],
    labelClass:'text-black dark:text-white sm:text-white',
    to: '/'
  },
  {
    label: lang[locale.value]['links:jobs'],
    labelClass:'text-black dark:text-white sm:text-white opacity-70',
  }
]
</script>
<style scoped>
.li-square{
  position: relative;
}
.li-square::before{
  content: '';
  width: 0.38rem;
  height: 0.38rem;
  flex-shrink: 0;
  margin-right: 0.5rem;
  display: block;
  margin-top: 0.5rem;
}
.square-blue::before{
  background-color: #003F97;
}
</style>
