<template>
  <nav-bar />

  <router-view class="min-h-[700px] mt-[70px]" />

  <footer-vue />
  <mask-view
    v-if="productsrote.showPopupCart"
    @click="productsrote.showOrHiddenPopupCart()"
  ></mask-view>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import FooterVue from "./FooterVue.vue";
import MaskView from "./MaskView.vue";
import { productCounterStore } from "@/store/productsrote";

const productsrote = productCounterStore();
</script>
