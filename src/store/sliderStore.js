// src/store/index.js
import { defineStore } from "pinia";
import { ref } from "vue";
import sliderService from "@/service/sliderService";
export const sliderStore = defineStore("sliderStore", () => {
  const sliders = ref([]);

  const getsliders = async () => {
    try {
      const response = await sliderService.getSlider();
      if (response.status === 200) {
        sliders.value = response.payload;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    sliders,
    getsliders,
  };
});
