<script setup lang="ts">
import langue from '@/locales/first.js'
const { locale } = useI18n()
const timeLine = async () => {
  await Promise.all([
    addAnimate({
      element: layerBack.value,
      styles: {
        animation: "blurGrowDisappearBottom 1s linear forwards",
      },
      hide: true
    }),
    addAnimate({
      element: layerLeft.value,
      styles: {
        animation: "blurGrowDisappearLeft 1.5s ease-in forwards",
      },
      hide: true,
      sleep: 800
    }),
    addAnimate({
      element: layerTop.value,
      styles: {
        animation: "blurGrowDisappearTop 1.5s ease-in forwards",
      },
      hide: true,
      sleep: 800
    }),
    addAnimate({
      element: layerRight.value,
      styles: {
        animation: "blurGrowDisappearRight 1.5s ease-in forwards",
      },
      hide: true,
      sleep: 800
    })
  ])
  await Promise.all([
    addAnimate({
      element: emTitle.value,
      styles: {
        animation: "fadeInMoveUp 1.2s ease-out forwards",
      }
    }),
    addAnimate({
      element: emSubTitle.value,
      styles: {
        animation: "fadeInMoveUp 1.2s ease-out forwards",
      },
      sleep: 200
    })
  ])

  await Promise.all([
    await addAnimate({
      element: layerCenter.value,
      styles: {
        animation: "scale_9_1 0.5s ease-out forwards",
      },
      sleep: 2000,
    }),
    addAnimate({
      element: layerSyl.value,
      styles: {
        animation: "opacityMoveYT20 1.5s ease-out forwards",
      },
      sleep: 0
    }),
    addAnimate({
      element: layerSlogin.value,
      styles: {
        animation: "opacityQuarterIn 1.5s ease-out forwards",
      }
    })
  ])

  await Promise.all([
    addAnimate({
      element: layerCenter.value,
      styles: {
        animation: "opacityOut 1s ease-out forwards",
      },
      hide:true
    }),
    addAnimate({
      element: layerSyl.value,
      styles: {
        animation: "opacityOut 1s ease-out forwards",
      },
      hide:true
    }),
    addAnimate({
      element: layerSlogin.value,
      styles: {
        animation: "opacityOut 1s ease-out forwards",
      },
      hide:true
    })
  ])

}
onMounted(async () => {
  // timeLine()
})
</script>
<template>
  <div class="w-full h-full absolute">
    <div ref="layerS1" class="absolute layerS1 w-full h-full bgFull bg-[url('/imgs/s1.jpg')] z-30"></div>
  </div>
</template>
<style scoped>
</style>