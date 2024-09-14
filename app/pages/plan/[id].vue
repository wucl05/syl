<template>
  <div class="bg-[#fff]">
    <section v-if="info.data?.bgImg"
      class="relative flex flex-col bg-no-repeat bg-cover bg-center w-full aspect-[120/37.5] min-h-60 m-auto"
      :style="{ 'background-image': `url(${info.data?.bgImg ?? ''})` }">
      <div class="absolute w-full h-full z-10 row fc">
        <div class="p-4 max-w-main m-auto w-full text-white text-left hidden lg:block">
          <h1 class="text-2xl lg:text-[36px] font-bold">{{ info.data?.title ?? '' }}</h1>
          <div class="mt-[20px] text-[14px] line-clamp-2">{{ info.data?.introduction ?? '' }}</div>
          <NuxtLink to='/product/data' @click="handleClick"
            class="cursor-pointer mt-4 lg:mt-[20px] py-[1px] px-[38px] mx-auto text-[16px] leading-10 border-2 border-white hover:border-black dark:hover:border-white border-solid text-center inline-block box-border hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition delay-150 duration-300 ease-in-out">
            {{ lang[locale]['buy'] }}</NuxtLink>
        </div>
      </div>
      <div class="absolute bg-[rgba(0,0,0,0.2)] w-full h-full left-[0px] top-[0px]"></div>
    </section>
    <section class="m-auto box-border lg:px-12 px-4 py-6 bg-white text-black">
      <h1 class="block lg:hidden font-semibold text-2xl sm:text-3xl md:text-4xl xl:text-7xl">{{ info.data?.title ?? ''
        }}
      </h1>
      <div class="block lg:hidden mt-3 font-semibold text-xl">{{ info.data?.introduction ?? '' }}</div>
      <div class="max-w-main m-auto">
        <MUIBreadcrumb type="dark" class="mt-6 lg:mt-0" :links="links" :ui="{
          divider: {
            base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 text-black sm:opacity-70',
          },
        }">
        </MUIBreadcrumb>
      </div>
    </section>
    <section class="bg-white bg-no-repeat bg-cover bg-center w-full lg:aspect-[120/47.06] m-auto text-center text-black"
      :style="{ 'background-image': `url(${bannerCard})` }">
      <h2 class="mb-4 lg:text-[32px] mt-[52px] text-[32px] font-semibold">{{ planLang[locale]['plan:advantages'] }}</h2>
      <p class="text-[#666]">{{ info.data?.advantageDesc ?? '' }}</p>
      <div v-if="info.data?.solutionAdvantageList?.length"
        class="gap-4 px-4 xl:px-0 flex items-center overflow-x-auto hide-scrollbar m-auto max-w-main mt-20">
        <div v-for="(item, index) in info.data.solutionAdvantageList" :key="index"
          class="card cursor-pointer w-[16.88rem] h-[21.25rem] box-border py-8 px-5 shrink-0 bg-white overflow-hidden relative">
          <div
            class="card-child-0 py-8 px-5 transition-all duration-300 ease-in-out w-full h-full bg-white box-border border-b-4 border-solid absolute z-10 top-0 left-0 translate-y-0 opacity-100">
            <div v-if="item.icon" class="w-[7.75rem] h-[7.75rem] m-auto mt-2">
              <img :alt="item.title" :src="item.icon" class="w-full h-full object-cover block" />
            </div>
            <h4 class="text-[18px] font-bold" :class="['font-semibold', item.icon ? 'mt-7' : 'mt-2']">{{ item.title }}</h4>
            <!-- <p class="text-gray-500 line-clamp-3 text-sm mt-5">{{ item.describe }}</p> -->
          </div>
          <div
            class="card-child transition-all duration-300 ease-in-out w-full h-full bg-white box-border border-b-4 border-[#373277] border-solid absolute z-20 top-0 left-0 translate-y-full opacity-0">
            <h4 class="font-bold text-[18px] mt-7 mb-2">{{ item.title }}</h4>
            <p class="text-[#555] px-5 mt-[22px] text-[14px]">{{ item.describe }}</p>
            <!-- <ul v-if="item?.describe" class="list-disc  pl-9 text-left text-sm text-gray-500 mt-3">
              <li v-for="(li, idx) in item.describe?.split('\n')" :key="idx" :class="[!li ? 'list-none' : '']">{{ li }}
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </section>

    <section class="w-full max-w-main m-auto text-center text-black dark:text-black py-5 px-4 xl:px-0 lg:py-[64px]">
      <h2 class=" mb-4 lg:text-[32px] text-[28px]  font-semibold mb-[64px]">{{ planLang[locale]['plan:diagram'] }}
      </h2>
      <img v-if="info?.data?.sysImg" :alt="planLang[locale]['plan:diagram']" :src="info?.data?.sysImg ?? ''"
        class="max-w-full object-cover m-auto block" />
    </section>
    <section class="w-full m-auto text-center bg-[#F6F7F9] text-black py-5 px-4 xl:px-0 lg:py-[64px]">
      <div class="max-w-main m-auto">
        <h2 class="lg:text-[32px] text-[28px] font-semibold mb-[64px]">{{ planLang[locale]['plan:recommendation'] }}
        </h2>
        <UCarousel v-if="info?.data?.productList?.length" :items="info.data.productList" :ui="{
          item: 'basis-full lg:basis-1/3',
          container: 'rounded-lg',
          indicators: {
            wrapper: 'relative bottom-0 mt-8'
          }
        }" indicators :prev-button="{
    color: 'gray',
    icon: 'i-heroicons:chevron-left-20-solid',
    class: '-left-2 lg:-left-12'
  }" :next-button="{
    color: 'gray',
    icon: 'i-heroicons:chevron-right-20-solid',
    class: '-right-2 lg:-right-12'
  }" arrows class="rounded-lg lg:-mx-3 block lg:hidden">
          <template #default="{ item }">
            <div class="w-full lg:px-3 box-bordermx-auto text-center">
              <div
                class="card-box bg-white px-3 hover:shadow-lg rounded-lg  transition delay-150 duration-300 ease-in-out">
                <div class="row fc w-full">
                  <div class="w-[280px] h-[280px] row fc">
                    <img :src="item.coverImg" class="min-w-[95%] max-w-[95%]" draggable="false" />
                  </div>
                </div>
                <h3 class="mt-4 text-2xl font-semibold lineOne">
                  {{ item.name }}
                </h3>
                <p class="text-sm mt-3 text-gray-400">{{ item.categoryName }}</p>
                <div class="col fc">
                  <NuxtLink to="/"
                    class="btn text-black cursor-pointer mb-[62px] px-[38px] mx-auto mt-7 md:w-[9.75rem] leading-8 border border-black border-solid text-center inline-block box-border hover:border-primary-blue hover:bg-primary-blue hover:text-white transition delay-150 duration-300 ease-in-out">
                    {{ planLang[locale]['plan:more'] }}</NuxtLink>
                </div>
              </div>
            </div>
          </template>
          <template #indicator="{ onClick, page, active }">
            <div :class="['w-12 h-[3px] bg-black cursor-pointer', active ? '' : 'bg-opacity-20']"
              @click="onClick(page)"></div>
          </template>
        </UCarousel>
        <UCarousel v-if="info?.data?.productArr?.length" :items="info.data.productArr" :ui="{
          item: 'basis-full',
          container: 'rounded-lg',
          indicators: {
            wrapper: 'relative bottom-0 mt-8'
          }
        }" :indicators="info.data.productArr.length > 1" :prev-button="{
    color: 'gray',
    icon: 'i-heroicons:chevron-left-20-solid',
    class: '-left-12'
  }" :next-button="{
    color: 'gray',
    icon: 'i-heroicons:chevron-right-20-solid',
    class: '-right-12'
  }" :arrows="info.data.productArr.length > 1" class="rounded-lg lg:-mx-3 hidden lg:block">
          <template #default="{ item }">
            <div class="lg:basis-1/3" v-for="(child, idx) in item" :key="idx">
              <div class="w-full lg:px-3 lg:pb-3 mx-auto text-center">
                <div
                  class="py-[5px] card-box bg-white px-3 hover:shadow-lg rounded-lg  transition delay-150 duration-300 ease-in-out">
                  <div class="row fc w-full">
                    <div class="w-[280px] h-[280px] row fc">
                      <img :src="child.coverImg" class="min-w-[95%] max-w-[95%] max-h-[100%] object-contain"
                        draggable="false" />
                    </div>
                  </div>
                  <h3 class="mt-[0px] text-2xl font-semibold lineOne">
                    {{ child.name }}
                  </h3>
                  <p class="text-sm mt-3 text-gray-400">{{ child.categoryName }}</p>
                  <NuxtLink :to="`/details/${child.id}`"
                    class="btn text-black cursor-pointer mx-auto mt-7 mb-[52px] md:w-[9.75rem] leading-8 border border-black border-solid text-center inline-block box-border hover:border-primary-blue hover:bg-primary-blue hover:text-white transition delay-150 duration-300 ease-in-out">
                    {{ planLang[locale]['plan:more'] }}</NuxtLink>
                </div>
              </div>
            </div>
          </template>
          <template #indicator="{ onClick, page, active }">
            <div :class="['w-12 h-[3px] bg-black cursor-pointer', active ? '' : 'bg-opacity-20']"
              @click="onClick(page)"></div>
          </template>
        </UCarousel>
      </div>
    </section>

    <section :class="{ 'hidden': !info.data?.successCaseList?.length }"
      class="w-full m-auto text-center bg-white text-black py-5 px-4 xl:px-0 lg:py-24">
      <div class="max-w-main m-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 class="lg:text-[32px] text-[28px] font-semibold">{{ planLang[locale]['plan:cases'] }}</h2>
          <NuxtLink :to="`/cases?id=${id}`"
            class="hidden lg:inline-block px-4 text-black cursor-pointer md:min-w-[9.75rem] leading-8 border-2 border-black border-solid text-center box-border hover:border-primary-blue hover:bg-primary-blue hover:text-white transition delay-150 duration-300 ease-in-out">
            {{ planLang[locale]['plan:all'] }}</NuxtLink>
        </div>
        <UCarousel v-if="info?.data?.successCaseList?.length" :items="info.data.successCaseList" :ui="{
          item: 'basis-full lg:basis-1/3',
          container: 'rounded-lg',
          indicators: {
            wrapper: 'relative bottom-0 mt-8'
          }
        }" :indicators="info.data?.successCaseList?.length > 1 && width < 1024" :prev-button="{
    color: 'gray',
    icon: 'i-heroicons:chevron-left-20-solid',
    class: '-left-2 xl:-left-12'
  }" :next-button="{
    color: 'gray',
    icon: 'i-heroicons:chevron-right-20-solid',
    class: '-right-2 xl:-right-12'
  }" :arrows="info.data?.successCaseList?.length > 1 && width < 1024" class="rounded-lg lg:-mx-3">
          <template #default="{ item }">
            <div class="w-full lg:px-3 box-bordermx-auto text-left">
              <div class="bg-[#F6F7F9]">
                <img :src="item.coverImg" class="w-full aspect-[22.5/12.63] m-auto block" draggable="false" />
                <div class="p-6">
                  <h3 class="text-2xl font-semibold lineOne">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm mt-4 text-gray-400">{{ item.countryName }}&nbsp;｜&nbsp;{{ item.district }}</p>
                  <p class="text-sm mt-4 text-gray-400">{{ planLang[locale]['plan:year'] }}</p>
                  <h4 class="text-sm font-semibold">{{ item.year }}</h4>
                  <p class="text-sm mt-4 text-gray-400">{{ planLang[locale]['plan:scale'] }}</p>
                  <h4 class="text-sm font-semibold">{{ item.scale }}</h4>
                </div>
              </div>
            </div>
          </template>
          <template #indicator="{ onClick, page, active }">
            <div :class="['w-12 h-[3px] bg-black cursor-pointer', active ? '' : 'bg-opacity-20']"
              @click="onClick(page)"></div>
          </template>
        </UCarousel>
        <NuxtLink :to="`/cases?id=${id}`"
          class="lg:hidden mt-12 block px-4 text-black cursor-pointer leading-8 border-2 border-black border-solid text-center box-border hover:border-primary-blue hover:bg-primary-blue hover:text-white transition delay-150 duration-300 ease-in-out">
          {{ planLang[locale]['plan:all'] }}</NuxtLink>
      </div>
    </section>
    <section class="m-auto flex-row md:flex items-center justify-center">
      <NuxtLink to='/product/data' click="handleClick"
        class="w-full md:w-1/2 flex py-10 items-center justify-center bg-[#F4F5F5] cursor-pointer">
        <img :src="msgImg" class="w-14 h-14 md:w-20 md:h-20 mr-4" />
        <h4 class="text-lg md:text-[1.75rem]">{{ planLang[locale]['plan:buy'] }}</h4>
        <Icon class="md:text-lg" name="i-heroicons:chevron-right"></Icon>
      </NuxtLink>
      <NuxtLink to="/ContactUs"
        class="w-full md:w-1/2 flex py-10 items-center justify-center bg-[#EBEFF2] cursor-pointer">
        <img :src="rocketImg" class="w-14 h-14 md:w-20 md:h-20 mr-4" />
        <h4 class="text-lg md:text-[1.75rem]">{{ planLang[locale]['plan:contact'] }}</h4>
        <Icon class="md:text-lg" name="i-heroicons:chevron-right"></Icon>
      </NuxtLink>
    </section>
  </div>
