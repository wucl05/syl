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
    <div class="row lg:h-[168px] h-[128px] cursor-pointer  w-full fc bg-[#EBEFF2]"
      @click="navigateTo({ path: '/ContactUs' })">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" style="transform: scale(0.6);">
        <g transform="translate(-410)">
          <rect class="connectUsIconA" width="80" height="80" transform="translate(410)" />
          <path class="connectUsIconB"
            d="M102.911,48.125a.424.424,0,0,0-.35-.35,29.464,29.464,0,0,0-9.186-.928,34.048,34.048,0,0,0-5.411.719,39.793,39.793,0,0,0-13.5,5.773,51.425,51.425,0,0,0-10.624,9.438.517.517,0,0,1-.443.2,21.44,21.44,0,0,0-2.515.1,19.133,19.133,0,0,0-7.04,2.1,28.7,28.7,0,0,0-7.089,5.54c-.16.16-.055.215.068.3.646.43,1.291.867,1.937,1.3q4.86,3.256,9.721,6.517c.141.1.283.154.16.4a6.609,6.609,0,0,0-.5,4.58,11.046,11.046,0,0,0,7.7,8.343,7.079,7.079,0,0,0,5.361-.2c.221-.1.307-.062.43.123q1.706,2.573,3.425,5.14,2.195,3.292,4.4,6.591c.1.16.166.289.369.068.381-.418.793-.8,1.187-1.205a26.369,26.369,0,0,0,4.458-5.958,19.127,19.127,0,0,0,2.177-9.555.572.572,0,0,1,.209-.5,55.4,55.4,0,0,0,5.2-5.134,45.443,45.443,0,0,0,7.6-11.59,35.644,35.644,0,0,0,3.228-14.387c-.012-.289-.031-.572-.037-.861A27.354,27.354,0,0,0,102.911,48.125ZM98.275,69.5a42.718,42.718,0,0,1-6.566,10.009,53.9,53.9,0,0,1-6.161,6.038.722.722,0,0,0-.3.652,20.42,20.42,0,0,1-.375,5.435,17.8,17.8,0,0,1-3.271,6.775q-.655.858-1.365,1.66c-.252.277-.252.277-.455-.025q-3.32-4.971-6.634-9.942c-.246-.369-.5-.726-.726-1.1-.123-.209-.221-.252-.449-.123A17.39,17.39,0,0,1,70.024,89.9a5,5,0,0,1-3.689-.062,8.847,8.847,0,0,1-5.786-6.13,4.677,4.677,0,0,1,.5-3.953c.252-.4.443-.83.695-1.23.129-.209.068-.3-.117-.424q-5.238-3.5-10.464-7.009c-.2-.135-.406-.283-.609-.412-.135-.086-.172-.148-.037-.271a19.138,19.138,0,0,1,8.626-4.66,18.834,18.834,0,0,1,5.22-.375.68.68,0,0,0,.621-.283,49.909,49.909,0,0,1,11.036-9.93,37.15,37.15,0,0,1,12.536-5.288,31.661,31.661,0,0,1,5.534-.682,27.4,27.4,0,0,1,6.53.553.375.375,0,0,1,.338.35,26.246,26.246,0,0,1,.559,5.46A33.152,33.152,0,0,1,98.275,69.5ZM60.813,90.235A3.14,3.14,0,0,0,58,90.143,4.918,4.918,0,0,0,55.366,92.8a26.462,26.462,0,0,0-1.74,5.355c-.068.283.086.252.271.215a26.961,26.961,0,0,0,3.025-.781A11.589,11.589,0,0,0,60.291,96a4.336,4.336,0,0,0,1.832-3.228A2.667,2.667,0,0,0,60.813,90.235Zm-1.058,2.4A1.85,1.85,0,0,1,59.018,94a6.852,6.852,0,0,1-2.054,1.07,6.52,6.52,0,0,1,1.211-2.275,1.723,1.723,0,0,1,1.193-.56C59.676,92.227,59.768,92.319,59.756,92.639Zm23.05-31.061a4.725,4.725,0,1,0,4.728,4.728A4.753,4.753,0,0,0,82.806,61.578Zm-.012,7.1a2.361,2.361,0,1,1,2.373-2.355A2.354,2.354,0,0,1,82.794,68.673Z"
            transform="translate(374.402 -35.724)" />
        </g>
      </svg>
      <div class="pr-2 text-[#000]">
        {{ lang[locale].contactUs }}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 22.505 12.313"
        :style="{ transform: `rotate(90deg)` }" class="transition-all	duration-500">
        <path class="arrow" d="M-2818.212-8300.454l10.723-10.723,10.722,10.723"
          transform="translate(2818.742 8312.237)" />
      </svg>
    </div>
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
  .connectUsIconA {
  fill: #fff;
  opacity: 0;
}

.connectUsIconB {
  stroke: #000;
  stroke-width: 0.5px;
}

.arrow {
  fill: none;
  stroke: #000;
  stroke-width: 1.5px;
}
</style>
