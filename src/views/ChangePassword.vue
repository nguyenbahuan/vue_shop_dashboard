<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Thay đổi mật khẩu
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="oldpassword"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Mật khẩu cũ</label
          >
          <div class="mt-2">
            <input
              v-model="formChange.oldPassword"
              id="oldpassword"
              name="oldpassword"
              type="text"
              :class="newErrors?.oldPassword ? 'border-2 border-rose-600' : ''"
              class="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{
              newErrors?.oldPassword
            }}</span>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="newpassword"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Mật khẩu mới</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="formChange.newPassword"
              id="newpassword"
              name="newpassword"
              type="text"
              autocomplete="current-password"
              :class="newErrors?.newPassword ? 'border-2 border-rose-600' : ''"
              class="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{
              newErrors?.newPassword
            }}</span>
          </div>
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
              v-model="formChange.confirmPassword"
              id="confirmpassword"
              name="confirmpassword"
              type="text"
              autocomplete="current-password"
              :class="
                newErrors?.confirmPassword ? 'border-2 border-rose-600' : ''
              "
              class="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span class="text-red-500 text-xs">{{
              newErrors?.confirmPassword
            }}</span>
          </div>
        </div>
        <div>
          <button
            @click.prevent="hanldeChangePassword"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import authService from "@/service/authService";
import { toast } from "vue3-toastify";
import schema from "@/utils/schema";
import useValidate from "@/utils/validate";

const { validate, newErrors } = useValidate();
const formChange = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const hanldeChangePassword = async () => {
  const isValid = validate(schema.schemaChangPass, formChange);
  if (isValid) {
    const res = await authService.changePasswordService(formChange);
    if (res.statusCode === 1) {
      toastSuccses(res.message);
      formChange.confirmPassword = "";
      formChange.newPassword = "";
      formChange.oldPassword = "";
    } else {
      toastError(res.message);
    }
  }
};
const toastSuccses = (mes) => {
  toast(mes, {
    type: "success",
    position: "top-right",
    autoClose: 2000,
  });
};
const toastError = (mes) => {
  toast(mes, {
    type: "error",
    position: "top-right",
    autoClose: 2000,
  });
};
</script>

<style lang="scss" scoped></style>
