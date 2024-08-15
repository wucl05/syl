<template>
  <div>
    直播页面
  </div>
</template>
<script setup lang="ts">
const { liveApi } = useApi();
const res = await liveApi.liveVideoList({
  page:1,
  pageSize:10,
  lang:'cn',
  year:'2024'
});
console.log('直播数据',res)
</script>
