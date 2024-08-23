<template>
  <div class="outline-none">
    <div class="m-auto box-border bg-gray-50 dark:bg-black py-2 lg:px-12 px-5">
      <UBreadcrumb class="max-w-main m-auto" :links="links" :ui="{
        divider: {
          base: 'flex-shrink-0 w-5 h-5 rtl:rotate-180 text-black dark:text-white sm:opacity-70',
        },
      }" >
      </UBreadcrumb>
    </div>
    <div class="max-w-main m-auto text-center py-8 sm:py-10 lg:py-14 ">
      <h1 class="text-4xl font-bold text-[#222] dark:text-white">{{ info.title }}</h1>
      <h4 class="time mt-[.56rem] text-[#666]">{{ locale !== 'cn' ? info.publishDateEn : info.publishDate }}</h4>
    </div>
    <div class="max-w-[55.75rem] m-auto px-4 lg:px-0">
      <article v-html="info?.cookie ?? ''">
      </article>
    </div>
  </div>
</template>
<script setup lang='ts'>
import type { PrivacyDeatil,PrivacyResponseData } from '~/types/privacy'
import lang from 'locales/live'
const { locale } = useI18n()
const { privacyApi } = useApi();
// const route = useRoute();
const links = [
  {
    label: lang[locale.value]['links:home'],
    labelClass:'text-black dark:text-white',
    to: '/'
  },
  {
    label: lang[locale.value]['links:privacy'],
    labelClass:'text-black dark:text-white',
  },
]
const title =ref('');
const loading = ref(false)
const info:PrivacyDeatil = ref({})
try {
  loading.value = true
  const res:PrivacyResponseData<PrivacyDeatil>  = await privacyApi.privacyDetail();
  const {data} = res
  info.value = data ?? {}
  loading.value = false
  title.value = lang[locale.value]['links:privacy']??''
  const description = data?.desc ?? ''
  useSeoMeta({
    title: title.value,
    keywords:data?.keyword?.replace(/、/g,',')??'',
    ogTitle: title.value,
    description: description,
    ogDescription: description
  })
} catch (error) {
  info.value = {}
  loading.value = false
  console.log('error',error)
}


</script>
<style scoped>
.child {
  @apply lg:invisible;
}

.prev:hover .child,
.next:hover .child {
  @apply visible;
}
.content :deep(p) {
  margin-bottom: 12px;
  word-break: break-all;
}
.content :deep(img) {
  max-width: 100%;
}
.content :deep(video) {
  width: 100%;
  height: 480px;
}
</style>
