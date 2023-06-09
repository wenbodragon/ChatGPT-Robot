import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      //@ts-ignore
      component: () => import('../views/chatRoom/ChatRoom.vue')
    },
    {
      path: '/chatroom',
      name: '',
      //@ts-ignore
      component: () => import('../views/chatRoom/ChatRoom.vue')
    }
  ]
})

export default router
