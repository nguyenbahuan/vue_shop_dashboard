<script setup>
import { computed, watch } from "vue";
import { defineProps } from "vue";
import { HOST_IMAGE } from "@/constants/index";
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  api: {
    type: String,
    default: "avataaars",
  },
});

const avatar = computed(() => HOST_IMAGE + props.avatar ?? "@/assets/logo.png");
watch(props.avatar, () => {
  console.log(props.avatar);
  HOST_IMAGE + "/" + props.avatar;
});
</script>

<template>
  <div>
    <img
      :src="avatar"
      class="object-cover h-[150px] rounded-full block w-[150px] max-w-full bg-gray-100 dark:bg-slate-800"
    />
    <slot />
  </div>
</template>
