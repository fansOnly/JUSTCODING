/* eslint-disable no-undef */
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        },
        open: true,
        proxy: {
            '/api': {
                target: 'http://192.168.0.73:8088',
                ws: false, //增加websocket代理
                //secure: true, https协议需要开启
                chainOrigin: true, // 跨域
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(options => {
                options[0].title = 'vue 测试项目集合'
                return options
            })
    }
}
