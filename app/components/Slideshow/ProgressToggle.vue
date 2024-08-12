<script setup lang="ts">
const emit = defineEmits(["input"]);
const { items } = defineProps({
  items: {
    type: Array,
    default: () => {
      return [
        {
          title: "31,320,210 kWh",
          subTitle: "清洁能源使用量"
        },
        {
          title: "46,157,372 kWh",
          subTitle: "清洁能源使用量"
        },
        {
          title: "685,000 吨",
          subTitle: "节水量"
        }
      ]
    }
  }
})
const progressRefs = ref([])
const model = defineModel({ default: 0 })
const normal = ref(true)
const itemRefs = ref([])
const timeLine = async () => {
  normal.value = false
  nextTick(async () => {
    normal.value = true
    nextTick(async () => {
      progressRefs.value.forEach(em => {
        em.classList.remove("ani")
      })
      await Promise.all([
        addAnimate({
          element: progressRefs.value[model.value],
          styles: {
            display: "block",
          },
          css: "ani",
          callback: (em) => {
            model.value = items.length - 1 > model.value ? model.value + 1 : 0
            timeLine()
          }
        })
      ])
    })
  })
}

onMounted(async () => {
  timeLine()
  nextTick(() => {
    itemRefs.value.forEach((em, index) => {
      setTimeout(() => {
        animateCss({
          element: em,
          animationName: "animate__fadeInUp",
          sleep: 100,
          callback: (em) => {
            em.style.opacity = 1
          }
        })
      }, (index * 500) + 500)

    })
  })
})
const change = (index) => {
  index !== model.value && setTimeout(() => timeLine(), 0)
  model.value = index

}
</script>
<template>
  <div class="row">
    <div ref="itemRefs" @click="change(index)" v-for="(item, index) in items" :class="{ active: model === index }"
      class="text-white row fc cursor-pointer hover:bg-[rgba(0,0,0,0.3)] rounded-md opacity-0" :key="index">
      <div class="text-center p-10">
        <div class="text-base font-bold">
          {{ item.title }}
        </div>
        <div class="text-xs">
          {{ item.subTitle }}
        </div>
        <div class="w-full h-1">
          <div v-if="normal" ref="progressRefs" class="progress bg-[rgba(255,255,255,0.8)]	w-full h-1 rounded-sm mt-2">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.progress {
  width: 0%;
}

.ani {
  animation: w_full 5s ease-out forwards;
}
</style>