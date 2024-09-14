<template>
  <div class="bg-[#fff] text-[#666]">
    <section
      class="relative banner flex flex-col bg-no-repeat bg-cover bg-center w-full md:min-h-[400px] min-h-60 m-auto"
      :style="{ 'background-image': `url(${banner})` }">
      <div class="absolute w-full h-full z-10 row fc">
        <div class="p-4 max-w-main m-auto w-full text-white text-left">
          <h1 class="text-[28px] lg:text-[36px] font-bold">{{ title }}</h1>
        </div>
        <div class="hidden lg:block absolute bottom-[10px] w-[1092px]">
          <MUIBreadcrumb :links="links" />
        </div>
      </div>
      <div class="absolute bg-[rgba(0,0,0,0.2)] w-full h-full left-[0px] top-[0px]"></div>
    </section>
    <div class="pl-4 pr-4 max-w-main m-auto box-border">
      <!-- <UBreadcrumb :links="links" class="sm:-mt-[1.8rem] mt-[1rem]" :ui="{
      divider: {
        base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 sm:text-white text-black dark:text-black sm:opacity-70',
      },
    }">
    </UBreadcrumb> -->
      <nav class="mt-10 md:mt-14 flex items-center gap-6 overflow-x-auto pr-4 hide-scrollbar">
        <span v-for="item in years" :key="item"
          class="py-[0.31rem] px-[0.75rem] text-[#666] rounded-[1rem] whitespace-nowrap transition ease-in-out cursor-pointer hover:bg-light-gray-1  hover:font-bold"
          :class="{ 'bg-light-gray-1 font-bold text-[#000] ': curYear === item }" @click="handleClickTab(item)">
          {{ item === 999 ? lang[locale]['years'] : item }}
        </span>
      </nav>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-10 md:mt-12">
        <LiveCard v-for="item in tableData.data" :item="item" :key="item.id" :showInfo="false" disabled>
          <div class="border-gray-200  border-solid border-t mt-3 pt-3">
            <div class="flex gap-1 items-center">
              <UIcon name="heroicons:calendar-days" class="w-4 h-4" />
              <div class="lineOne text-sm">{{ lang[locale]['links:events:date'] }}:&nbsp;&nbsp;{{ locale === 'cn' ?
                item.startDate : item.startDateEn }}-{{ locale === 'cn' ? item.endDate : item.endDateEn }}</div>
            </div>
            <div class="flex gap-1 items-center">
              <UIcon name="heroicons:map-pin" class="w-4 h-4" />
              <div class="lineOne text-sm">{{ lang[locale]['links:events:localtion'] }}:&nbsp;&nbsp;{{ item?.address ??
                ''
                }}</div>
            </div>
            <div class="flex gap-1 items-center">
              <UIcon name="heroicons:square-3-stack-3d" class="w-4 h-4" />
              <div class="lineOne text-sm">{{ lang[locale]['links:events:no'] }}:&nbsp;&nbsp;{{ item?.venue ?? '' }}
              </div>
            </div>
          </div>
        </LiveCard>
      </div>

      <Empty type="emptyType" v-if="tableData.total === 0 && !loading" />
      <div v-if="tableData.total > pageParams.pageSize" class="flex justify-center mb-10">
        <UPagination v-model="pageParams.page" :page-count="pageParams.pageSize" :active-button="{ color: 'black' }"
          :total="tableData.total" />
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import type { EventsItem } from '~/types/events'
import banner from '~/assets/images/banner_7.jpg'
import lang from 'locales/live'
import { useYears } from 'hooks/ui/useYears'
const { locale } = useI18n()
const { eventsApi } = useApi();
const { curYear, years, handleClickYear } = useYears()
const loading = ref(true)
const pageParams = ref({
  page: 1,
  pageSize: 9,
  // lang:locale.value,
  year: curYear.value === 999 ? '' : curYear.value
})
// const tableData = ref({
//   list:[],
//   total:0
// })

const title = lang[locale.value]['links:events'];
loading.value = true
const { refData: tableData }: EventsItem = await eventsApi.eventsList(pageParams.value);
loading.value = false
const keywords = tableData.value?.data?.map((item: EventsItem) => item.title).join(',') ?? '';
const description = tableData.value?.data?.map((item: EventsItem) => item.venue).join(',') ?? '';
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
  component: 'events',
  title: title,
  description: description,
  keywords: keywords
})
console.log('tableData.value?.data', tableData.value?.data)
// 链接
const links = [
  {
    label: lang[locale.value]['links:home'],
    labelClass: 'text-black dark:text-black ',
    to: '/'
  },
  {
    label: lang[locale.value]['links:news'],
    labelClass: 'text-black dark:text-black sm:text-white',
    // to: '/news'
  },
  {
    label: lang[locale.value]['links:events'],
    labelClass: 'text-black dark:text-black  opacity-70',
  }
]

const handleClickTab = useDebounceFn(async (year: number) => {
  await handleClickYear(year)
  pageParams.value.year = year === 999 ? '' : year
  pageParams.value.page = 1
  // init()
}, 300)
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
