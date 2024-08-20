<template>
  <video class="w-full" ref="video" controls></video>
</template>
<script setup>
import Hls from 'hls.js/dist/hls.min';
import FLVJS from 'flv.js';
import MpegtsPlayer from 'mpegts.js';
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});
const video = ref(null);
let player;
onMounted(() => {
  const url = props.src
  if(video.value && url.includes('flv') && FLVJS.isSupported()){
    player = FLVJS.createPlayer({
      type: 'flv',
      url: url,
      isLive: true,
      hasAudio: true,

    });
    player.attachMediaElement(video.value);
    player.load();
    return
  }
  if (video.value && url.includes('.ts')) {
      player = MpegtsPlayer.createPlayer({
          video: video.value,
          url: props.src,
          type: 'application/x-mpegURL', // 如果是 HLS 格式的 MPEG-TS
          // type: 'video/MP2T', // 如果是直接的 MPEG-TS
          autoPlay: true,
      });
      player.attachMediaElement(video.value);
      player.load();
      player.play();
      return
  }
  if (Hls.isSupported()) {
    const player = new Hls();
    player.loadSource(url);
    player.attachMedia(video.value);
    // player.on(Hls.Events.MANIFEST_PARSED, () => {
    //   video.value.play();
    // });
  } else if (video.value.canPlayType('application/vnd.apple.mpegURL')) {
    video.value.src = url;
    video.value.load();
    // video.value.play();
  }
});

onBeforeUnmount(() => {
  if (video.value) {
    video.value.pause();
    if (player) {
      player.destroy();
    }
  }
});
</script>
