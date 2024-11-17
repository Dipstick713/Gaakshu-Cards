<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink to="/CreateDeck">
    <button class="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg">
        <div class="flex items-center mb-3 ">
            <i class="pi pi-plus text-blue-400 mr-2" :size="24" ></i>
            <h3 class="text-xl font-semibold text-gray-100">Create a Deck</h3>
        </div>
        <p class="ml-2">Start by creating your own custom deck of flashcards tailored to your learning needs.</p>
    </button>
    </RouterLink>
</template>