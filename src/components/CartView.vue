<template>
  <div class="checkout-box">
    <ul class="checkout-list">
      <transition-group name="fade">
        <li
          v-for="(product, index) in productStore.getProductsInCart"
          :key="index"
          class="checkout-product"
        >
          <img
            v-if="product.product.images.length > 0"
            :src="HOST_IMAGE + product.product.images[0]?.imageName"
            alt=""
            class="product-image"
          />
          <img
            v-else
            src="https://flowbite.com/docs/images/products/apple-watch.png"
            alt=""
            class="product-image"
          />
          <h3 class="product-name">{{ product.product.name }}</h3>
          <!-- <span class="product-name">{{ product.quantity }}</span> -->
          <span>{{ product.quantity }}</span>
          <span
            v-if="product.product.discountPercentage > 0"
            class="product-price"
            >{{ FormatPrice(product.product.priceDiscount) }}</span
          >
          <span v-else class="product-price">{{
            FormatPrice(product.product.price)
          }}</span>
          <button class="product-remove" @click="remove(index)">X</button>
        </li>
      </transition-group>
    </ul>
    <div v-if="!hasProduct()" class="checkout-message">
      <h3>Không có sản phẩm...</h3>
      <router-link
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        to="./"
        >Trở lại</router-link
      >
    </div>
    <h3 class="total" v-if="hasProduct()">
      Tổng: {{ FormatPrice(totalPrice()) }}
    </h3>
    <router-link
      v-if="productStore.cartProducts.length > 0"
      :to="{ name: 'checkoutoder' }"
    >
      <button
        class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Thanh toán
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { productCounterStore } from "@/store/productsrote";
import FormatPrice from "@/utils/formatprice";
import { HOST_IMAGE } from "@/constants/index";
const productStore = productCounterStore();

const hasProduct = () => {
  return productStore.getProductsInCart.length > 0;
};

const totalPrice = () => {
  return productStore.getProductsInCart.reduce((current, next) => {
    if (next.product.discountPercentage > 0) {
      return current + next.product.priceDiscount * next.quantity;
    } else return current + next.product.price * next.quantity;
  }, 0);
};

const remove = (index) => {
  productStore.removeProduct(index);
};
</script>

<style scoped>
.checkout-box {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  box-sizing: border-box;
  padding: 1em;
}

.checkout-list {
  padding: 0;
}

.checkout-product {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 0.5fr 1fr;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
  border-radius: 5px;
  list-style: none;
  box-sizing: border-box;
  padding: 0.8em;
  margin: 1em 0;
}

.checkout-product * {
  place-self: center;
}
.product-image {
  grid-column: 1/2;
  width: 50%;
}

.product-name {
  box-sizing: border-box;
}

.product-price {
  font-size: 1.2em;
  font-weight: bold;
}

.product-remove {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 0;
  background-color: #e0e0e0;
  color: #fff;
  cursor: pointer;
}

.total {
  font-size: 2em;
  font-weight: bold;
  align-self: flex-end;
}

.checkout-message {
  font-size: 1.5em;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
