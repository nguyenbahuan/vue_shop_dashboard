<template>
  <div
    v-if="user"
    class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
  >
    <UserAvatarCurrentUser class="lg:mx-12 flex justify-center items-center"
      ><div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          Hello, <b>{{ user.name }}</b
          >!
        </h1>
      </div>
    </UserAvatarCurrentUser>
    <div>
      <h2 class="text-base font-semibold leading-7 text-gray-900">Thông tin</h2>
      <p class="mt-1 text-sm leading-6 text-gray-500">
        Thông tin này sẽ được hiển thị công khai vì vậy hãy cẩn thận với những
        gì bạn chia sẻ.
      </p>
      <button
        @click="openUpdateUser = true"
        type="button"
        class="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Cập nhật thông tin
      </button>

      <dl
        class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
      >
        <div class="pt-6 sm:flex">
          <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Họ và tên
          </dt>
          <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div class="text-gray-900">{{ user.name }}</div>
          </dd>
        </div>
        <div class="pt-6 sm:flex">
          <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Email
          </dt>
          <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div class="text-gray-900">{{ user.email }}</div>
          </dd>
        </div>
        <div class="pt-6 sm:flex">
          <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Số điện thoại
          </dt>
          <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div class="text-gray-900">{{ user.phoneNumber }}</div>
          </dd>
        </div>
      </dl>
    </div>

    <div>
      <h2 class="text-base font-semibold leading-7 text-gray-900">Địa chỉ</h2>
      <p class="mt-1 text-sm leading-6 text-gray-500">Danh sách địa chỉ</p>

      <ul
        role="list"
        class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        v-if="addressList.length > 0"
      >
        <li
          v-for="add in addressList"
          :key="add.id"
          class="flex justify-between gap-x-6 py-6"
        >
          <div class="font-medium text-gray-900">{{ add.address }}</div>
          <div>
            <button
              @click="infoAddress(add.id)"
              type="button"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Cập nhật
            </button>
            <button
              @click="handleDelete(add.id)"
              type="button"
              class="font-semibold text-indigo-600 hover:text-indigo-500 ml-6"
            >
              Xóa
            </button>
          </div>
        </li>
      </ul>
      <!-- update address -->
      <TransitionRoot as="template" :show="openUpdate">
        <Dialog as="div" class="relative z-10" @close="openUpdate = false">
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
                          >Cập nhật địa chỉ</DialogTitle
                        >
                      </div>
                      <form class="space-y-6" action="#" method="POST">
                        <div>
                          <div class="mt-2 p-5">
                            <textarea
                              v-model="formAddress.address"
                              id="address"
                              name="address"
                              type="text"
                              :class="
                                newErrors?.address
                                  ? 'border-2 border-rose-600'
                                  : ''
                              "
                              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span class="text-red-500 text-xs">{{
                              newErrors?.address
                            }}</span>
                          </div>
                        </div>
                        <div
                          class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                        >
                          <button
                            type="button"
                            class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            @click="updateAdd()"
                          >
                            Cập nhật
                          </button>
                          <button
                            type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            @click="openUpdate = false"
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
      <!-- delete address -->
      <TransitionRoot as="template" :show="openDelete">
        <Dialog as="div" class="relative z-10" @close="openDelete = false">
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
                      <div
                        class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
                      >
                        <DialogTitle
                          as="h3"
                          class="text-base font-semibold leading-6 text-gray-900"
                          >Xóa địa chỉ</DialogTitle
                        >
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Bạn có thực sự muốn xóa địa chỉ hay không?!!
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
                      class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      @click="deleteAdd()"
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      @click="openDelete = false"
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
      <div class="flex border-t border-gray-100 pt-6">
        <button
          @click="open = true"
          type="button"
          class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          <span aria-hidden="true">+</span> Thêm địa chỉ
        </button>
      </div>
    </div>
  </div>

  <!-- Them dia chi -->
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
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
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >Thêm địa chỉ</DialogTitle
                    >
                  </div>
                  <form class="space-y-6" action="#" method="POST">
                    <div>
                      <div class="mt-2 p-5">
                        <textarea
                          v-model="formAddress.address"
                          id="address"
                          name="address"
                          type="text"
                          :class="
                            newErrors?.address ? 'border-2 border-rose-600' : ''
                          "
                          class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span class="text-red-500 text-xs">{{
                          newErrors?.address
                        }}</span>
                      </div>
                    </div>
                    <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        @click="createAdd"
                      >
                        Thêm
                      </button>
                      <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        @click="open = false"
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
  <!-- Cap nhat user -->
  <TransitionRoot as="template" :show="openUpdateUser">
    <Dialog as="div" class="relative z-10" @close="openUpdateUser = false">
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
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >Cập nhật thông tin</DialogTitle
                    >
                  </div>
                  <form class="space-y-6" action="#" method="POST">
                    <div>
                      <div class="mt-2 p-2">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Họ và tên</label
                        >
                        <input
                          v-model="formProfile.name"
                          id="name"
                          name="name"
                          type="text"
                          :class="
                            newErrors?.name ? 'border-2 border-rose-600' : ''
                          "
                          class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span class="text-red-500 text-xs">{{
                          newErrors?.name
                        }}</span>
                      </div>
                      <div class="mt-2 p-2">
                        <label
                          for="phoneNumber"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Số điện thoại</label
                        >
                        <input
                          v-model="formProfile.phoneNumber"
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          :class="
                            newErrors?.phoneNumber
                              ? 'border-2 border-rose-600'
                              : ''
                          "
                          class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span class="text-red-500 text-xs">{{
                          newErrors?.phoneNumber
                        }}</span>
                      </div>
                      <div class="mt-2 p-2">
                        <label
                          for="phoneNumber"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Ảnh</label
                        >
                        <input
                          id="avatar"
                          name="avatar"
                          type="file"
                          @input="upload"
                          required
                          class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        @click="updateProfile"
                      >
                        Cập nhật
                      </button>
                      <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        @click="openUpdateUser = false"
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
</template>

