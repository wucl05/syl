<script setup lang="ts">
const emit = defineEmits();
const progress = ref("0")
let count = 0
const loading = ref(true)
const resources = ref(null)
const dark = ref(false)
const setProgress = (total) => {
    count++
    progress.value = ((count / total) * 100).toFixed(0)
}
provide('resources', resources)
provide('dark', dark)
const loadResources = async () => {
    loading.value = true
    if (resources.value) {
        for (let i = 0; i < resources.value.length; i++) {
            const source = resources.value[i]
            const src = typeof (source) === "string" ? source : source.src
            const suffix = src.split('.').pop();
            const handlers = {
                jpg: async () => {
                    await getImageInfo(source)
                },
                png: async () => {
                    await getImageInfo(source)
                },
                mp4: async () => {
                    await waitForVideoLoad(source)
                },
                ttf: async () => {
                    await loadFont({ url: source.src, name: source.name })
                }
            }
            if (handlers[suffix]) {
                await handlers[suffix]()
                setProgress(resources.value.length)
            }
        }
    }
    emit("success")
    loading.value = false
}
watch(resources, (val) => {
    count = 0
    val && loadResources()
}, { immediate: true })

onMounted(async () => {
})

</script>
<template>
    <div>
        <div v-if="loading" :class="{ 'bg-black': dark, 'bg-white': !dark, 'text-white': !dark, 'text-black': dark }"
            class="flex flex-col justify-center items-center w-screen h-screen fixed top-0 left-0 z-[10000] bg-opacity-100">
            <UIcon name="svg-spinners:pulse-3" class="w-10 h-10" :class="{ 'text-white': dark, 'text-black': !dark }" />
            <div class="col fc h-[56px]">
                <div v-if="progress > 0" class="text-sm p-2" :class="{ 'text-white': dark, 'text-black': !dark }">
                    Loading...
                </div>
                <div v-if="progress > 0" class="text-sm" :class="{ 'text-white': dark, 'text-black': !dark }">
                    {{ progress }}%
                </div>
            </div>
        </div>
        <div v-show="!loading">
            <slot />
        </div>
    </div>
</template>
<style scoped></style>
