// src/store/index.js
import { defineStore } from "pinia";
import { getAllOder, getHistoryOrder } from "@/service/oderService";

export const OderStore = defineStore({
  id: "OderStore",
  state: () => ({
    oderlist: [],
    oderlistHistory: [],
    oderDetail: [],
    currentProduct: {},
    showModal: false,
    showPopupCart: false,
    currentOder: [],
  }),
  actions: {
    async fetchAllOder() {
      try {
        const response = await getAllOder();
        if (response) {
          this.oderlist = response.payload;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchHistoryOrder() {
      try {
        const response = await getHistoryOrder();
        if (response) {
          this.oderlistHistory = response.payload;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
});