<script setup>
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import { onBeforeMount, reactive, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { addressStore } from "@/store/addresstore";
import { authStore } from "@/store/authstore";
import {
  createAddress,
  deleteAddress,
  updateAddress,
  getAddress,
} from "@/service/addressService";
import userService from "@/service/userService";
import { toast } from "vue3-toastify";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { validate, newErrors } = useValidate();
const user = ref(null);
const addressDetail = ref(null);
const storeAuth = authStore();
const addressList = ref([]);
const formAddress = reactive({
  address: "",
});
const formProfile = reactive({
  name: "",
  phoneNumber: "",
});
const imageUrls = ref([]);
const upload = (event) => {
  const value = event.target.files || event.dataTransfer.files;

  imageUrls.value = Array.from(value);
};
const storeAddress = addressStore();
const open = ref(false);
const openDelete = ref(false);
const openUpdate = ref(false);
const openUpdateUser = ref(false);
const infoAddress = async (id) => {
  openUpdate.value = true;
  const resAdd = await getAddress(id);
  formAddress.address = resAdd.address;
  addressDetail.value = resAdd;
};
const createAdd = async () => {
  const isValid = validate(schema.schemaAddress, formAddress);
  if (isValid) {
    const res = await createAddress(formAddress);
    await storeAddress.fetchAllAdress();
    addressList.value = storeAddress.address;
    open.value = false;
    formAddress.address = "";
    toastMes(res.statusCode, res.message);
  }
};
const handleDelete = async (id) => {
  openDelete.value = true;
  const resAdd = await getAddress(id);
  addressDetail.value = resAdd;
};
const deleteAdd = async () => {
  const res = await deleteAddress(addressDetail.value?.id);
  await storeAddress.fetchAllAdress();
  addressList.value = storeAddress.address;
  openDelete.value = false;
  toastMes(res.statusCode, res.message);
};
const updateAdd = async () => {
  console.log(addressDetail.value);
  const isValid = validate(schema.schemaAddress, formAddress);
  if (isValid) {
    const res = await updateAddress(formAddress, addressDetail.value?.id);
    await storeAddress.fetchAllAdress();
    addressList.value = storeAddress.address;
    open.value = false;
    formAddress.address = "";
    openUpdate.value = false;
    toastMes(res.statusCode, res.message);
  }
};

const updateProfile = async () => {
  const isValid = validate(schema.schemaProfile, formProfile);
  if (isValid) {
    const formData = new FormData();
    for (let i = 0; i < imageUrls.value.length; i++) {
      formData.append("avatar", imageUrls.value[i]);
    }
    formData.append("name", formProfile.name);
    formData.append("phoneNumber", formProfile.phoneNumber);
    const res = await userService.updateUser(formData);
    if (res.statusCode === 1) {
      toastSuccses(res.message);
      await storeAuth.checkOutStore();
      user.value = storeAuth.user;
      formProfile.name = user.value.name;
      formProfile.phoneNumber = user.value.phoneNumber;
      openUpdateUser.value = false;
    } else {
      toastError(res.message);
    }
  }

  // console.log(user.name, user.phoneNumber);
};

const toastMes = (status, message) => {
  if (status === 1) {
    toastSuccses(message);
  } else {
    toastError(message);
  }
};
const toastSuccses = (mes) => {
  toast(mes, {
    type: "success",
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
const toastError = (mes) => {
  toast(mes, {
    type: "error",
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
onBeforeMount(async () => {
  user.value = storeAuth.user;
  await storeAddress.fetchAllAdress();
  addressList.value = storeAddress.address;
  formProfile.name = storeAuth.user.name;
  formProfile.phoneNumber = storeAuth.user.phoneNumber;
});
</script>

<style scoped></style>
