<template>
  <div class="bg-white">
    <div class="pt-6 mt-20">
      <!-- Product info -->

      <div v-if="product">
        <div
          v-if="imagesList.length > 0"
          class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
        >
          <Carousel
            id="gallery"
            :autoplay="1500"
            :items-to-show="1"
            :wrap-around="false"
            v-model="currentSlide"
          >
            <Slide v-for="slide in imagesList.length" :key="slide">
              <div class="carousel__item">
                <img
                  :src="HOST_IMAGE + imagesList[slide - 1]"
                  class="max-h-[400px]"
                />
              </div>
            </Slide>
          </Carousel>

          <Carousel
            id="thumbnails"
            :items-to-show="4"
            :wrap-around="true"
            v-model="currentSlide"
            ref="carousel"
          >
            <Slide v-for="(slide, index) in imagesList.length" :key="index">
              <div class="carousel__item" @click="slideTo(slide - 1)">
                <img
                  :src="HOST_IMAGE + imagesList[index]"
                  class="max-h-[400px]"
                />
              </div>
            </Slide>
          </Carousel>
        </div>
        <div
          v-else
          class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
        >
          <img
            src="https://flowbite.com/docs/images/products/apple-watch.png"
            class="w-[200px] object-cover object-center"
          />
        </div>
        <div
          class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1
              class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
            >
              {{ product.name }}
            </h1>
          </div>

          <!-- Options -->
          <div class="mt-4 lg:row-span-3 lg:mt-0">
            <h2 class="sr-only">Product information</h2>
            <div v-if="product.discountPercentage > 0">
              <p class="text-3xl tracking-tight text-gray-900">
                {{ FormatPrice(product.priceDiscount) }}
              </p>
              <p class="text-3xl tracking-tight text-gray-900">
                <span class="line-through">{{
                  FormatPrice(product.price)
                }}</span>
                <small class="bg-rose-50 rounded-lg text-red-500 p-1 m-1"
                  >{{ product.discountPercentage }}%</small
                >
              </p>
            </div>
            <p v-else class="text-3xl tracking-tight text-gray-900">
              {{ FormatPrice(product.price) }}
            </p>

            <!-- Reviews -->
            <!-- <div class="mt-6">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center"></div>
                <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
                <a
                  :href="reviews.href"
                  class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >{{ reviews.totalCount }} reviews</a
                >
              </div>
            </div> -->
            <div class="flex sm:items-center sm:justify-start w-full mt-5">
              <label
                for="quantity-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-8"
                >Chọn số lượng:</label
              >
              <button
                @click="decreaseQuantity"
                class="group py-1 px-1 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
              >
                <svg
                  class="stroke-gray-900 group-hover:stroke-black"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    stroke-opacity="0.2"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    stroke-opacity="0.2"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <input
                v-model="quantity"
                type="text"
                class="h-[32px] font-semibold text-gray-900 cursor-pointer text-lg py-1 px-1 w-full sm:max-w-[60px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                placeholder="1"
              />
              <button
                @click="increaseQuantity"
                class="group py-1 px-1 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
              >
                <svg
                  class="stroke-gray-900 group-hover:stroke-black"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke="#9CA3AF"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke="black"
                    stroke-opacity="0.2"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke="black"
                    stroke-opacity="0.2"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>

            <form class="mt-10">
              <!-- Colors -->

              <button
                @click.prevent="addProduct(product)"
                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Thêm vào giỏ hàng
              </button>
            </form>
          </div>

          <div
            class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
          >
            <!-- Description and details -->
            <div>
              <h3 class="sr-only">Description</h3>
            </div>

            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">Điểm nổi bật</h3>

              <div class="mt-4">
                <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                  <li
                    v-for="highlight in product.highlights"
                    :key="highlight"
                    class="text-gray-400"
                  >
                    <span class="text-gray-600">{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">Chi tiết</h2>

              <div class="mt-4 space-y-6">
                <p class="text-sm text-gray-600">{{ product.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <ReviewsProduct></ReviewsProduct>
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
    </div>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Carousel, Slide } from "vue3-carousel";
import { HOST_IMAGE } from "@/constants/index";
import { toast } from "vue3-toastify";
import { productCounterStore } from "@/store/productsrote";
import FormatPrice from "@/utils/formatprice";
import ReviewsProduct from "@/components/ReviewsProduct.vue";
import { authStore } from "@/store/authstore";
import router from "@/router";

const quantity = ref(1);
const product = ref(null);
const imagesList = ref([]);
const currentSlide = ref(null);

const slideTo = (value) => {
  currentSlide.value = value;
};

const route = useRoute();

const storeProduct = productCounterStore();

const notifySuccess = (mes) => {
  toast(mes, {
    type: "success",
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
const addProduct = (product) => {
  if (authStore().user) {
    storeProduct.addProductToCart(product, quantity.value);
    notifySuccess("Thêm thành công");
  } else router.push("/login");
};
const increaseQuantity = () => {
  quantity.value++;
};
const decreaseQuantity = () => {
  if (quantity.value === 1) {
    return;
  }
  quantity.value--;
};
onBeforeMount(async () => {
  await storeProduct.fetchProduct(route.params.id);
  product.value = storeProduct.currentProduct;
  imagesList.value = product.value.images.map((img) => img.imageName);
});
watch(currentSlide, (value) => {
  if (value === imagesList.value.length - 1) {
    currentSlide.value = 0;
  }
});
</script>
