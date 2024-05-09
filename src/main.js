import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// import VueCookie from "vue-cookie";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VueAwesomePaginate from "vue-awesome-paginate";
import Paginate from "vuejs-paginate-next";
import VueStarRating from "vue-star-rating";

import "./assets/style/tailwind.css";
import "./assets/style/global.css";
import "vue3-toastify/dist/index.css";
import "vue3-carousel/dist/carousel.css";
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);

library.add(fas);
app.component("star-rating", VueStarRating);
app.component("vue-awesome-paginate", VueAwesomePaginate);
app.component("font-awesome-icon", FontAwesomeIcon);

const pinia = createPinia();

app.use(Paginate);
app.use(pinia);
app.use(router);
app.mount("#app");

const defaultDocumentTitle = "Shop HuanNB";

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
