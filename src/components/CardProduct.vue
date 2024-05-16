<template>
  <div
    class="grid grid-rows-auto-rows group my-3 w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
  >
    <router-link
      class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
      v-if="product.images.length > 0"
      :to="{ name: 'productdetais', params: { id: product.id } }"
    >
      <img
        class="peer absolute top-0 right-0 h-full w-full object-contain"
        :src="HOST_IMAGE + product.images[0]?.imageName"
        alt="product image"
      />
      <img
        class="peer absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
        :src="HOST_IMAGE + product.images[1]?.imageName"
        alt="product image"
      />
      <!-- <div class="absolute bottom-0 mb-4 flex space-x-4 w-full justify-center">
        <div
          class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"
        ></div>
        <div
          class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"
        ></div>
        <div
          class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"
        ></div>
      </div> -->
      <svg
        class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
        />
      </svg>
      <!-- <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> -->
    </router-link>
    <router-link
      v-else
      :to="{ name: 'productdetais', params: { id: product.id } }"
    >
      <img
        class="peer absolute top-0 right-0 h-full w-full object-cover"
        src="https://flowbite.com/docs/images/products/apple-watch.png"
        alt="product image"
      />
      <img
        class="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
        src="https://flowbite.com/docs/images/products/apple-watch.png"
        alt="product image"
      />

      <svg
        class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
        />
      </svg>
    </router-link>
    <div class="grid grid-rows-auto-rows-2 mt-4 px-5 pb-5">
      <router-link :to="{ name: 'productdetais', params: { id: product.id } }">
        <h5
          class="text-base tracking-tight text-slate-900 font-medium line-clamp-2"
        >
          {{ props.product.name }}
        </h5>
      </router-link>
      <star-rating
        :read-only="true"
        :increment="0.01"
        :fixed-points="1"
        :star-size="20"
        :rating="props.product.rating || 0"
        active-color="#ffd700"
        text-class="custom-text"
      ></star-rating>
      <div
        v-if="props.product.discountPercentage > 0"
        class="mt-2 mb-5 flex items-center justify-between"
      >
        <p>
          <span class="text-base font-bold text-slate-900">{{
            FormatPrice(props.product.priceDiscount)
          }}</span>
          <span class="ml-2 text-sm text-slate-900 line-through">{{
            FormatPrice(props.product.price)
          }}</span>
        </p>
      </div>
      <div v-else class="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span class="text-base font-bold text-slate-900">{{
            FormatPrice(props.product.price)
          }}</span>
        </p>
      </div>
      <router-link
        :to="{ name: 'productdetais', params: { id: product.id } }"
        class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Xem chi tiết</router-link
      >
    </div>
  </div>
</template>

<script setup>
import FormatPrice from "@/utils/formatprice";
import { defineProps } from "vue";
import { HOST_IMAGE } from "@/constants/index";

import StarRating from "vue-star-rating";

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
