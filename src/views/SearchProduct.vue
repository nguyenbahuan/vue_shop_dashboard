<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog
          as="div"
          class="relative z-40 lg:hidden"
          @close="mobileFiltersOpen = false"
        >
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4 border-t border-gray-200">
                  <h3 class="sr-only">Categories</h3>
                  <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                    <li v-for="category in subCategories" :key="category.name">
                      <a :href="category.href" class="block px-2 py-3">{{
                        category.name
                      }}</a>
                    </li>
                  </ul>

                  <Disclosure
                    as="div"
                    v-for="section in filters"
                    :key="section.id"
                    class="border-t border-gray-200 px-4 py-6"
                    v-slot="{ open }"
                  >
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                      >
                        <span class="font-medium text-gray-900">{{
                          section.name
                        }}</span>
                        <span class="ml-6 flex items-center">
                          <font-awesome-icon
                            class="h-5 w-5"
                            aria-hidden="true"
                            v-if="!open"
                            :icon="['fas', 'plus']"
                          />
                          <font-awesome-icon
                            v-else
                            :icon="['fas', 'minus']"
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div
                          v-for="(option, optionIdx) in section.options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            :id="`filter-mobile-${section.id}-${optionIdx}`"
                            :name="`${section.id}[]`"
                            :value="option.value"
                            type="checkbox"
                            :checked="option.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            :for="`filter-mobile-${section.id}-${optionIdx}`"
                            class="ml-3 min-w-0 flex-1 text-gray-500"
                            >{{ option.label }}</label
                          >
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
        >
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            Kết quả tìm kiếm
          </h1>

          <div class="flex items-center">
            <div class="max-w-2xl mx-auto">
              <label
                for="sort-product"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Sắp xếp</label
              >
              <select
                id="sort-product"
                v-model="pagePaging.orderBy"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  v-for="(item, index) in people"
                  :key="index"
                  :value="item.orderby"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <button
              type="button"
              class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              @click="mobileFiltersOpen = true"
            >
              <span class="sr-only">Filters</span>
              <font-awesome-icon
                :icon="['fas', 'filter']"
                class="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <div class="mb-4 border-b border-gray-200">
                <button
                  @click.prevent="findProduct"
                  class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Lọc
                </button>
              </div>

              <Disclosure
                as="div"
                v-for="section in filters"
                :key="section.id"
                class="border-b border-gray-200 py-6"
                v-slot="{ open }"
              >
                <h3 class="-my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span class="font-medium text-gray-900">{{
                      section.name
                    }}</span>
                    <span class="ml-6 flex items-center">
                      <font-awesome-icon
                        :icon="['fas', 'plus']"
                        v-if="!open"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                      <font-awesome-icon
                        :icon="['fas', 'minus']"
                        v-else
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-4">
                    <div
                      v-for="(option, optionIdx) in section.options"
                      :key="optionIdx"
                      class="flex items-center"
                    >
                      <input
                        :id="`filter-${section.id}-${optionIdx}`"
                        name="price"
                        :value="option"
                        v-model="ragePrice"
                        type="radio"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        :for="`filter-${section.id}-${optionIdx}`"
                        class="ml-3 text-sm text-gray-600"
                        >{{ option.label }}</label
                      >
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <!-- Your content -->
              <div>
                <div
                  v-if="products.length > 0"
                  class="mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                >
                  <card-product
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                  ></card-product>
                </div>

                <div
                  v-else-if="load"
                  class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
                >
                  <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                      <div class="h-2 bg-slate-200 rounded"></div>
                      <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                          <div
                            class="h-2 bg-slate-200 rounded col-span-2"
                          ></div>
                          <div
                            class="h-2 bg-slate-200 rounded col-span-1"
                          ></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p>Không tìm thấy sản phẩm nào phù hợp</p>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  onBeforeMount,
  ref,
  defineAsyncComponent,
  watch,
  computed,
  reactive,
} from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { productCounterStore } from "@/store/productsrote";
import { getAllCategory } from "@/service/categoryService";
import { useRoute } from "vue-router";
import FormatPrice from "@/utils/formatprice";
const people = [
  {
    name: "Chọn",
    orderby: null,
  },
  {
    name: "Mới nhất",
    orderby: "new",
  },
  {
    name: "Mua nhiều",
    orderby: "buy",
  },
  {
    name: "Giá từ thấp tới cao",
    orderby: "low price",
  },
  {
    name: "Giá từ cao tới thấp",
    orderby: "hight price",
  },
];

