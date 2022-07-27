const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    hot: false,
    https: false,
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn"
      }
    }
  }
});
