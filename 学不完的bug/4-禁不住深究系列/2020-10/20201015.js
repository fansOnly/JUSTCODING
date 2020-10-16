/**
 * 面试碰壁001
 * vuex 的数据在页面刷新时会丢失，通过监听页面的卸载事件存入缓存中，判断页面进入状态，如果时刷新操作，读取缓存并设置vuex，然后删除缓存
 * beforeunload 兼容性问题
 */

export default {
    mounted() {
        console.log('window.performance.navigation', window.performance.navigation)

        if (window.performance.navigation.type == 1) {
            console.log('页面被刷新')
            if (sessionStorage.getItem('storeData')) {
                this.$store.dispatch('state/setUser', sessionStorage.getItem('storeData'))
                sessionStorage.removeItem('storeData')
            }
        } else {
            console.log('首次被加载')
        }

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('storeData', `刷新时缓存store数据: ${JSON.stringify(this.$store.state.state.userInfo)}`)
        })
    }
}
