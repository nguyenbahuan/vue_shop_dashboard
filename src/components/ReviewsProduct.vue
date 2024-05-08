<template>
  <div>
    <div class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8"
      >
        <div class="lg:col-span-4">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Phản hồi của khách hàng
          </h2>

          <div class="mt-3 flex items-center">
            <div>
              <div class="flex items-center">
                <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
                <star-rating
                  :read-only="true"
                  :star-size="20"
                  :increment="0.01"
                  :rating="totalStar() / totalReviews || 0"
                  :fixed-points="2"
                  active-color="#ffd700"
                ></star-rating>
              </div>
              <p class="sr-only">4 out of 5 stars</p>
            </div>
            <p class="ml-2 text-sm text-gray-900">
              Dựa trên {{ totalReviews }} đánh giá
            </p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Review data</h3>

            <dl class="space-y-3">
              <div
                v-for="(review, index) in reviewStatistical"
                :key="index"
                class="flex items-center text-sm"
              >
                <dt class="flex flex-1 items-center">
                  <p class="w-3 font-medium text-gray-900">
                    {{ review.rating
                    }}<span class="sr-only"> star reviews</span>
                  </p>
                  <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <div class="relative ml-3 flex-1">
                      <div
                        class="h-3 rounded-full border border-gray-200 bg-gray-100"
                      ></div>
                      <div
                        :style="{
                          width: `calc(${ratingStar(
                            review.quantity
                          )} / 100 * 100%)`,
                        }"
                        class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      ></div>
                    </div>
                  </div>
                </dt>
                <dd
                  class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900"
                >
                  {{ ratingStar(review.quantity) }}%
                </dd>
              </div>
            </dl>
          </div>

          <div class="mt-10">
            <h3 class="text-lg font-medium text-gray-900">
              Chia sẻ những suy nghĩ của bạn
            </h3>
            <p class="mt-1 text-sm text-gray-600">
              Nếu bạn đã sử dụng sản phẩm này, hãy chia sẻ suy nghĩ của bạn với
              những khách hàng khác
            </p>

            <button
              @click="showModelReview = true"
              class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Viết đánh giá
            </button>
          </div>
        </div>
        <TransitionRoot as="template" :show="showModelReview">
          <Dialog
            as="div"
            class="relative z-10"
            @close="showModelReview = false"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div
                class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
              >
                <TransitionChild
                  as="template"
                  enter="ease-out duration-300"
                  enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enter-to="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leave-from="opacity-100 translate-y-0 sm:scale-100"
                  leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div class="">
                        <div
                          class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
                        >
                          <DialogTitle
                            as="h3"
                            class="text-base font-semibold leading-6 text-gray-900"
                            >Thêm đánh giá</DialogTitle
                          >
                        </div>
                        <form class="space-y-6" action="#" method="POST">
                          <div>
                            <div class="mt-2 p-5">
                              <label for="comment">Đánh giá</label>
                              <star-rating
                                @update:rating="setRating"
                                :star-size="20"
                                :show-rating="false"
                                active-color="#ffd700"
                              ></star-rating>
                            </div>
                            <div class="mt-2 p-5">
                              <label for="comment">Bình luận</label>
                              <textarea
                                v-model="formReview.comment"
                                id="comment"
                                name="comment"
                                type="text"
                                required
                                class="mt-1 px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div
                            class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                          >
                            <button
                              type="button"
                              class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                              @click="createReview"
                            >
                              Thêm
                            </button>
                            <button
                              type="button"
                              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              @click="showModelReview = false"
                              ref="cancelButtonRef"
                            >
                              Trở lại
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
        <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 class="sr-only">Recent reviews</h3>

          <div v-if="reviews" class="flow-root">
            <div class="-my-12 divide-y divide-gray-200">
              <div v-for="review in reviews" :key="review.id" class="py-12">
                <div class="flex items-center">
                  <img
                    :src="HOST_IMAGE + review.user.avatar"
                    alt="Emily Selman."
                    class="h-12 w-12 rounded-full"
                  />
                  <div class="ml-4">
                    <h4 class="text-sm font-bold text-gray-900">
                      {{ review.user.name }}
                    </h4>
                    <div class="mt-1 flex items-center">
                      <!-- Active: "text-yellow-400", Default: "text-gray-300" -->
                      <star-rating
                        :read-only="true"
                        :rating="review.rating"
                        :star-size="20"
                        :show-rating="false"
                        active-color="#ffd700"
                      ></star-rating>
                    </div>
                    <p class="sr-only">5 out of 5 stars</p>
                  </div>
                </div>

                <div class="mt-4 space-y-6 text-base italic text-gray-600">
                  <p>
                    {{ review.comment }}
                  </p>
                </div>
              </div>

              <!-- More reviews... -->
              <div v-if="reviews.length > 0">
                <vue-awesome-paginate
                  class="mb-10 mt-4"
                  :total-items="totalPage * 10"
                  v-model="currentPage"
                  :on-click="onClickHandler"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="load"
    class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50"
  >
    <div class="flex justify-center items-center mt-[50vh]">
      <font-awesome-icon
        :icon="['fas', 'spinner']"
        class="animate-spin text-lg"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";
