import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/home/index.vue'),
      meta: { title: '首页' },
    },
    {
      path: '/games/snake',
      name: 'Snake',
      component: () => import('@/pages/games/snake.vue'),
      meta: { title: '贪吃蛇' },
    },
  ],
})


router.afterEach((to) => {
  const title = to.meta.title
  document.title = title
  window.scrollTo(0, 0)
})

export default router
