<script setup lang="ts">
import langue from '@/locales/second.js'
const { locale } = useI18n()
const layerS6 = ref(null)
const active = ref(0)
const layerBg0 = ref(null)
const layerBg1 = ref(null)
const layerBg2 = ref(null)
const layerTitle = ref(null)
const layerDes = ref(null)
const timeLine = async () => {
  animateCss({
    element: layerTitle.value,
    animationName: "animate__fadeInUp",
    sleep:100
  })
  animateCss({
    element: layerDes.value,
    animationName: "animate__fadeInUp",
    sleep:200
  })
  await Promise.all([
    addAnimate({
      element: layerS6.value,
      styles: {
        animation: "scale_1_9 1s linear forwards",
      },
      hide: true
    })
  ])

}
const toggle = async (val) => {
  const lays = [layerBg0, layerBg1, layerBg2]
  lays.forEach(em => {
    em.value && (em.value.style.zIndex = 40)
  })
  await addAnimate({
    element: lays[val].value,
    styles: {
      block: true,
      zIndex: 50,
    },
    css: "ani"
  })
}
onMounted(async () => {
  timeLine()
})
watch(active, (val) => {
  nextTick(() => {
    toggle(val)
  })
}, { immediate: true })
</script>
<template>
  <div class="w-full h-full absolute row fc">
    <div ref="layerBg0" class="absolute w-full h-full bgFull bg-[url('/imgs/s1.jpg')] z-30"></div>
    <div ref="layerBg1" class="absolute w-full h-full bgFull bg-[url('/imgs/s4.jpg')] z-30"></div>
    <div ref="layerBg2" class="absolute w-full h-full bgFull bg-[url('/imgs/s5.jpg')] z-30"></div>
    <div ref="layerS6" class="absolute w-full h-full bgFull bg-[url('/imgs/s3.png')] z-50 origin-center	"></div>
    <div class="absolute w-full h-full col fac z-50 pt-28 text-white"
      :style="{ color: [1].includes(active) ? '#000' : '#fff' }">
      <div class="title  text-4xl font-bold	" ref="layerTitle">
        {{langue[locale].title}}
      </div>
      <div ref="layerDes" class="col fc">
        <div class="des mt-4 text-sm w-9/12 text-center	">
          {{ langue[locale].des }}
        </div>
      </div>
    </div>
    <div class="absolute bottom-14 row fjc z-50 w-full">
      <SlideshowProgressToggle v-model="active" />
    </div>
  </div>
</template>
<style scoped>
.ani {
  animation: opacityShow 1s linear forwards;
}
</style>