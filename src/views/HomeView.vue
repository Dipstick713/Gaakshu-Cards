<script setup>
import Login from '@/components/Login.vue'
import YourDecks from '@/components/YourDecks.vue'
import Hero from '@/components/Hero.vue'
import CreateDeck from '@/components/CreateDeck.vue'
import StudySession from '@/components/StudySession.vue'
</script>

<template>
  <div class="bg-gray-900 min-h-screen text-gray-300">
    <main class="container mx-auto px-4 py-8">
      <Hero/>
      <YourDecks/>
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
