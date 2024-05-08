<template>
  <div class="mb-12">
    <div class="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
      <!-- Products -->
      <div class="mt-6">
        <div class="space-y-8" v-if="odersList.length > 0">
          <div v-for="oder in odersList" :key="oder.id">
            <div
              class="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0"
            >
              <div class="flex sm:items-baseline sm:space-x-4">
                <router-link
                  :to="`/orders-detail/${oder.id}`"
                  class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block"
                >
                  Xem chi tiết
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </div>
              <p class="text-sm text-gray-600">
                Ngày đặt:
                <time class="font-medium text-gray-900">{{
                  oder.createdDate
                }}</time>
              </p>
            </div>

            <div
              class="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
            >
              <div
                class="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8"
              >
                <div class="sm:flex lg:col-span-7">
                  <div class="mt-6 sm:ml-6 sm:mt-0">
                    <h3 class="text-base font-medium text-gray-900">
                      Mã đơn hàng: #{{ oder.id }}
                    </h3>
                    <p class="mt-2 text-sm font-medium text-gray-900">
                      Tổng thanh toán: {{ FormatPrice(oder.total) }}
                    </p>
                  </div>
                </div>

                <div class="mt-6 lg:col-span-5 lg:mt-0">
                  <dl class="grid grid-cols-2 gap-x-6 text-sm">
                    <div>
                      <dt class="font-medium text-gray-900">Địa chỉ</dt>
                      <dd class="mt-3 text-gray-500">
                        <span class="block">{{ oder.address }}</span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div
                class="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8 flex items-center justify-between"
              >
                <div>
                  <h4 class="sr-only">Status</h4>

                  <p class="text-sm font-medium text-gray-900">
                    Trạng thái đơn hàng :
                    {{ statusOder(oder.status) }}
                  </p>
                </div>

                <button
                  @click="getDetai(oder.id)"
                  v-if="oder.status == 3"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Đã nhận được hàng
                </button>
                <button
                  v-else-if="oder.status == 4"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Hoàn đơn
                </button>
              </div>
            </div>
          </div>
          <!-- More products... -->
        </div>
        <div
          v-else-if="load"
          class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50"
        >
          <div class="flex justify-center items-center mt-[50vh]">
            <font-awesome-icon
              :icon="['fas', 'spinner']"
              class="animate-spin text-lg"
            />
          </div>
        </div>
        <div v-else class="space-y-8 text-center">
          <h2 class="text-3xl">Hiện tại không có đơn hàng nào</h2>
        </div>
      </div>
    </div>
    <TransitionRoot as="template" :show="openChangeOder">
      <Dialog as="div" class="relative z-10" @close="openChangeOder = false">
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
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        class="text-base font-semibold leading-6 text-gray-900"
                        >Xác nhận đơn hàng</DialogTitle
                      >
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Xác nhận khi bạn đã nhận hàng thành công?!!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    @click="complatedOrder"
                  >
                    Đã nhận
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="openChangeOder = false"
                    ref="cancelButtonRef"
                  >
                    Trở lại
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { OderStore } from "@/store/oderstore";
import { onBeforeMount, reactive, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import FormatPrice from "@/utils/formatprice";
import { changeStatus, getOrder } from "@/service/oderService";
import toastConfig from "@/utils/toastConfig";

const load = ref(false);
const openChangeOder = ref(false);
const odersList = ref([]);
const oderStore = OderStore();
const detaiOder = ref(null);
const getDetai = async (id) => {
  const res = await getOrder(id);
  detaiOder.value = res;
  openChangeOder.value = true;
};
const formOrder = reactive({
  status: 4,
  note: "Đơn hàng hoàn thành",
});
const complatedOrder = async () => {
  const res = await changeStatus(detaiOder.value.id, formOrder);
  if (res.statusCode === 1) {
    toastConfig.toastSuccses(res.message);
    openChangeOder.value = false;
  } else toastConfig.toastError(res.message);
};

onBeforeMount(async () => {
  load.value = true;
  await oderStore.fetchAllOder();
  odersList.value = oderStore.oderlist.filter((oder) => oder.status !== 4);
  load.value = false;
});
const statusOder = (id) => {
  switch (id) {
    case 0:
      return "Đang chờ duyệt";
    case 1:
      return "Đơn hàng đã duyệt";
    case 2:
      return "Từ chối";
    case 3:
      return "Đang giao";
    case 4:
      return "Hoàn thành";
    case 5:
      return "Hủy đơn";
  }
};

// const getPro = async (id) => {
//   const res = await getProduct(id);
//   return res.name;
// };
// getPro(1);
// const getOderDetail = async (id) => {
//   const res = await getdetaiOder(id);
//   console.log("detail", res);
// };
</script>
