const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
const path = require("path");
const resolve = (dir) => {
    return path.join(__dirname, dir);
};
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === "production" ? process.env.VUE_APP_PUBLIC_PATH : "/";
module.exports = {
    chainWebpack: (config) => {
        config.resolve.symlinks(true);
        config.resolve.alias.set("@", resolve("src"));
        config.plugin('html').tap((args) => { args[0].title = 'amy'; return args; });
    },
    css: {
        extract: false,
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
    },
    devServer: {

    },
    publicPath: BASE_URL,
    outputDir: "dist_mobile"
};