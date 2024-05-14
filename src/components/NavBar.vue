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
  <header class="header fixed z-30 bg-white">
    <nav class="nav">
      <ul class="nav-links">
        <li class="link">
          <router-link to="/dashboard">Trang chủ</router-link>
        </li>
        <li class="link">
          <!-- <router-link to="/">Danh mục sản phẩm</router-link> -->
          <Menu as="p" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="inline-flex w-full justify-center rounded-md px-4 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                Danh mục sản phẩm
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <div v-if="categories.length > 0">
                  <div
                    v-for="category in categories"
                    :key="category.id"
                    class="px-1 py-1"
                  >
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="router.push(`/category/${category.id}`)"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </MenuItem>
                  </div>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </li>
      </ul>
    </nav>
    <form @submit.prevent="searchProduct">
      <div class="relative mr-3">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tìm kiếm"
          @keyup.once.enter="searchProduct"
          v-model="formSearch.name"
        />
      </div>
    </form>
    <transition name="appear">
      <popup-cart class="cart" v-if="productStore.getPopupCart" />
    </transition>
    <btn-view
      btnColor="btn btn-small btn-info btn-popup"
      :cartIcon="true"
      @click="showCart"
    >
      <span v-if="productStore.getProductsInCart.length" class="btn-circle">{{
        productStore.getProductsInCart.length
      }}</span></btn-view
    >

    <Menu as="div" class="relative ml-6" v-if="token">
      <div>
        <MenuButton
          class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span class="absolute -inset-1.5" />
          <span class="sr-only">Open user menu</span>
          <img
            v-if="storeAuth.user"
            class="object-cover h-8 w-8 rounded-full"
            :src="
              storeAuth.user?.avatar
                ? HOST_IMAGE + storeAuth.user?.avatar
                : '@/assets/logo.png'
            "
            alt=""
          />
          <img
            v-else
            class="h-8 w-8 rounded-full"
            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            alt=""
          />
          <!-- <font-awesome-icon
            icon="fa-solid fa-user"
            class="h-8 w-8 rounded-full bg-white"
          /> -->
        </MenuButton>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <MenuItem v-slot="{ active }">
            <button
              @click="router.push('/profile')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              Thông tin
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="router.push('/orders')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              Đơn hàng
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="logout"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              Đăng xuất
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
    <Menu as="div" class="relative ml-6" v-else>
      <div>
        <MenuButton
          class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span class="absolute -inset-1.5" />
          <span class="sr-only">Open user menu</span>
          <img
            class="h-8 w-8 rounded-full"
            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            alt=""
          />
          <!-- <font-awesome-icon
            icon="fa-solid fa-user"
            class="h-8 w-8 rounded-full bg-white"
          /> -->
        </MenuButton>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <MenuItem v-slot="{ active }">
            <button
              @click="router.push('/login')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              Đăng nhập
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </header>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import PopupCart from "./PopupCart.vue";
import BtnView from "./BtnView.vue";
// import axios from "axios";
import { productCounterStore } from "@/store/productsrote";
import { authStore } from "@/store/authstore";
import { useRouter } from "vue-router";
import { ref, onBeforeMount, reactive } from "vue";
import { getAllCategory } from "@/service/categoryService";
import { HOST_IMAGE } from "@/constants";

const formSearch = reactive({
  page: 0,
  pageSize: 8,
  name: "",
  description: "",
});

const load = ref(false);

const categories = ref([]);
const productStore = productCounterStore();
const storeAuth = authStore();
const router = useRouter();
const showCart = () => {
  productStore.showOrHiddenPopupCart();
};

const token = storeAuth.getToken;
const logout = async () => {
  storeAuth.storeLogout();
  router.push("/login");
};
const searchProduct = async () => {
  if (formSearch.name) {
    load.value = true;
    await productStore.search(formSearch);
    document.querySelector("#default-search").blur();
    load.value = false;
    router.push({
      name: "search products",
      query: { q: formSearch.name },
    });
  }
};
onBeforeMount(async () => {
  const res = await getAllCategory();
  categories.value = res;
});
</script>

<style scoped>
.header {
  width: 100%;
  top: 0;
  height: 70px;
  background-color: #333333;
  box-sizing: border-box;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav {
  width: 600px;
}

.nav-links {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.link {
  list-style: none;
  padding: 0 2em;
}

.link a {
  color: #fff;
  text-decoration: none;
}
.link p {
  color: #fff;
  text-decoration: none;
}
.cart {
  position: absolute;
  top: 75px;
  right: 300px;
}

.btn-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-icon {
  color: #fff;
}
</style>
