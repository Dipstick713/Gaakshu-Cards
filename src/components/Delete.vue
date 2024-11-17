<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase';
import store from '@/store';
import { computed } from 'vue';
const user = computed(()=> store.state.user);
const router = useRouter();
const decks=ref({});
if(user)
  {onMounted(async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from('decks')
    .select('id, deck_name')
    .eq('user_id',`${user.id}`);
    decks.value=data;
});}

const emit = defineEmits(['selectDeck']);

const handleDeckSelect = (deckId) => {
  router.push(`/Delete/${deckId}`);
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-8">
    <h2 class="text-2xl font-bold text-white mb-2">
      Your Flashcard Decks
    </h2>
    <p class="text-sm text-gray-400 mb-6">
      Select a deck to start edit
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <button
        v-for="deck in decks"
        :key="deck.id"
        @click="handleDeckSelect(deck.id)"
        class="flex flex-col justify-between p-4 bg-gray-800 rounded-xl shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300"
      >
        <div class="flex items-center mb-2">
          <svg class="h-5 w-5 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <span class="text-white font-medium">{{ deck.deck_name }}</span>
        </div>
      </button>
    </div>
  </div>
</template>