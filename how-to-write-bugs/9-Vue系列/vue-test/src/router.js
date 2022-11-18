import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('./pages/index.vue')
  },
  {
    path: '/virture',
    name: 'virture',
    component: () => import('./pages/virture.vue')
  },
  {
    path: '/virture2',
    name: 'virture2',
    component: () => import('./pages/virture2.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({y: 0})
})


export default router
