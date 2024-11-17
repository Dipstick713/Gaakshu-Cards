<script setup>
import LoginAccess from '@/components/LoginAccess.vue'
import Navbar from '@/components/Navbar.vue'
import YourDecks from '@/components/YourDecks.vue'
import Hero from '@/components/Hero.vue'
import CreateDeck from '@/components/CreateDeck.vue'
import StudySession from '@/components/StudySession.vue'
import store from '@/store';
import { computed } from 'vue';
const user = computed(()=> store.state.user);
</script>

<template>
  <Navbar/>
  <div class="bg-gray-900 min-h-screen text-gray-300">
    <main class="container mx-auto px-4 py-8">
      <Hero/>
      <YourDecks v-if="user"/>
      <LoginAccess v-else/>
      <section>
        <h2 class="text-2xl font-semibold text-gray-100 mb-4">Quick Start Guide</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <CreateDeck/>
          <StudySession/>
        </div>
      </section>
    </main>
  </div>
</template>
