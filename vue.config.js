const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/shop-huannb/" // Thay tên repository của các bạn vào đây nhé
      : "/",
});
