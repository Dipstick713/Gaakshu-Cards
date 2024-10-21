<template>
  <div class="bg-gray-900 text-white">
    <h2 class="text-2xl font-bold mb-4">Your Decks</h2>
    <div class="flex flex-wrap">
      <div v-for="deck in displayedDecks" :key="deck.id" class="w-64 h-40 m-2 bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center">
        <h3 class="text-lg font-semibold">{{ deck.title }}</h3>
        <p class="text-sm text-gray-500">{{ deck.cardCount }} cards</p>
      </div>
    </div>
    <div v-if="hasMoreDecks" class="flex justify-end mt-4">
      <a href="/Decks">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
        More
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const decks = ref([
  { id: 1, title: "Spanish Vocabulary", cardCount: 50 },
  { id: 2, title: "JavaScript Basics", cardCount: 30 },
  { id: 3, title: "World Capitals", cardCount: 195 },
  { id: 4, title: "Chemistry Formulas", cardCount: 75 },
  { id: 5, title: "Historical Dates", cardCount: 100 },
  { id: 6, title: "Historical Dates", cardCount: 100 },
]);

const displayedDecks = computed(() => decks.value.slice(0, 5));
const hasMoreDecks = computed(() => decks.value.length > 4);

</script>