import StarRating from "vue-star-rating";
import { reviewStore } from "@/store/reviewStore";
import reviewService from "@/service/reviewService";
import { useRoute } from "vue-router";
import { HOST_IMAGE } from "@/constants";
import toastConfig from "@/utils/toastConfig";
import { authStore } from "@/store/authstore";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import router from "@/router";
const route = useRoute();

const storeReview = reviewStore();

const load = ref(false);

const showModelReview = ref(false);

const reviewStatistical = ref([]);
const totalReviews = computed(() => {
  return reviewStatistical.value.reduce((curent, item) => {
    return curent + item.quantity;
  }, 0);
});
const totalStar = () => {
  return reviewStatistical.value.reduce((curent, item) => {
    return curent + item.quantity * item.rating;
  }, 0);
};
const ratingStar = (star) => {
  if (star) {
    return ((star / totalReviews.value) * 100).toFixed(1);
  }
  return 0;
};
const onClickHandler = async (value) => {
  load.value = true;
  formPagin.page = value - 1;
  await storeReview.getReviewsProduct(route.params.id, formPagin);
  load.value = false;
  reviews.value = storeReview.reviewsProduct;
};

const reviews = ref([]);
const formPagin = reactive({
  page: 0,
  pageSize: 5,
});
const productId = computed(() => route.params.id);
const formReview = reactive({
  productId: productId,
  comment: "",
  rating: "",
});
const currentPage = ref(1);
// const currentPage = computed(() => formPagin.page + 1);
const totalPage = ref(null);

const setRating = (star) => {
  formReview.rating = star;
};

const createReview = async () => {
  if (authStore().user) {
    const res = await reviewService.createReviewProduct(formReview);
    if (res.statusCode === 1) {
      toastConfig.toastSuccses(res.message);
      showModelReview.value = false;
      await storeReview.getReviewsProduct(route.params.id, formPagin);
      reviews.value = storeReview.reviewsProduct;
      reviewStatistical.value = await reviewService.statisticalReviewProduct(
        route.params.id
      );
    } else {
      toastConfig.toastError(res.message);
    }
  } else router.push("/login");
};

onBeforeMount(async () => {
  await storeReview.getReviewsProduct(route.params.id, formPagin);
  reviewStatistical.value = await reviewService.statisticalReviewProduct(
    route.params.id
  );
  reviews.value = storeReview.reviewsProduct;
  totalPage.value = storeReview.totalPage;
});
</script>
<style>
.pagination-container {
  column-gap: 10px;
}
.paginate-buttons {
  width: 50px;
  height: 40px;
  cursor: pointer;
  background-color: #f39c12;
  border: none;
  color: white;
  border-radius: 2px;
}
.back-button,
.next-button {
  width: 100px;
  height: 40px;
}
.paginate-buttons:hover,
.active-page:hover {
  background-color: #ffb33a;
}
.active-page {
  background-color: #d35400;
}
.back-button:active,
.next-button:active {
  background-color: #dd9e39;
}
</style>
