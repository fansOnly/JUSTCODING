/* eslint-disable no-undef */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

// const userWebpackCfg = {  // 打包配置
//     useBundleAnalyzer: false, // 开启打包资源分析
//     useGzip: false,  // 开启打包gzip压缩，需要服务器配置
// }

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
        // config.when(isProd,
        //     config => {
        //         config.plugin('TerserPlugin')
        //         .use(require('terser-webpack-plugin'), [{
        //             sourceMap: false,
        //             terserOptions: {
        //                 compress: {
        //                     // warnings: false,
        //                     drop_console: true, //注释console
        //                     drop_debugger: true,
        //                     pure_funcs: ['console.log'] //移除console
        //                 }
        //             }
        //         }])
        //         .end()
        //         config.when(userWebpackCfg.useGzip, config => {
        //             config.plugin('CompressionWebpackPlugin')
        //             .use(require('compression-webpack-plugin'), [{
        //                 // filename: "[path][base].gz",
        //                 algorithm: 'gzip',
        //                 test: /\.(js|css)/,
        //                 threshold: 10240,  // 处理资源大小
        //                 minRatio: 0.6,  // 压缩比例
        //                 // deleteOriginalAssets: false,  // 删除原始资源文件
        //             }])
        //             .end()
        //         })
        //     }
        // )
        // config.when(userWebpackCfg.useBundleAnalyzer, config => {
        //     config.plugin('BundleAnalyzerPlugin')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        //     .end()
        // })
    }
}
