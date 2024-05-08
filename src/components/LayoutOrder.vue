<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <aside
      class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
    >
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul
          role="list"
          class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
        >
          <li>
            <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
            <router-link
              activeClass="bg-gray-50 text-indigo-600"
              exactActiveClass="bg-gray-50 text-indigo-600"
              to="/orders"
              class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
            >
              <font-awesome-icon
                icon="cart-shopping"
                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
              />
              Đơn hàng</router-link
            >
          </li>
          <li>
            <router-link
              activeClass="bg-gray-50 text-indigo-600"
              exactActiveClass="bg-gray-50 text-indigo-600"
              :to="{ name: 'history order' }"
              class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
            >
              <font-awesome-icon
                icon="clock-rotate-left"
                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
              />
              Lịch sử mua hàng
            </router-link>
          </li>
          <!-- <li>
            <a
              href="#"
              class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
            >
              <svg
                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              Thông báo
            </a>
          </li> -->
        </ul>
      </nav>
    </aside>
    <main class="px-4 sm:px-6 lg:flex-auto lg:px-0 min-h-[700px]">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup></script>

<style scoped></style>
