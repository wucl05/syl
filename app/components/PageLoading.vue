<script setup lang="ts">
const emit = defineEmits();
const loadImages = async (imgs, basePath = "/imgs") => {
    return new Promise(async resolve => {
        for (let i = 0; i < imgs.length; i++) {
            const src = `${basePath}/${imgs[i]}`
            const image = await getImageInfo(src)
            console.log('image:', image)
        }
        resolve(true)
    })
}
onMounted(async () => {
    Promise.all([
        await loadFont({
            url: "/fonts/PangMenZhengDaoRegular.ttf",
            name: "PangMenZhengDaoRegular"
        }),
        await waitForVideoLoad("/videos/home.mp4"),
        await loadImages(["y-left.png", "y-right.png", "y-top.png", "y-syl.png", "y-center.png","s1.jpg","s3.png"])
    ]).then(() => {
        console.log('loading success');
        emit("success")
    });
})
</script>
<template>
    <div class="flex flex-col justify-center items-center w-screen h-screen fixed top-0 left-0 z-[10000] bg-black bg-opacity-100 text-white">
      <UIcon name="svg-spinners:pulse-3" class="w-10 h-10" />
      <div class="text-sm p-2">
          Loading...
      </div>
    </div>
</template>
<style scoped></style>
