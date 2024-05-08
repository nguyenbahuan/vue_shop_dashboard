<template>
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
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Đăng kí tài khoản
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              v-model="formRegister.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="newErrors?.email ? 'border-2 border-rose-600' : ''"
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{ newErrors?.email }}</span>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="fullname"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Tên</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="formRegister.name"
              id="fullname"
              name="fullname"
              type="text"
              autocomplete="current-password"
              required
              :class="newErrors?.name ? 'border-2 border-rose-600' : ''"
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{ newErrors?.name }}</span>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="phonenumber"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Số điện thoại</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="formRegister.phoneNumber"
              id="phonenumber"
              name="phonenumber"
              type="text"
              autocomplete="phonenumber"
              required
              :class="newErrors?.phoneNumber ? 'border-2 border-rose-600' : ''"
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{
              newErrors?.phoneNumber
            }}</span>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="dob"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Ngày sinh</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="formRegister.dob"
              id="dob"
              name="dob"
              type="date"
              autocomplete="current-password"
              required
              :class="newErrors?.dob ? 'border-2 border-rose-600' : ''"
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{ newErrors?.dob }}</span>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Mật khẩu</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="formRegister.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :class="newErrors?.password ? 'border-2 border-rose-600' : ''"
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span class="text-red-500 text-xs">{{ newErrors?.password }}</span>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="confirmpassword"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Xác nhận mật khẩu</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="formRegister.confirmPassword"
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              autocomplete="current-password"
              required
              :class="
                newErrors?.confirmPassword ? 'border-2 border-rose-600' : ''
              "
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{
              newErrors?.confirmPassword
            }}</span>
          </div>
        </div>

        <div>
          <button
            @click.prevent="showForm"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đăng kí
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Bạn đã có tài khoản?
        {{ " " }}
        <router-link
          to="login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Đăng nhập</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { toast } from "vue3-toastify";
import authService from "@/service/authService";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { newErrors, validate } = useValidate();

const load = ref(false);
const formRegister = reactive({
  name: "",
  email: "",
  phoneNumber: "",
  dob: "",
  password: "",
  confirmPassword: "",
});
const showForm = async () => {
  load.value = true;
  const isValid = validate(schema.schemaRegister, formRegister);
  if (isValid) {
    const res = await authService.registerService(formRegister);
    if (res) {
      load.value = false;
    }
    if (res.statusCode === 1) {
      for (const key in formRegister) {
        formRegister[key] = "";
      }
      notifySuccess(res.message);
    } else {
      notify(res.message);
    }
  }
  load.value = false;
};
console.log(formRegister);
const notifySuccess = (mes) => {
  toast(mes, {
    type: "success",
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notify = (mes) => {
  toast(mes, {
    type: "error",
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
</script>

<style scoped></style>
