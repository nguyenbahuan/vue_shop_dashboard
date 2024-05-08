<template>
  <div class="bg-white mt-8">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
      <div class="max-w-xl">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Chi tiết đơn hàng
        </h1>
      </div>

      <section aria-labelledby="recent-heading" class="mt-16">
        <div class="space-y-20">
          <div>
            <table class="mt-4 w-full text-gray-500 sm:mt-6">
              <caption class="sr-only">
                Sản phẩm
              </caption>
              <thead
                class="sr-only text-left text-sm text-gray-500 sm:not-sr-only"
              >
                <tr>
                  <th
                    scope="col"
                    class="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                  >
                    Sản phẩm
                  </th>
                  <th
                    scope="col"
                    class="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    class="hidden py-3 pr-8 font-normal sm:table-cell"
                  >
                    Số lượng
                  </th>
                  <th scope="col" class="w-0 py-3 text-right font-normal">
                    Thành Tiền
                  </th>
                </tr>
              </thead>
              <tbody
                class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
              >
                <tr v-for="(detai, index) in detailOder" :key="index">
                  <td class="py-6 pr-8">
                    <div class="flex items-center">
                      <img
                        v-if="detai.products.images[0]"
                        :src="HOST_IMAGE + detai.products.images[0].imageName"
                        alt="Black tee with intersecting red, white, and green curved lines on front."
                        class="mr-6 h-16 w-16 rounded object-cover object-center"
                      />
                      <img
                        v-else
                        src="https://flowbite.com/docs/images/products/apple-watch.png"
                        alt="Black tee with intersecting red, white, and green curved lines on front."
                        class="mr-6 h-16 w-16 rounded object-cover object-center"
                      />
                      <div>
                        <div class="font-medium text-gray-900">
                          {{ detai.products.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="hidden py-6 pr-8 sm:table-cell">
                    {{ FormatPrice(detai.subPrice) }}
                  </td>
                  <td class="hidden py-6 pr-8 sm:table-cell">
                    {{ detai.quantity }}
                  </td>
                  <td class="whitespace-nowrap py-6 text-right font-medium">
                    {{ FormatPrice(detai.subPrice * detai.quantity) }}
                  </td>
                </tr>

                <!-- More products... -->
              </tbody>
            </table>
            <div
              class="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8"
            >
              <dl
                class="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8"
              >
                <div
                  class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
                >
                  <dt>Tổng tiền</dt>
                  <dd class="sm:mt-1">{{ FormatPrice(totalPrice()) }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- More orders... -->
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { getdetaiOder } from "@/service/oderService";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import FormatPrice from "@/utils/formatprice";
import { HOST_IMAGE } from "@/constants";
const route = useRoute();
const detailOder = ref([]);
const totalPrice = () => {
  return detailOder.value.reduce(
    (curent, next) => curent + next.subPrice * next.quantity,
    0
  );
};

onBeforeMount(async () => {
  const res = await getdetaiOder(route.params.id);
  detailOder.value = res;
});
</script>

<style lang="scss" scoped></style>
