<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto h-10 w-auto text-center"
    v-if="load"
  >
    <h1>{{ message }}</h1>
  </div>
  <div
    v-else
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
        Nhập mật khẩu mới
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
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
              class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            @click.prevent="updatePassword"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ " " }}

        <router-link
          to="login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount, ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
import { HOST_AUTH } from "@/constants";
const load = ref(null);
const message = ref(null);
const route = useRoute();
const router = useRouter();
const formRegister = reactive({
  password: "",
});

const updatePassword = async () => {
  const res = await axios.post(
    `${HOST_AUTH}/reset-password?token=${route.query.token}&email=${route.query.email}`,
    formRegister
  );
  if (res.data.payload.statusCode === 1) {
    notifySuccess(res.data.payload.message);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } else {
    notifyErroe(res.data.payload.message);
  }
  console.log(res.data);
};

onBeforeMount(async () => {
  const res = await axios.get(
    `${HOST_AUTH}/reset-password?token=${route.query.token}&email=${route.query.email}`
  );
  if (res.data.payload.statusCode === 1) {
    load.value = false;
    return;
  } else {
    load.value = true;
    message.value = res.data.payload.message;
  }
  console.log(res);
});
const notifyErroe = (mes) => {
  toast(mes, {
    type: "error",
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifySuccess = (mes) => {
  toast(mes, {
    type: "success",
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
</script>

<style scoped></style>
