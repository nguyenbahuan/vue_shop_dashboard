<template>
  <div class="relative overflow-hidden bg-white">
    <Carousel :wrap-around="true" :autoplay="1500">
      <Slide v-for="slide in storeSlider.sliders" :key="slide">
        <img class="relative" :src="`${HOST_IMAGE}${slide.image}`" alt="" />
        <p
          class="absolute text-white bottom-0 mb-20 text-center w-[700px] drop-shadow-md"
        >
          {{ slide.content }}
        </p>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { sliderStore } from "@/store/sliderStore";
import { HOST_IMAGE } from "@/constants";
import { onBeforeMount } from "vue";
const storeSlider = sliderStore();
onBeforeMount(async () => {
  await storeSlider.getsliders();
});
</script>
