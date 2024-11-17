<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink to="/Decks">
    <button class="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg">
        <div class="flex items-center mb-3">
            <i class="pi pi-play text-green-400 mr-2" :size="24" ></i>
            <h3 class="text-xl font-semibold text-gray-100">Begin a Study Session</h3>
        </div>
        <p class="ml-2">Choose a deck and start a study session to test your knowledge and track your progress.</p>
    </button>
</RouterLink>
</template>