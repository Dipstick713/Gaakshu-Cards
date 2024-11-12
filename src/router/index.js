import Account from '@/components/auth/Account.vue'
import AddDeckView from '@/views/AddDeckView.vue'
import DecksView from '@/views/DecksView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/Decks',
      name: 'Decks',
      component: DecksView
    },
    {
      path: '/AddDeck',
      name: 'AddDeck',
      component: AddDeckView
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: LoginView
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    }
  ]
})

export default router
