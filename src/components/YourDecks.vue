<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { supabase } from '@/supabase';
import store from '@/store';
const user = computed(()=> store.state.user);
const decks=ref([]);
if(user)
  {onMounted(async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from('decks')
    .select('id, deck_name')
    .eq('user_id',`${user.id}`);
    decks.value=data;
});}
const displayedDecks = computed(() => decks.value.slice(0, 5));
const hasMoreDecks = computed(() => decks.value.length > 4);
</script>

<template>
  <div class="bg-gray-900 text-white">
    <h2 class="text-2xl font-bold mb-4">Your Decks</h2>
    <div class="flex flex-wrap ">
      <div v-for="deck in displayedDecks" :key="deck.id" class="w-64 h-40 m-2 bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300">
        <h3 class="text-lg font-semibold">{{ deck.deck_name }}</h3>
      </div>
    </div>
    <div v-if="hasMoreDecks" class="flex justify-end mt-4">
      <RouterLink to="/Decks">
      <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md flex items-center">
        More
        <i class="pi pi-arrow-right pl-2"></i>
      </button>
      </RouterLink>
    </div>
  </div>
</template>