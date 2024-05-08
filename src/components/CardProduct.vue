<template>
  <div
    class="grid grid-rows-auto-rows w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5 group"
  >
    <router-link
      v-if="product.images.length > 0"
      :to="{ name: 'productdetais', params: { id: product.id } }"
    >
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
      >
        <img
          class="p-8 rounded-t-lg h-full w-full object-cover object-center group-hover:opacity-75"
          :src="HOST_IMAGE + product.images[0]?.imageName"
          alt="product image"
        />
      </div>
    </router-link>

    <router-link
      v-else
      :to="{ name: 'productdetais', params: { id: product.id } }"
      ><img
        class="p-8 rounded-t-lg"
        src="https://flowbite.com/docs/images/products/apple-watch.png"
        alt="product image"
    /></router-link>
    <div class="grid grid-rows-auto-rows-2 px-5 pb-5">
      <router-link :to="{ name: 'productdetais', params: { id: product.id } }">
        <h5
          class="line-clamp-2 pt-4 font-semibold tracking-tight text-gray-900 dark:text-white text-ellipsis"
        >
          {{ props.product.name }}
        </h5>
      </router-link>

      <div class="flex items-center mt-2.5 mb-5">
        <star-rating
          :read-only="true"
          :increment="0.01"
          :fixed-points="1"
          :star-size="20"
          :rating="props.product.rating || 0"
          active-color="#ffd700"
          text-class="custom-text"
        ></star-rating>
      </div>
      <div
        v-if="props.product.discountPercentage > 0"
        class="flex items-end justify-around flex-col"
      >
        <div>
          <span class="text-base text-gray-900 dark:text-white"
            ><label class="line-through">{{
              FormatPrice(props.product.price)
            }}</label>
            <!-- <small class="bg-rose-50 rounded-lg text-red-500 p-1 m-1">
              {{ props.product.discountPercentage }}%</small
            > -->
          </span>
          <span class="text-base font-bold text-gray-900 dark:text-white">{{
            FormatPrice(props.product.priceDiscount)
          }}</span>
        </div>

        <!-- <router-link :to="{ name: 'productdetais', params: { id: product.id } }"
          ><button
            class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Xem chi tiết
          </button>
        </router-link> -->
      </div>
      <div v-else class="flex items-end justify-around flex-col">
        <span class="text-base font-bold text-gray-900 dark:text-white">{{
          FormatPrice(props.product.price)
        }}</span>

        <!-- <router-link :to="{ name: 'productdetais', params: { id: product.id } }"
          ><button
            class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Xem chi tiết
          </button>
        </router-link> -->
      </div>

      <div class="flex justify-center">
        <button
          @click="
            router.push({ name: 'productdetais', params: { id: product.id } })
          "
          class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormatPrice from "@/utils/formatprice";
import { defineProps } from "vue";
import { HOST_IMAGE } from "@/constants/index";

import StarRating from "vue-star-rating";
import router from "@/router";

const props = defineProps({
  product: Object,
});
</script>

<style scoped>
.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
}
</style>
