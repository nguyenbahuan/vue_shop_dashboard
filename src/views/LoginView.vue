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
        Đăng nhập
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
              v-model="formLogin.email"
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
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Mật khẩu</label
            >
            <div class="text-sm">
              <router-link
                to="/forgot-password"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Quên mật khẩu?</router-link
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="formLogin.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :class="newErrors?.password ? 'border-2 border-rose-600' : ''"
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{ newErrors?.password }}</span>
          </div>
        </div>

        <div>
          <button
            @click.prevent="login"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đăng nhập
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Bạn không có tài khoản?
        {{ " " }}

        <router-link
          to="register"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Đăng kí</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
// import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { authStore } from "@/store/authstore";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { newErrors, validate } = useValidate();
const load = ref(false);
const store = authStore();
const router = useRouter();
const formLogin = reactive({
  email: "",
  password: "",
});

const notifySuccess = (mes) => {
  toast(mes, {
    type: "success",
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
const notifyError = (mes) => {
  toast(mes, {
    type: "error",
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const login = async () => {
  load.value = true;
  const isValid = validate(schema.schemaLogin, formLogin);
  if (isValid) {
    const res = await store.storeLogin(formLogin);
    if (res.statusCode === 1) {
      load.value = false;
      notifySuccess(res?.message);
      router.push("/");
    } else {
      notifyError(res?.error);
      load.value = false;
    }
  } else load.value = false;
};
</script>

<style scoped></style>
