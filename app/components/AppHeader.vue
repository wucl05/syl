<script setup lang="ts">
import langue from '@/locales/header.js'
const { locale, setLocale } = useI18n()
const items = [[
  {
    label: 'China',
    value: "cn",
    click: () => setLocale("cn")
  },
  {
    label: 'English',
    value: "en",
    click: () => setLocale("en")
  }
]]
</script>
<template>
  <div class="row fixed w-full z-10 text-white px-5 lg:px-12 py-3.5 fac text-sm	">
    <div class="row fac">
      <svg width="71.888" height="28" viewBox="0 0 71.888 28" style="fill: white;">
        <defs></defs>
        <g transform="translate(-43.623 -130.839)">
          <path class="a"
            d="M176.98,130.839h-6.451l-6.514,6.591-6.514-6.591h-6.451l8.862,8.862a3.19,3.19,0,0,1,.934,2.255v10.267h6.338V141.957a3.19,3.19,0,0,1,.934-2.255Z"
            transform="translate(-84.449)" />
          <path class="a"
            d="M45.172,248.364h.781l-.514-1.059-1.071,2.2h-.744l1.569-3.164a.265.265,0,0,1,.49,0l1.569,3.164h-.741l-.239-.487H44.846Z"
            transform="translate(-0.001 -90.667)" />
          <path class="a"
            d="M74.972,249.506h-.793l-.56-1.13H72.69l.321-.65h.8c.258,0,.476-.081.476-.446s-.2-.453-.476-.453h-1.3v2.68h-.687v-3.328h2.2a.874.874,0,0,1,.95.871c.007.124,0,.256,0,.38a.876.876,0,0,1-.586.893Z"
            transform="translate(-22.167 -90.667)" />
          <rect class="a" width="0.687" height="3.328" transform="translate(53.479 155.511)" />
          <path class="a"
            d="M98.624,246.834H97.137c-.232,0-.49,0-.49.339,0,.321.225.342.49.342h1.006a1,1,0,0,1,0,1.991H95.965l.326-.655h1.658c.232,0,.49,0,.49-.342,0-.318-.223-.339-.49-.339H96.942a1,1,0,0,1,0-1.992H98.95Z"
            transform="translate(-41.142 -90.668)" />
          <path class="a"
            d="M116.692,246.178l-.326.655h-2v2.018h2.218v.655h-2.905v-3.328Zm-1.806,1.336h1.44v.655h-1.775Z"
            transform="translate(-55.074 -90.667)" />
          <path class="a"
            d="M130.766,246.268c.715.7,1.421,1.284,2.125,1.992v-2.082h.687v3a.3.3,0,0,1-.274.328.291.291,0,0,1-.2-.093c-.718-.7-1.424-1.282-2.127-1.989v2.082h-.685v-3a.3.3,0,0,1,.272-.328.308.308,0,0,1,.206.09"
            transform="translate(-68.126 -90.667)" />
          <path class="a"
            d="M157.894,247.467a1.2,1.2,0,0,1,1.3-1.289h1.981l-.323.655H159.51c-.42,0-.929.067-.929.745v.527c0,.679.509.745.929.745h.823l-.324.655h-.818a1.2,1.2,0,0,1-1.3-1.289Zm1.463.047H161.2v1.992h-.687V248.17h-1.48Z"
            transform="translate(-89.828 -90.667)" />
          <path class="a"
            d="M179.886,249.506h-.793l-.56-1.13H177.6l.321-.65h.8c.258,0,.476-.081.476-.446s-.2-.453-.476-.453h-1.3v2.68h-.687v-3.328h2.2a.875.875,0,0,1,.95.871c.007.124,0,.256,0,.38a.876.876,0,0,1-.586.893Z"
            transform="translate(-104.639 -90.667)" />
          <path class="a"
            d="M195.45,249.507a1.2,1.2,0,0,1-1.3-1.289v-.75a1.2,1.2,0,0,1,1.3-1.289h.816a1.2,1.2,0,0,1,1.3,1.289v.75a1.2,1.2,0,0,1-1.3,1.289Zm.319-2.673c-.42,0-.929.067-.929.745v.527c0,.679.509.745.929.745h.178c.418,0,.929-.067.929-.745v-.527c0-.679-.511-.745-.929-.745Z"
            transform="translate(-118.332 -90.668)" />
          <path class="a"
            d="M213.084,248.217v-2.039h.687v1.93c0,.643.4.743.844.743s.844-.1.844-.743v-1.93h.687v2.039a1.2,1.2,0,0,1-1.3,1.289h-.469a1.2,1.2,0,0,1-1.3-1.289Z"
            transform="translate(-133.212 -90.667)" />
          <path class="a"
            d="M231.741,248.376l.322-.65h.795c.261,0,.478-.081.478-.446s-.2-.453-.478-.453h-1.3v2.68h-.687v-3.328h2.2a.875.875,0,0,1,.95.871c.007.124,0,.256,0,.38a.883.883,0,0,1-.952.947Z"
            transform="translate(-147.196 -90.667)" />
          <path class="a"
            d="M257.008,247.842v-.375a1.2,1.2,0,0,1,1.3-1.289h1.846l-.326.655h-1.2c-.42,0-.929.067-.929.746v.527c0,.679.511.745.929.745h1.2l.326.655H258.3a1.2,1.2,0,0,1-1.3-1.289v-.375Z"
            transform="translate(-167.741 -90.667)" />
          <path class="a"
            d="M274.074,249.507a1.2,1.2,0,0,1-1.3-1.289v-.75a1.2,1.2,0,0,1,1.3-1.289h.816a1.2,1.2,0,0,1,1.3,1.289v.75a1.2,1.2,0,0,1-1.3,1.289Zm.319-2.673c-.42,0-.929.067-.929.745v.527c0,.679.509.745.929.745h.178c.417,0,.929-.067.929-.745v-.527c0-.679-.511-.745-.929-.745Z"
            transform="translate(-180.137 -90.668)" />
          <path class="a"
            d="M292.363,246.366l1.3,2.082,1.3-2.082c.089-.126.12-.187.284-.187a.3.3,0,0,1,.261.327v3h-.685v-1.659l-.922,1.486c-.087.135-.124.173-.235.173s-.148-.038-.234-.173l-.919-1.486v1.659h-.687v-3a.3.3,0,0,1,.26-.327c.164,0,.195.061.284.187"
            transform="translate(-195.105 -90.668)" />
          <path class="a"
            d="M313.573,248.376l.321-.65h.8c.26,0,.478-.081.478-.446s-.2-.453-.478-.453h-1.3v2.68H312.7v-3.328h2.2a.874.874,0,0,1,.95.871c.007.124,0,.256,0,.38a.883.883,0,0,1-.952.947Z"
            transform="translate(-211.524 -90.667)" />
          <path class="a"
            d="M328.594,248.364h.781l-.514-1.059-1.071,2.2h-.744l1.569-3.164a.265.265,0,0,1,.49,0l1.569,3.164h-.741l-.239-.487h-1.426Z"
            transform="translate(-222.797 -90.667)" />
          <path class="a"
            d="M346.588,246.268c.715.7,1.421,1.284,2.125,1.992v-2.082h.687v3a.3.3,0,0,1-.274.328.292.292,0,0,1-.2-.093c-.717-.7-1.423-1.282-2.127-1.989v2.082h-.685v-3a.3.3,0,0,1,.272-.328.308.308,0,0,1,.206.09"
            transform="translate(-237.783 -90.667)" />
          <path class="a" d="M364.95,248.167l-1.381-1.989h.774l.95,1.375.95-1.375h.776l-1.381,1.989v1.339h-.687v-1.339Z"
            transform="translate(-251.508 -90.667)" />
          <path class="a"
            d="M60.074,145.626a1.655,1.655,0,0,0-1.655-1.654H50.34a6.456,6.456,0,0,1-6.717-6.718,6.539,6.539,0,0,1,6.717-6.415H65.008l-2.818,4.88H50.241a1.678,1.678,0,0,0,0,3.356h7.973a6.69,6.69,0,0,1,6.795,6.7,6.622,6.622,0,0,1-6.795,6.452H43.623l2.853-4.942H58.419A1.655,1.655,0,0,0,60.074,145.626Z" />
          <path class="a"
            d="M279.722,130.9h4.942v15.632a.8.8,0,0,0,.8.8h12.754l2.853,4.943H282.905a3.183,3.183,0,0,1-3.183-3.183Z"
            transform="translate(-185.596 -0.047)" />
        </g>
      </svg>
    </div>
    <div class="flexGrow c">
      <div class="hidden lg:block truncate">
        <span class="m-4 cursor-pointer" v-for="(item, index) in langue[locale].links" :key="index">
          {{ item.label }}
        </span>
      </div>
    </div>
    <div class="row">
      <div class="mr-6 hidden lg:block truncate">
        <span class="m-3 cursor-pointer" v-for="(item, index) in langue[locale].entrance" :key="index">
          {{ item.label }}
        </span>
      </div>
      <UDropdown @change="handleSelect" :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }">
        <div class="flex flex-row items-center justify-center">
          <UIcon name="iconoir:language" class="w-4 h-4" />
          <span class="ml-2">{{ items[0].find(item => item.value === locale).label }}</span>
        </div>
      </UDropdown>
      <UDropdown :items="[langue[locale].links, langue[locale].entrance]"
        :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
        <div class="flex flex-row items-center justify-center">
          <UIcon @click="isOpen = true" name="fluent-mdl2:bulleted-list" class="w-5 h-5 ml-2 block lg:hidden" />
        </div>
      </UDropdown>
    </div>

  </div>
</template>
