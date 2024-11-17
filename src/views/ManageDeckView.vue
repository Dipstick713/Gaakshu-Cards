<script setup>
import LoginAccess from '@/components/LoginAccess.vue';
import Navbar from '@/components/Navbar.vue';
import CreateDeck from '@/components/CreateDeck.vue';
import EditDeck from '../components/EditDeck.vue';
import DeleteDeck from '../components/DeleteDeck.vue';
import { computed } from 'vue';
import store from '@/store';

const user = computed(() => store.state.user);
</script>

<template>
  <Navbar />
  <div class="bg-gray-900 min-h-screen text-gray-300">
    <div v-if="!user" class="py-5 px-10">
      <LoginAccess />
    </div>
    <div v-else class="flex flex-col min-h-screen justify-center max-w-2xl mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold text-gray-100 text-center mb-8">
        Manage Your Deck
      </h1>
      <div class="flex flex-col space-y-3">
        <CreateDeck />
        <EditDeck />
        <DeleteDeck />
      </div>
    </div>
  </div>
</template>