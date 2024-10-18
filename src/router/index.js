import AddDeckView from '@/views/AddDeckView.vue'
import DecksView from '@/views/DecksView.vue'
import HomeView from '@/views/HomeView.vue'
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
    
  ]
})

export default router