const ragePrice = ref(null);

const pagePaging = reactive({
  page: 0,
  pageSize: 8,
  orderBy: people[0].orderby,
  minPrice: null,
  maxPrice: null,
  name: "",
});

const subCategories = ref([]);
const filterPrices = [
  {
    min: null,
    max: 1000000,
    label: `Dưới ` + FormatPrice(1000000),
    checked: false,
  },
  {
    min: 1000000,
    max: 5000000,
    label: `Từ ${FormatPrice(1000000)} đến ${FormatPrice(5000000)}`,
    checked: false,
  },
  {
    min: 5000000,
    max: 10000000,
    label: `Từ ${FormatPrice(5000000)} đến ${FormatPrice(10000000)}`,
    checked: false,
  },
  {
    min: 10000000,
    max: 20000000,
    label: `Từ ${FormatPrice(10000000)} đến ${FormatPrice(20000000)}`,
    checked: false,
  },
  {
    min: 20000000,
    max: null,
    label: `Trên ${FormatPrice(20000000)}`,
    checked: false,
  },
];
const filters = [
  {
    id: "Giá",
    name: "Giá",
    options: filterPrices,
  },
];

const mobileFiltersOpen = ref(false);
const CardProduct = defineAsyncComponent(() =>
  import("@/components/CardProduct.vue")
);
const route = useRoute();

const hasMore = ref(true);
const productStore = productCounterStore();
const products = ref([]);
const query = computed(() => route.query.q);
watch(query, async (value) => {
  pagePaging.name = value;
  pagePaging.page = 0;
  await productStore.search(pagePaging);
  products.value = productStore.searchProducts;
  hasMore.value = productStore.searchProducts.length > 7;
});
const findProduct = async () => {
  const payload = {
    ...pagePaging,
    minPrice: ragePrice.value?.min,
    maxPrice: ragePrice.value?.max,
  };
  payload.page = 0;
  pagePaging.page = 0;
  await productStore.search(payload);
  products.value = [...productStore.searchProducts];
  if (pagePaging.orderBy === "low price") {
    products.value = productStore.searchProducts.sort(
      (a, b) => a.priceDiscount - b.priceDiscount
    );
  }
  if (pagePaging.orderBy === "hight price") {
    products.value = productStore.searchProducts
      .sort((a, b) => a.priceDiscount - b.priceDiscount)
      .reverse();
  }
  hasMore.value = productStore.searchProducts.length > 7;
};
const loadMore = async () => {
  pagePaging.page += 1;
  await productStore.search(pagePaging);
  products.value.push(...productStore.searchProducts);
  hasMore.value = productStore.searchProducts.length > 7;
};
// watch(
//   () => productStore.searchProducts,
//   (value) => {
//     console.log("object :>> ", value);
//     products.value = value;
//   }
// );
// watch(
//   () => productStore.searchProducts,
//   (value) => {
//     console.log("object :>> ", value);
//     products.value = value;
//   }
// );
onMounted(async () => {
  // products.value = productStore.searchProducts;
  if (productStore.searchProducts <= 7) {
    hasMore.value = false;
  } else {
    hasMore.value = true;
  }
});
onBeforeMount(async () => {
  const res = await getAllCategory();
  subCategories.value = res;
  pagePaging.name = route.query.q;
  products.value = productStore.searchProducts;
  if (products.value.length <= 7) {
    hasMore.value = false;
  } else {
    hasMore.value = true;
  }
});
</script>
