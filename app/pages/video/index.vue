<template>
  <section class="relative banner flex flex-col bg-no-repeat bg-cover bg-center w-full md:min-h-[400px] min-h-60 m-auto"
    :style="{ 'background-image': `url(${banner})` }">
    <div class="absolute w-full h-full z-10 row fc">
      <div class="p-4 lg:p-0 max-w-main m-auto w-full text-white text-left">
        <h1 class="text-[28px] lg:text-[36px] font-bold">{{ title }}</h1>
      </div>
      <div class="hidden lg:block absolute bottom-[10px] w-[1092px]">
        <MUIBreadcrumb :links="links" />
      </div>
    </div>
    <div class="absolute bg-[rgba(0,0,0,0.2)] w-full h-full left-[0px] top-[0px]"></div>
  </section>
  <div class="pl-4 pr-4 m-auto box-border">
    <!-- <div class="max-w-main m-auto">
      <UBreadcrumb :links="links" class="sm:-mt-[1.8rem] mt-[1rem]" :ui="{
        divider: {
          base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 sm:text-white text-black dark:text-black sm:opacity-70',
        },
      }" >
      </UBreadcrumb>
    </div> -->
    <div class="bg-[#F6F7F9] mt-4 sm:mt-0 -mx-4">
      <div class="flex items-center gap-4 p-2 max-w-main m-auto ">
        <NuxtLink :to="item.value"
          class="px-5 py-2 font-semibold text-black rounded hover:bg-primary-blue hover:text-white"
          :class="{ 'bg-primary-blue text-white': item.value === `/${$route.name}` }" v-for="(item, idx) in tabs"
          :key="idx">{{ item.label }}</NuxtLink>
      </div>
    </div>
    <div class="max-w-main m-auto">
      <nav class="mt-10 md:mt-14 flex items-center gap-6 overflow-x-auto pr-4 hide-scrollbar">
        <span v-for="item in years" :key="item"
          class="py-[0.31rem] px-[0.75rem] rounded-[1rem] whitespace-nowrap transition ease-in-out cursor-pointer hover:bg-light-gray-1  hover:font-bold"
          :class="{ 'bg-light-gray-1 font-bold dark:bg-white': curYear === item }" @click="handleClickTab(item)">
          {{ item === 999 ? lang[locale]['years'] : item }}
        </span>
      </nav>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-10 md:mt-12">
        <LiveCard v-for="item in tableData.data" :item="item" :key="item.id" :isVideo="true"
          @clickItem="handleClickItem(item)" @play="handleClickItem(item)">
        </LiveCard>
      </div>
      <Empty :type="emptyType" v-if="tableData.total === 0 && !loading" />
      <div v-if="tableData.total > pageParams.pageSize" class="flex justify-center mb-10">
        <UPagination v-model="pageParams.page" :page-count="pageParams.pageSize" :active-button="{ color: 'black' }"
          :total="tableData.total" />
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { useDebounceFn, watchDebounced, toValue } from '@vueuse/core';
import type { LiveItem, LiveResponseData } from '~/types/live'
import banner from '~/assets/images/banner_7.jpg'
import lang from 'locales/live'
import { fetchWithoutCookie } from 'hooks/fetch'
import { useYears } from 'hooks/ui/useYears'
const { locale } = useI18n()
const { liveApi } = useApi();
const { curYear, years, handleClickYear } = useYears()
const loading = ref(true)
const pageParams = ref({
  page: 1,
  pageSize: 9,
  // lang:locale.value,
  year: curYear.value === 999 ? '' : curYear.value
})
const tabs = ref([
  {
    label: lang[locale.value]['links:video'],
    value: '/video',
  },
  {
    label: lang[locale.value]['links:live'],
    value: '/live',
  }
])
const title = lang[locale.value]['title'];
const emptyType = ref('empty')
loading.value = true
emptyType.value = 'empty'
const { refData: tableData } = await liveApi.videoList(pageParams.value);
loading.value = false
const keywords = tableData.value?.data?.map((item: LiveItem) => item.title).join(',') ?? '';
const description = `${title},${keywords}`
useSeoMeta({
  title: title,
  keywords: keywords,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: tableData.value?.data?.[0]?.coverImg ?? banner,
  twitterImage: tableData.value?.data?.[0]?.coverImg ?? banner,
  twitterCard: 'summary_large_image',
})
defineOgImage({
  component: 'live',
  title: title,
  description: description,
  keywords: keywords
})
// 链接
const links = [
  {
    label: lang[locale.value]['links:home'],
    labelClass: 'text-black dark:text-black sm:text-white',
    to: '/'
  },
  {
    label: lang[locale.value]['links:news'],
    labelClass: 'text-black dark:text-black sm:text-white',
    to: '/news'
  },
  {
    label: lang[locale.value]['title'],
    labelClass: 'text-black dark:text-black sm:text-white opacity-70'
  }
]
const handleClickTab = useDebounceFn(async (year: number) => {
  await handleClickYear(year)
  pageParams.value.year = year === 999 ? '' : year
  pageParams.value.page = 1
}, 300)
const handleClickItem = (item: LiveItem) => {
  navigateTo({
    path: `/video/${item.id}`,
  });
}
</script>
<style scoped>
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
