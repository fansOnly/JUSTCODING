import Vue from 'vue'
import VueRouter from './rare-router'

import Index from '../pages/index.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '',
    name: 'index',
    component: Index
  },
  {
    path: '/foo',
    name: 'foo',
    component: () => import('../pages/foo.vue')
  },
  {
    path: '/bar',
    name: 'bar',
    component: () => import('../pages/bar.vue')
  }
]

const router = new VueRouter({
  routes,
  // scrollBehavior: () => ({y: 0})
})


export default router
