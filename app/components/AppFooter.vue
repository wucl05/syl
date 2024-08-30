<script setup lang="ts">
import langue from '@/locales/appFooter.js'
const { locale } = useI18n()
const foldList = ref({
  'f_0': true
})
const media = useState("media", () => 'pc')
</script>

<template>
  <div class="bg-[#FAFAFA] border-t	border-[#eee] col fc w-full">
    <div class="row fc py-5 lg:py-14 w-full lg:w-auto px-5">
      <div class="flex flex-col lg:flex-row w-full aiStart justify-between">
        <div class="row pb-5 lg:pb-0 lg:px-12 w-full lg:w-auto" v-for="(item, index) in langue[locale].menus"
          :key="index">
          <div class="col w-full lg:w-auto">
            <div class="title font-bold mb-5 row w-full lg:w-auto">
              <div>
                {{ item.title }}
              </div>
              <div class="block lg:hidden flexGrow jcEnd row fc" v-if="!media"
                @click="foldList[`f_${index}`] = !foldList[`f_${index}`]">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 22.505 12.313"
                  :style="{ transform: `rotate(${foldList[`f_${index}`] ? 180 : 0}deg)` }"
                  class="transition-all	duration-500">
                  <path class="arrow" d="M-2818.212-8300.454l10.723-10.723,10.722,10.723"
                    transform="translate(2818.742 8312.237)" />
                </svg>
              </div>
            </div>
            <div class="col" v-if="media || foldList[`f_${index}`]">
              <div class="text-[#6E6E6E] text-xs cursor-pointer my-2 row" v-for="(node, j) in item.list" :key="j">
                <div>
                  <a :href="node.page" target="_blank">{{ node.name }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#000] w-full fc hidden lg:flex">
      <div class="p-5 row">
        <div class="col">
          <div class="row text-[rgba(255,255,255,0.9)] mb-2 text-sm">
            <a :href="item.page" target="_blank" :class="{ line: index < langue[locale].links.length - 1 }"
              class="cursor-pointer links" v-for="(item, index) in langue[locale].links" :key="index">{{
          item.name }}</a>
          </div>
          <div class="text-[#666] text-xs">
            {{ langue[locale].version }}
          </div>
        </div>
        <div class="pl-[410px] row flexFull  jcEnd">
          <div class="row">
            <svg class="mx-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs></defs>
              <g transform="translate(-1146 -5889)">
                <circle class="a" cx="20" cy="20" r="20" transform="translate(1146 5889)" />
                <path class="b"
                  d="M121.6,116.763a4.735,4.735,0,1,0,4.735,4.735A4.728,4.728,0,0,0,121.6,116.763Zm0,7.812a3.077,3.077,0,1,1,3.077-3.077A3.084,3.084,0,0,1,121.6,124.576Zm4.929-9.11a1.106,1.106,0,1,0,1.106,1.106A1.1,1.1,0,0,0,126.525,115.466Zm4.3,6.032c0-1.274.012-2.537-.06-3.809a5.106,5.106,0,0,0-5.358-5.358c-1.274-.072-2.537-.06-3.809-.06s-2.537-.012-3.809.06a5.106,5.106,0,0,0-5.358,5.358c-.072,1.274-.06,2.537-.06,3.809s-.012,2.537.06,3.809a5.106,5.106,0,0,0,5.358,5.358c1.274.072,2.537.06,3.809.06s2.537.012,3.809-.06a5.106,5.106,0,0,0,5.358-5.358C130.84,124.036,130.826,122.773,130.826,121.5Zm-2.032,5.444a3.149,3.149,0,0,1-1.755,1.755c-1.214.482-4.1.374-5.444.374s-4.232.109-5.446-.372a3.149,3.149,0,0,1-1.755-1.755c-.48-1.217-.372-4.1-.372-5.446s-.109-4.232.372-5.446a2.933,2.933,0,0,1,.7-1.057,2.984,2.984,0,0,1,1.057-.7c1.214-.48,4.1-.372,5.446-.372s4.232-.108,5.446.372a3.149,3.149,0,0,1,1.755,1.755c.48,1.214.372,4.1.372,5.446S129.277,125.728,128.794,126.942Z"
                  transform="translate(1044.401 5787.502)" />
              </g>
            </svg>
            <svg class="mx-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs></defs>
              <g transform="translate(-1146 -5889)">
                <circle class="a" cx="20" cy="20" r="20" transform="translate(1146 5889)" />
                <path class="b"
                  d="M288.393,61.918v2.967h-1.765a1.654,1.654,0,0,0-1.3.4,1.86,1.86,0,0,0-.337,1.214v2.124h3.293l-.438,3.327h-2.855v8.531h-3.439V71.955h-2.866V68.628h2.866v-2.45a4.349,4.349,0,0,1,1.169-3.243,4.242,4.242,0,0,1,3.114-1.152,18.651,18.651,0,0,1,2.563.135Z"
                  transform="translate(882.464 5838.033)" />
              </g>
            </svg>
            <svg class="mx-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs>
              </defs>
              <g transform="translate(-1146 -5889)">
                <circle style="fill: #333;" class="a" cx="20" cy="20" r="20" transform="translate(1146 5889)" />
                <path class="b"
                  d="M85.2,200.59a2.851,2.851,0,0,0-1.914-2.093c-1.689-.5-8.461-.5-8.461-.5s-6.771,0-8.461.494a2.846,2.846,0,0,0-1.914,2.093,36.183,36.183,0,0,0,0,11.4,2.851,2.851,0,0,0,1.914,2.093c1.689.5,8.461.5,8.461.5s6.771,0,8.461-.5a2.846,2.846,0,0,0,1.914-2.093,36.166,36.166,0,0,0,0-11.4Zm-12.526,9.237v-7.075l5.607,3.511Z"
                  transform="translate(1091.313 5702.904)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#000] w-full fc row lg:hidden">
      <div class="col">
        <div class="col">
          <div class="row fc py-8">
            <svg class="mx-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs></defs>
              <g transform="translate(-1146 -5889)">
                <circle class="a" cx="20" cy="20" r="20" transform="translate(1146 5889)" />
                <path class="b"
                  d="M121.6,116.763a4.735,4.735,0,1,0,4.735,4.735A4.728,4.728,0,0,0,121.6,116.763Zm0,7.812a3.077,3.077,0,1,1,3.077-3.077A3.084,3.084,0,0,1,121.6,124.576Zm4.929-9.11a1.106,1.106,0,1,0,1.106,1.106A1.1,1.1,0,0,0,126.525,115.466Zm4.3,6.032c0-1.274.012-2.537-.06-3.809a5.106,5.106,0,0,0-5.358-5.358c-1.274-.072-2.537-.06-3.809-.06s-2.537-.012-3.809.06a5.106,5.106,0,0,0-5.358,5.358c-.072,1.274-.06,2.537-.06,3.809s-.012,2.537.06,3.809a5.106,5.106,0,0,0,5.358,5.358c1.274.072,2.537.06,3.809.06s2.537.012,3.809-.06a5.106,5.106,0,0,0,5.358-5.358C130.84,124.036,130.826,122.773,130.826,121.5Zm-2.032,5.444a3.149,3.149,0,0,1-1.755,1.755c-1.214.482-4.1.374-5.444.374s-4.232.109-5.446-.372a3.149,3.149,0,0,1-1.755-1.755c-.48-1.217-.372-4.1-.372-5.446s-.109-4.232.372-5.446a2.933,2.933,0,0,1,.7-1.057,2.984,2.984,0,0,1,1.057-.7c1.214-.48,4.1-.372,5.446-.372s4.232-.108,5.446.372a3.149,3.149,0,0,1,1.755,1.755c.48,1.214.372,4.1.372,5.446S129.277,125.728,128.794,126.942Z"
                  transform="translate(1044.401 5787.502)" />
              </g>
            </svg>
            <svg class="mx-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs></defs>
              <g transform="translate(-1146 -5889)">
                <circle class="a" cx="20" cy="20" r="20" transform="translate(1146 5889)" />
                <path class="b"
                  d="M288.393,61.918v2.967h-1.765a1.654,1.654,0,0,0-1.3.4,1.86,1.86,0,0,0-.337,1.214v2.124h3.293l-.438,3.327h-2.855v8.531h-3.439V71.955h-2.866V68.628h2.866v-2.45a4.349,4.349,0,0,1,1.169-3.243,4.242,4.242,0,0,1,3.114-1.152,18.651,18.651,0,0,1,2.563.135Z"
                  transform="translate(882.464 5838.033)" />
              </g>
            </svg>
            <svg class="mx-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs>
              </defs>
              <g transform="translate(-1146 -5889)">
                <circle style="fill: #333;" class="a" cx="20" cy="20" r="20" transform="translate(1146 5889)" />
                <path class="b"
                  d="M85.2,200.59a2.851,2.851,0,0,0-1.914-2.093c-1.689-.5-8.461-.5-8.461-.5s-6.771,0-8.461.494a2.846,2.846,0,0,0-1.914,2.093,36.183,36.183,0,0,0,0,11.4,2.851,2.851,0,0,0,1.914,2.093c1.689.5,8.461.5,8.461.5s6.771,0,8.461-.5a2.846,2.846,0,0,0,1.914-2.093,36.166,36.166,0,0,0,0-11.4Zm-12.526,9.237v-7.075l5.607,3.511Z"
                  transform="translate(1091.313 5702.904)" />
              </g>
            </svg>
          </div>
          <div class="row fc text-[rgba(255,255,255,0.9)]  text-sm">
            <span :class="{ line: index < langue[locale].links.length - 1 }" class="cursor-pointer links"
              v-for="(item, index) in langue[locale].links" :key="index">{{
          item.name }}</span>
          </div>
          <div class="row fc p-5  c text-[#666] text-xs">
            {{ langue[locale].version }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.arrow {
  fill: none;
  stroke: #000;
  stroke-width: 1.5px;
}

.line {
  position: relative;
  margin: 0px 10px 0px 0px;
  padding: 0px 10px 0px 0px;
}

.line::after {
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: 0px;
  content: "";
  display: inline-block;
  height: 10px;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
}

.a {
  fill: #333;
}

.b {
  fill: #fff;
}
</style>
