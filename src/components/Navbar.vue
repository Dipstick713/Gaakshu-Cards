<script setup>
import store from '@/store';
import { computed } from 'vue';

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
          <a href="/" className="hover:text-gray-100 flex items-center">
            Home
          </a>
          <a href="/Decks" className="hover:text-gray-100 flex items-center">
            Decks
          </a>
          <a href="/AddDeck" className="hover:text-gray-100 flex items-center">
            Add Deck
          </a>
        </div>
          <a v-if="user" href="/Account" className="hover:text-gray-100 flex items-center">
            Account
          </a>
          <a v-if="!user" href="/Auth" className="hover:text-gray-100 flex items-center">
            Login
          </a>
      </div>
    </nav>
</template>