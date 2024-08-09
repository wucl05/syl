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
        await loadImages(["y-left.png", "y-right.png", "y-top.png", "y-syl.png", "y-center.png","s1.jpg"])
    ]).then(() => {
        console.log('loading success');
        emit("success")
    });
})
</script>
<template>
    <div class="row fc flex w-screen h-screen">
        <div class="col fc">
            <UIcon name="svg-spinners:8-dots-rotate" class="w-5 h-5" />
            <div class="text-sm p-2">
                Loading...
            </div>
        </div>
    </div>
</template>
<style scoped></style>
