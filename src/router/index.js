import Account from '@/components/auth/Account.vue'
import ManageDeckView from '@/views/ManageDeckView.vue'
import DecksView from '@/views/DecksView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CreateDeckView from '@/views/CreateDeckView.vue'
import StudyView from '@/views/StudyView.vue'
import EditDeckView from '@/views/EditDeckView.vue'
import Edit from '@/components/Edit.vue'
import Delete from '@/components/Delete.vue'
import DeleteDeckView from '@/views/DeleteDeckView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

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
      path: '/ManageDeck',
      name: 'ManageDeck',
      component: ManageDeckView
    },
    {
      path: '/CreateDeck',
      name: 'CreateDeck',
      component: CreateDeckView 
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
    },
    {
      path: '/Study/:id',
      name: 'Study',
      component: StudyView
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/Edit/:id',
      name: 'EditView',
      component: EditDeckView
    },
    {
      path: '/Delete',
      name: 'Delete',
      component: Delete
    },
    {
      path: '/Delete/:id',
      name: 'DeleteView',
      component: DeleteDeckView
    },
    {
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: ResetPasswordView
    }
  ]
})

export default router
