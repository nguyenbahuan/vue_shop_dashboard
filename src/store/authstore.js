// src/store/index.js
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import authService from "@/service/authService";
import router from "@/router";
export const authStore = defineStore("authStore", () => {
  const user = ref(null);
  const token = ref(null);
  const storeLogin = async (formLogin) => {
    try {
      const response = await authService.loginService(formLogin);
      if (response.status === 200) {
        if (response.payload.statusCode === 1) {
          user.value = response.payload;
          token.value = response.payload.tokenAccess;
          localStorage.setItem("token", response.payload.tokenAccess);
          return response?.payload;
        }
        return response?.payload;
      }
      return response?.payload;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const checkOutStore = async (form = { token: getToken.value }) => {
    const res = await authService.checkOutToken(form);
    if (res.status === 401 || res.status === 403) {
      router.push({ name: "login" });
      return;
    }
    if (res.payload.statusCode === 1) {
      user.value = res.payload;
      localStorage.setItem("token", res.payload.tokenAccess);
    }
  };

  const storeLogout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  };

  const getToken = computed(() => {
    return token.value || localStorage.getItem("token");
  });
  const getUser = computed(() => {
    return user.value;
  });

  return {
    user,
    token,
    storeLogin,
    storeLogout,
    checkOutStore,
    getToken,
    getUser,
  };
});
