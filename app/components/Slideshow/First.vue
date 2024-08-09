<script setup lang="ts">
import langue from '@/locales/first.js'
const { locale } = useI18n()
const emTitle = ref(null)
const emSubTitle = ref(null)
const layerLeft = ref(null)
const layerRight = ref(null)
const layerTop = ref(null)
const layerBack = ref(null)
const layerCenter = ref(null)
const layerSyl = ref(null)
const layerSlogin = ref(null)
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
      callback: (em) => {
        em.style.backgroundImage = "none"
        em.style.backgroundColor = "#fff"
      }
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
        animation: "opacityQuarterInMoveYT20 1.5s ease-out forwards",
      }
    })
  ])

  await Promise.all([
    addAnimate({
      element: layerCenter.value,
      styles: {
        animation: "opacityOut 1s ease-out forwards",
      },
      hide: true,
      sleep: 1000
    }),
    addAnimate({
      element: layerSyl.value,
      styles: {
        transform: "translateY(-10%)",
        animation: "opacityOut 1s ease-out forwards",
      },
      hide: true,
      sleep: 500
    }),
    addAnimate({
      element: layerSlogin.value,
      styles: {
        transform: "translateY(-10%)",
        animation: "opacityOut 1s ease-out forwards",
      },
      hide: true,
      sleep: 500
    })
  ])

}
onMounted(async () => {
  // animateCss(emTitle.value, "animate__bounceInUp")
  console.log('emTitle:', emTitle)
  console.log('emSubTitle:', emSubTitle)
  timeLine()
})
</script>
<template>
  <div class="w-full h-full absolute">
    <div ref="layerLeft" class="absolute layerLeft w-full h-full bgFull bg-[url('/imgs/y-left.png')] z-30"></div>
    <div ref="layerRight" class="absolute layerRight w-full h-full bgFull bg-[url('/imgs/y-right.png')] z-30"></div>
    <div ref="layerTop" class="absolute layerTop w-full h-full bgFull bg-[url('/imgs/y-top.png')] z-30"></div>
    <div ref="layerBack" class="absolute layerBack w-full h-full bgFull bg-[#003F97] z-20"></div>
    <div ref="layerCenter"
      class="absolute opacity-0 layerCenter w-full h-full bgFull bg-[url('/imgs/y-center.png')] z-30 origin-center">
    </div>
    <div ref="layerSlogin" class="absolute row fc opacity-0 layerSlogin w-full h-full bgFull z-50">
      <div class="relative top-56 text-3xl">
        让绿色新能量创造人类新生活
      </div>
    </div>
    <div ref="layerSyl" class="absolute opacity-0 layerSyl w-full h-full bgFull bg-[url('/imgs/y-syl.png')] z-40"></div>
    <div
      class="slogn font-['PangMenZhengDaoRegular'] absolute text-white z-10 lg:left-20 left-10  lg:bottom-20 bottom-10  lg:text-7xl text-5xl">
      <div ref="emTitle" class="opacity-0">
        {{ langue[locale].title }}
      </div>
      <div ref="emSubTitle" class="opacity-0">
        {{ langue[locale].subTitle }}
      </div>
    </div>
    <video autoplay muted loop class="video">
      <source src="/videos/home.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>
<style scoped>
.video {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: fill;
  left: 0;
  top: 0;
}
</style>