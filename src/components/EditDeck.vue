<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink to="/Edit">
    <button class="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg">
        <div class="flex items-center mb-3 ">
            <i class="pi pi-wrench text-green-400 mr-2" :size="24" ></i>
            <h3 class="text-xl font-semibold text-gray-100">Edit Your Deck</h3>
        </div>
        <p class="ml-2">Update and refine your flashcards to customize your deck and enhance your learning experience.</p>
    </button>
</RouterLink>
</template>