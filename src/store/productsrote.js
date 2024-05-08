// src/store/index.js
import { defineStore } from "pinia";
import axios from "axios";
import { HOST_SEVER } from "@/constants";
export const productCounterStore = defineStore({
  id: "productsStore",
  state: () => ({
    products: [],
    searchProducts: [],
    cartProducts: [],
    currentProduct: {},
    showModal: false,
    showPopupCart: false,
    currentOder: [],
  }),
  actions: {
    async fetchAllProduct(pagePaging) {
      try {
        const response = await axios.post(
          `${HOST_SEVER}/products/get-all`,
          pagePaging
        );
        this.products = response.data.payload;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async search(formSearch) {
      try {
        const response = await axios.post(
          `${HOST_SEVER}/products/search`,
          formSearch
        );
        this.searchProducts = response.data.payload;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchProduct(id) {
      try {
        const response = await axios.get(`${HOST_SEVER}/products/detail/${id}`);
        this.currentProduct = response.data.payload;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    addProductToCart(product, quantity) {
      try {
        const cartSub = {
          productId: product.id,
          quantity: quantity,
          subPrice: product.priceDiscount,
        };
        const cartOder = {
          product: product,
          quantity: quantity,
        };
        const existingCartItem = this.cartProducts.find(
          (cart) => cart.product.id === product.id
        );
        const existingCart = this.currentOder.find(
          (cart) => cart.productId === product.id
        );
        if (existingCartItem) {
          existingCart.quantity += quantity;
          existingCartItem.quantity += quantity;
        } else {
          this.cartProducts.push(cartOder);
          this.currentOder.push(cartSub);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    },
    removeProduct(index) {
      this.cartProducts.splice(index, 1);
      this.currentOder.splice(index, 1);
    },
    showOrHiddenPopupCart() {
      this.showPopupCart = !this.showPopupCart;
    },
    clearCart() {
      this.cartProducts = [];
      this.currentOder = [];
    },
  },
  getters: {
    getAllProduct: (state) => state.products,
    getProductsInCart: (state) => state.cartProducts,
    getCurrentProduct: (state) => state.currentProduct,
    getShowModal: (state) => state.showModal,
    getPopupCart: (state) => state.showPopupCart,
    getcurrentOder: (state) => state.currentOder,
  },
});