</template>
<script setup lang='ts'>
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useWindowSize, useDebounceFn } from '@vueuse/core'
import bannerCard from '~/assets/images/banner_10.jpg'
import msgImg from 'icons/msg.svg'
import rocketImg from 'icons/rocket.svg'
import type { Solution, SolutionResponseData } from '~/types/plan'
import lang from 'locales/live'
import planLang from 'locales/plan'
const { locale } = useI18n()
const { planApi } = useApi();
const route = useRoute() as RouteLocationNormalizedLoaded;
const { width } = useWindowSize()
const { id } = route.params;
console.log('route', route.name)
const links = ref([
  {
    label: lang[locale.value]['links:home'],
    labelClass: 'text-black',
    to: '/'
  },
  {
    label: lang[locale.value]['productTitle'],
    labelClass: 'text-black',
    to: '/'
  },
  {
    label: '',
    labelClass: 'text-black opacity-70',
  }
])
const loading = ref(false)
// const info:Solution = ref({})
function chunkArray(arr: any[], size: number): any[][] {
  let result: any[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

loading.value = true
// const res:SolutionResponseData<Solution>  = await planApi.getSolution(id);
const { refData: info }: Solution = await planApi.getSolution(id);
// const {refData} = res
console.log('refData', info)
info.value.data.productArr = info.value.data?.productList?.length ? chunkArray(info.value.data.productList, 3) : []
// info.value = info.value?.data ?? {}
links.value[2].label = info.value.data?.title ?? ''
loading.value = false
const description = info.value.data?.introduction ?? ''
useSeoMeta({
  title: info.value.title,
  keywords: info.value.title,
  ogTitle: info.value.title,
  description: description,
  ogDescription: description,
  ogImage: info.value.data?.sysImg ?? '',
  twitterImage: info.value.data?.sysImg ?? '',
  twitterCard: 'summary_large_image',
})

const handleClick = useDebounceFn(() => {
  console.log('点击产品')
}, 100,
  {
    maxWait: 1000,
  })
</script>
<style scoped>
.child {
  @apply lg:invisible;
}

.prev:hover .child,
.next:hover .child {
  @apply visible;
}

.card:hover .card-child-0 {
  @apply -translate-y-full opacity-0
}

.card:hover .card-child {
  @apply translate-y-0 opacity-100
}

.card-box:hover .btn {
  @apply border-primary-blue bg-primary-blue text-white
}

.hide-scrollbar::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.hide-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>
