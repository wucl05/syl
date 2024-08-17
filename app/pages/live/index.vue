<template>
  <section class="banner flex flex-col bg-no-repeat bg-cover bg-center w-full md:min-h-[400px] min-h-60 m-auto" :style="{'background-image': `url(${banner})`}">
    <div class="p-4 max-w-main m-auto w-full text-white text-left">
      <h1 class="sm:text-3xl md:text-4xl xl:text-5xl">{{ title }}</h1>
    </div>
  </section>
  <div class="pl-4 pr-4 max-w-main m-auto box-border">
    <UBreadcrumb :links="links" class="sm:-mt-[1.8rem] mt-[1rem]" :ui="{
      divider: {
        base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 sm:text-white text-black sm:opacity-70',
      },
    }" >
    </UBreadcrumb>
    <nav class="mt-10 md:mt-14 flex items-center gap-6 overflow-x-auto pr-4 hide-scrollbar">
      <span
        v-for="item in years"
        :key="item"
       class="py-[0.31rem] px-[0.75rem] rounded-[1rem] whitespace-nowrap transition ease-in-out cursor-pointer hover:bg-light-gray-1 hover:font-bold"
       :class="{'bg-light-gray-1 font-bold':curYear===item}"
       @click="handleClickYear(item)">
       {{item===999?lang[locale]['years']:item}}
      </span>
    </nav>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 md:mt-12">
      <LiveCard
        v-for="item in tableData.list"
        :item="item"
        :key="item.id"
        :isVideo="true"
        @clickItem="handleClickItem(item)"
        @play="handleClickItem(item)"
        >
      </LiveCard>
    </div>
  </div>

</template>
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import type { LiveItem,LiveResponseData } from '~/types/live'
import banner from '~/assets/images/banner_4.jpg'
import lang from 'locales/live'
import { fetchWithoutCookie } from 'hooks/fetch'
const { locale } = useI18n()
const { liveApi } = useApi();
const router = useRouter()
const curYear = ref(999);
const loading = ref(true)
const pageParams=ref({
  page:1,
  pageSize:9,
  lang:locale.value,
  year:curYear.value === 999 ? new Date().getFullYear():curYear.value
})
const tableData = ref({
  list:[],
  total:0
})

const title = lang[locale.value]['links:live'];
try {
  loading.value = true
  const {total=0,data:list=[]} = await liveApi.liveVideoList(pageParams.value);
  loading.value = false
  const keywords = list?.map((item:LiveItem)=>item.title).join(',')??'';
  const description = `${title},${keywords}`
    useSeoMeta({
    title: title,
    keywords:keywords,
    ogTitle: title,
    description: description,
    ogDescription: description,
    ogImage: list?.[0]?.coverImg??banner,
    twitterImage: list?.[0]?.coverImg??banner,
    twitterCard: 'summary_large_image',
  })
  defineOgImage({
    component: 'live',
    title: title,
    description: description,
    keywords:keywords
  })
  console.log('list',list)
  tableData.value = {
    total,
    list
  }
} catch (error) {
  console.log('直播服务异常',error)
  tableData.value = {
    total:0,
    list:[]
  }
}
const init = async () => {
  try {
    const res:LiveResponseData = await fetchWithoutCookie('/api/open/liveVideo/list',{
      params:pageParams.value,
      method: 'GET',
    });
    const list = res?.data ?? [];
    tableData.value = {
      total:res?.total ?? 0,
      list:list
    }
  } catch (error) {
    tableData.value = {
      total: 0,
      list:[]
    }
    console.log('请求失败',error)
  }
}
// init(true)
// 链接
const links = [{
  label: lang[locale.value]['links:home'],
  labelClass:'text-black sm:text-white',
  to: '/'
}, {
  label: lang[locale.value]['links:live'],
  labelClass:'text-black sm:text-white opacity-70'
},]
const getYears = () => {
  const years = [999]
  for (let i = new Date().getFullYear(); i >= 2018; i--) {
    years.push(i)
  }
  return years
}
console.log('getYears()',getYears())
const years = getYears()

const handleClickYear = useDebounceFn((year:number)=>{
  curYear.value = year
  pageParams.value.year = year
  pageParams.value.page = 1
  init()
},300)
const handleClickItem = (item:LiveItem) => {
  navigateTo({
    path: `./live/${item.id}`,
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
