<template>
  <div
    class="container mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
  >
    <slider-view-vue></slider-view-vue>
    <div
      v-if="products"
      class="mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <card-product
        v-for="product in products"
        :key="product.id"
        :product="product"
      ></card-product>
    </div>

    <div
      v-else
      class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
    >
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-slate-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
              <div class="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        @click="loadMore"
        v-if="hasMore"
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Xem thêm
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, defineAsyncComponent, reactive } from "vue";
import SliderViewVue from "@/components/SliderView.vue";
import { productCounterStore } from "@/store/productsrote";
import { sliderStore } from "@/store/sliderStore";
import { getAllCategory } from "@/service/categoryService";
const CardProduct = defineAsyncComponent(() =>
  import("@/components/CardProduct.vue")
);

const pagePaging = reactive({
  page: 0,
  pageSize: 8,
});
const hasMore = ref(true);
const productStore = productCounterStore();
const storeSlider = sliderStore();
const products = ref([]);
const categories = ref([]);
const loadMore = async () => {
  pagePaging.page++;
  await productStore.fetchAllProduct(pagePaging);
  products.value.push(...productStore.products);
  hasMore.value = productStore.products.length > 7;
};

onBeforeMount(async () => {
  await productStore.fetchAllProduct(pagePaging);
  const res = await getAllCategory();
  categories.value = res;
  products.value = productStore.products;
  await storeSlider.getsliders();
  if (products.value && products.value.length < 8) {
    hasMore.value = false;
  }
});
</script>
