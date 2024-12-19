import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import menuView from '@/components/menu.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: menuView,
    },
    {
      path: '/kakeibo/:year:month',
      name: 'kakeibo',
      component: () => {
        return import("@/components/kakeibo.vue");
      },
      props: true
    },
    {
      path: '/regist/deta',
      name: 'regist-data',
      component: () => {
        return import("@/components/DataRegister.vue");
      }
    },
    {
      path: '/regist/credit',
      name: 'regist-credit',
      component: () => {
        return import("@/components/CreditRegister.vue");
      }
    },
    {
      path: '/regist/credit-detaile/:year:month',
      name: 'regist-credit-detaile',
      component: () => {
        return import("@/components/CreditDetailRegister.vue");
      }
    },
  ],
})

export default router
