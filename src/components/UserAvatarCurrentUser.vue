<script setup>
import { authStore } from "@/store/authstore";
import UserAvatar from "@/components/UserAvatar.vue";

const storeAuth = authStore();
</script>

<template>
  <UserAvatar :username="storeAuth.user.name" :avatar="storeAuth.user.avatar">
    <slot />
  </UserAvatar>
</template>
