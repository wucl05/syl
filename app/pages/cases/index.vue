<template>
  <div class="m-auto box-border bg-gray-50 dark:bg-black py-2 lg:px-12 px-5">
    <UBreadcrumb class="max-w-main m-auto" :links="links" :ui="{
      divider: {
        base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 text-black dark:text-white sm:opacity-70',
      },
    }" >
    </UBreadcrumb>
  </div>
  <div class="max-w-main m-auto pt-14 xl:pt-16 px-4 xl:px-0">
    <h1 class="text-2xl mb-8 lg:text-[2.75rem] text-center font-semibold">{{ casesLang[locale]['cases:title'] }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        color="white"
        trailing
        v-model="pageParams.key"
        :placeholder="casesLang[locale]['cases:placeholder']"
      />
      <!-- <div class=""> -->
        <USelect
          size="xl" :placeholder="casesLang[locale]['cases:area']" v-model="countryId" :options="regions" option-attribute="name" />
      <!-- </div> -->
      <!-- <div class=""> -->
        <USelect
          size="xl" :placeholder="casesLang[locale]['cases:solutions']" v-model="pageParams.solutionId" :options="productList" option-attribute="name" />
      <!-- </div> -->
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10 mt-0 md:mt-2">
      <div v-for="item in tableData.list" :key="item.id" class="bg-[#F6F7F9]">
        <img :src="item.coverImg" class="w-full aspect-[22.5/12.63] m-auto block" draggable="false" />
        <div class="p-6">
          <h3 class="text-2xl font-semibold lg:line-clamp-1">
          {{ item.title }}
          </h3>
          <p class="text-sm mt-4 text-gray-400">{{ item.countryName }}&nbsp;｜&nbsp;{{ item.district }}</p>
          <p class="text-sm mt-4 text-gray-400">{{ planLang[locale]['plan:year'] }}</p>
          <h4 class="text-sm font-semibold">{{item.year}}</h4>
          <p class="text-sm mt-4 text-gray-400">{{ planLang[locale]['plan:scale'] }}</p>
          <h4 class="text-sm font-semibold">{{item.scale}}</h4>
        </div>
      </div>
    </div>
    <div v-if="tableData.total>pageParams.pageSize" class="flex justify-center mb-10">
      <UPagination
        v-model="pageParams.page"
        :page-count="pageParams.pageSize"
        :active-button="{ color: 'black' }"
        :total="tableData.total"
      />
    </div>
  </div>
</template>
<script setup lang='ts'>
import { watchDebounced,toValue } from '@vueuse/core';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import lang from 'locales/live'
import casesLang from 'locales/cases'
import planLang from 'locales/plan'
import type { SolutionOptionsResponseData,SuccessCase } from '~/types/plan'
import { fetchWithoutCookie } from 'hooks/fetch'
const { locale } = useI18n()
const { casesApi,planApi } = useApi();
const route = useRoute() as RouteLocationNormalizedLoaded;
const { id='' } = route.query;
const links = [
  {
    label: lang[locale.value]['links:home'],
    labelClass:'text-black dark:text-white',
    to: '/'
  },
  {
    label: casesLang[locale.value]['cases:title'],
    labelClass:'text-black opacity-70 dark:text-white',
  }
]
const loading = ref(false)
const pageParams=ref({
  page:1,
  pageSize:6,
  key: '',
  countryId: '', // 国家id
  districtId: '', // 区域Id
  solutionId: id ?? ''
})
const tableData = ref({
  list:[],
  total:0
})
try {
  loading.value = true

  const params = toValue(pageParams.value)
  const {total=0,data:list=[]} = await casesApi.getSuccessCaseList({
      ...params,
      solutionId:params.solutionId === 'all' ? '' : params.solutionId,
      countryId:params.countryId === 'all' ? '' : params.countryId,
      districtId:params.districtId === 'all' ? '' : params.districtId,
    });
  loading.value = false
  tableData.value.list = []
  const keywords = list?.map((item:SuccessCase)=>item.title).join(',')??'';
  // const description = list?.map((item:SuccessCase)=>item.summary).join(',')??'';
  useSeoMeta({
    title: casesLang[locale.value]['cases:title'],
    keywords:keywords,
    ogTitle: casesLang[locale.value]['cases:title'],
    // description: description,
    // ogDescription: description,
    ogImage: list?.[0]?.coverImg,
    twitterImage: list?.[0]?.coverImg,
    twitterCard: 'summary_large_image',
  })
  defineOgImage({
    component: 'cases',
    title: casesLang[locale.value]['cases:title'],
    // description: description,
    keywords:keywords
  })
  tableData.value = {
    total,
    list
  }
} catch (error) {
  console.log('服务异常',error)
  tableData.value = {
    total:0,
    list:[]
  }
}
const regions = ref([{
  name: casesLang[locale.value]['cases:area'],
  value: 'all'
}])
type Options = {
  name: string;
  id?: string;
  value?: string;
  pid?:string,
  children?: Options[]
}
const regionsRes = await casesApi.getCaseRegions();
const regionsArr = regionsRes?.data?.map((item:Options)=>({
  name:item.name,
  value:item.id,
  children:item?.children?.map((c:Options)=>({
    name:c.name,
    value:c.id,
    pid:item.id
  }))
})) ?? []
regions.value = regions.value.concat(regionsArr)
const productList = ref([{
  name: casesLang[locale.value]['cases:solutions'],
  value: 'all'
}])
const productRes = await planApi.getSolutionOptions();
type ProdOptions = {
  title: string;
  id: string;
}
const productArr = productRes?.data?.map((item:ProdOptions)=>({
  name:item.title,
  value:item.id
})) ?? []
if(productArr.length && id){
  const item:Options = productArr.find((item:Options)=>item.value === id)
  if(item){
    links.splice(1,0,{
      label: item.name,
      labelClass:'text-black dark:text-white',
      to: `/plan/${item.value}`
    })
  }
}
productList.value = productList.value.concat(productArr)
const countryId = ref('')
watchDebounced(()=>pageParams.value,()=>{
  init()
},
  {
    deep:true,
    debounce: 500,
    maxWait: 1000
})
watchDebounced(()=>countryId.value,(n)=>{
  pageParams.value.districtId = n
  if(n==='all'){
    pageParams.value.countryId = 'all'
  } else {
    regionsArr.find((item:Options)=>{
      if(item?.children?.length){
        const cur = item.children.find(item=>item.value===n)
        if(cur){
          pageParams.value.countryId = cur.pid
        }
      }
    })
  }
},
  {
    deep:true,
    debounce: 500,
    maxWait: 1000
})
const init = async () => {
  tableData.value.list = []
  try {
    const params = toValue(pageParams.value)
    const res:SolutionOptionsResponseData = await fetchWithoutCookie('/api/open/successCase/list',{
      params:{
        ...params,
        solutionId:params.solutionId === 'all' ? '' : params.solutionId,
        countryId:params.countryId === 'all' ? '' : params.countryId,
        districtId:params.districtId === 'all' ? '' : params.districtId,
      },
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
</script>
<style scoped>
</style>
