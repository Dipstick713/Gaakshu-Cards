<script setup>
import store from '@/store';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const user = computed(()=> store.state.user);
</script>

<template>
    <nav className="bg-gray-800 text-gray-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl pr-2 font-bold text-gray-100">
            <i class="pi pi-bolt"></i>
            Gakshuu Cards
          </span>
          <RouterLink to="/" className="hover:text-gray-100 flex items-center">
            Home
          </RouterLink>
          <RouterLink to="/Decks" className="hover:text-gray-100 flex items-center">
            Decks
          </RouterLink>
          <RouterLink to="/ManageDeck" className="hover:text-gray-100 flex items-center">
            Manage Deck
          </RouterLink>
        </div>
          <RouterLink v-if="user" to="/Account" className="hover:text-gray-100 flex items-center">
            <i class="pi pi-user"> Account</i>
          </RouterLink>
          <RouterLink v-if="!user" to="/Auth" className="hover:text-gray-100 flex items-center">
            Login
          </RouterLink>
      </div>
    </nav>
</template>