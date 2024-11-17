<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-100 mb-4">Login</h2>
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-100 mb-2">Access Your Learning Journey</h3>
          <p class="mb-4">Log in to create decks, study, and track your progress.</p>
          <RouterLink to="/Auth">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 flex items-center">
              Login
              <i class="pi pi-arrow-right ml-2" :size="20" ></i>
          </button>
          </RouterLink>
        </div>
    </section>
</template>