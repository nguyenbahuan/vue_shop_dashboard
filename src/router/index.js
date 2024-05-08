import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "@/store/authstore";
import CartView from "@/components/CartView.vue";
import Mainlayout from "../components/MainLayout.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProductDetail from "../views/ProductDetail.vue";
import CheckoutOder from "@/views/CheckoutOder.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import OderView from "@/views/OderView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LayoutProfile from "@/components/LayoutProfile.vue";
import NavigationView from "@/components/NavigationView.vue";
import CategoryView from "@/views/CategoryView.vue";
import ChangePassword from "@/views/ChangePassword.vue";
import OderDetail from "@/views/OderDetail.vue";
import authService from "@/service/authService";
import HistoryOrder from "@/views/HistoryOrder.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "",
    redirect: "/dashboard",
    component: Mainlayout,
    children: [
      {
        path: "dashboard",
        name: "home",
        component: HomeView,
      },
      {
        path: "search",
        name: "search products",
        component: () => import("@/views/SearchProduct.vue"),
      },
      {
        path: "/category/:id",
        name: "categoty",
        component: CategoryView,
      },
      {
        path: "/cart",
        name: "cart",
        component: CartView,
        meta: {
          title: "Cart",
          requiresAuth: true,
        },
      },
      {
        path: "/product/:id",
        name: "productdetais",
        component: ProductDetail,
      },
      {
        path: "/checkout",
        name: "checkoutoder",
        component: CheckoutOder,
        meta: {
          title: "checkoutoder",
          requiresAuth: true,
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: LayoutProfile,
        children: [
          {
            path: "",
            name: "profile user",
            component: ProfileView,
          },
          {
            path: "change-password",
            name: "change password",
            component: ChangePassword,
          },
        ],
        meta: {
          title: "Profile",
          requiresAuth: true,
        },
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/components/LayoutOrder.vue"),
        children: [
          {
            path: "",
            name: "order user",
            component: OderView,
          },
          {
            path: "history",
            name: "history order",
            component: HistoryOrder,
          },
        ],
        meta: {
          title: "Orders",
          requiresAuth: true,
        },
      },
      {
        path: "/orders-detail/:id",
        name: "orderdetail",
        component: OderDetail,
        meta: {
          title: "Orders Detail",
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/order-success",
    name: "order success",
    component: () => import("@/views/OrderSuccess.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/reset-password",
    name: "reset password",
    component: ResetPassword,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/test",
    component: NavigationView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = authStore();
  if (to.meta.requiresAuth) {
    const res = await authService.isAuthenticated();
    if (!res) {
      // Chuyển hướng đến trang đăng nhập
      next({ name: "login" });
    } else {
      await auth.checkOutStore({ token: auth.getToken });
      next();
    }
  } else {
    const resCheck = await authService.isAuthenticated();
    if (resCheck) {
      const checkUser = authService.checkOutToken({ token: auth.getToken });
      if (checkUser.status === 401 || checkUser.status === 403) {
        next("/login");
      } else {
        await auth.checkOutStore({ token: auth.getToken });
        next();
      }
    } else {
      next();
    }
    if (to.path === "/search") {
      next();
    }
  }
});

export default router;
