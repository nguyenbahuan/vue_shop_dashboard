<template>
  <nav-bar></nav-bar>
  <slot></slot>

  <footer-vue></footer-vue>
</template>

<script setup>
import FooterVue from "@/components/FooterVue.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped></style>
