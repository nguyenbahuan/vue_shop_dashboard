// src/store/index.js
import { defineStore } from "pinia";
import { getAllAdress } from "@/service/addressService";
import { ref } from "vue";

export const addressStore = defineStore("adressStore", () => {
  const address = ref([]);

  const fetchAllAdress = async () => {
    const response = await getAllAdress();
    address.value = response;
  };

  return {
    address,
    fetchAllAdress,
  };
});
