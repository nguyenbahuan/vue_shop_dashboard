// src/store/index.js
import { defineStore } from "pinia";
import { ref } from "vue";
import reviewService from "@/service/reviewService";
export const reviewStore = defineStore("reviewStore", () => {
  const reviewsProduct = ref([]);
  const totalPage = ref(null);

  const getReviewsProduct = async (id, form) => {
    try {
      const response = await reviewService.getReviewProduct(id, form);
      if (response.status === 200) {
        reviewsProduct.value = response.payload.content;
        totalPage.value = response.payload.total;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    reviewsProduct,
    getReviewsProduct,
    totalPage,
  };
});
