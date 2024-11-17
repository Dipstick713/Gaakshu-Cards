<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink to="/Delete">
    <button class="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg">
        <div class="flex items-center mb-3 ">
            <i class="pi pi-trash text-red-600 mr-2" :size="24" ></i>
            <h3 class="text-xl font-semibold text-gray-100">Delete a Deck</h3>
        </div>
        
        <p class="ml-2">Remove a deck to keep your collection streamlined and focused on your priorities.</p>
    </button>
</RouterLink>
</template>