<template>
  <div v-if="hasProduct()" class="box">
    <div
      v-for="(product, index) in store.getProductsInCart"
      :key="index"
      class="box-item"
    >
      <img
        v-if="product.product.images.length > 0"
        :src="HOST_IMAGE + product.product.images[0]?.imageName"
        alt=""
        class="item-thumb"
      />
      <img
        v-else
        src="https://flowbite.com/docs/images/products/apple-watch.png"
        class="item-thumb"
      />
      <h3 class="item-name">{{ product.product.name }}</h3>
      <span class="item-amount">Số lượng: {{ product.quantity }}</span>
      <span v-if="product.product.discountPercentage > 0" class="item-price">{{
        FormatPrice(product.product.priceDiscount)
      }}</span>
      <span v-else class="item - price">{{
        FormatPrice(product.product.price)
      }}</span>
    </div>

    <div class="cart-info" v-if="hasProduct()">
      <span>Tổng: {{ FormatPrice(totalPrice()) }} </span>
      <router-link to="/cart">
        <btn-view btnColor="btn btn-small btn-info" @click.self="showPopupCart">
          Xem giỏ hàng
        </btn-view>
      </router-link>
    </div>
    <div class="cart-info" v-else>
      <span>Tổng: {{ FormatPrice(totalPrice()) }} </span>
      <router-link to="/cart">
        <btn-view btnColor="btn btn-small btn-info" @click.self="showPopupCart">
          Xem giỏ hàng
        </btn-view>
      </router-link>
    </div>
  </div>
  <div v-else class="box">
    <span>Không có sản phẩm</span>
  </div>
</template>

<script setup>
import BtnView from "./BtnView.vue";
import { productCounterStore } from "@/store/productsrote";
import FormatPrice from "@/utils/formatprice";
import { HOST_IMAGE } from "@/constants/index";
const store = productCounterStore();

const showPopupCart = () => {
  store.showOrHiddenPopupCart();
  console.log(store.getPopupCart);
};
const hasProduct = () => {
  return store.getProductsInCart.length > 0;
};

const totalPrice = () => {
  return store.getProductsInCart.reduce((current, next) => {
    if (next.product.discountPercentage > 0) {
      return current + next.product.priceDiscount * next.quantity;
    } else return current + next.product.price * next.quantity;
  }, 0);
};
</script>

<style scoped>
.box {
  width: 400px;
  height: auto;
  background-color: #fafafa;
  box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1em 0.5em;
  position: absolute;
  z-index: 1;
}

.box:after {
  content: "";
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  background: inherit;
  position: absolute;
  top: -15px;
  right: 15px;
}

.box-item {
  width: 100%;
  height: 130px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0 0.5em;
  margin-top: 0.3em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.item-thumb {
  max-width: 70%;
  grid-column: 1/2;
  grid-row: 1/4;
  align-self: center;
}

.item-name {
  grid-column: 2/4;
  grid-row: 1/2;
  font-weight: normal;
}

.item-amount {
  grid-column: 2/3;
  grid-row: 2/4;
  color: #ddd;
}

.cart-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
