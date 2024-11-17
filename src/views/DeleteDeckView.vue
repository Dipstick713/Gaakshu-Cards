<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute()
const router = useRouter()
const deckId = route.params.id
const cards = ref([])
const deckName = ref('')
const errorMessage = ref('')
const isDeleting = ref(false)

// Fetch deck and cards data
const fetchDeckData = async () => {
  try {
    const { data: deckData, error: deckError } = await supabase
      .from('decks')
      .select('deck_name')
      .eq('id', deckId)
      .single()
    if (deckError)
    {
        throw deckError;
    };
    deckName.value = deckData.deck_name
    
    const { data: cardsData, error: cardsError } = await supabase
      .from('cards')
      .select('id, question, answer')
      .eq('deck_id', deckId)
      .order('created_at')
    
    if (cardsError) throw cardsError;
    
    cards.value = cardsData
  } catch (error) {
    router.push('/');
    errorMessage.value = 'Error fetching deck data: ' + error.message
  }
}

const deleteDeck = async () => {
  if (!confirm('Are you sure you want to delete this deck? This action cannot be undone.')) {
    return
  }

  try {
    isDeleting.value = true
    
    // Delete all cards first due to foreign key constraint
    const { error: cardsError } = await supabase
      .from('cards')
      .delete()
      .eq('deck_id', deckId)
    
    if (cardsError) throw cardsError

    // Then delete the deck
    const { error: deckError } = await supabase
      .from('decks')
      .delete()
      .eq('id', deckId)
    
    if (deckError) throw deckError

    // Redirect to decks list after successful deletion
    router.push('/decks')
  } catch (error) {
    errorMessage.value = 'Error deleting deck: ' + error.message
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchDeckData()
})
</script>

<template>
<Navbar/>
  <div class="p-6 bg-gray-900 min-h-screen text-gray-100">
    <!-- Error Message -->
    <div v-if="errorMessage" 
         class="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded mb-4">
      <p>{{ errorMessage }}</p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4 text-gray-100">Deck Name</h2>
      <div class="flex gap-2">
        <div class="flex-1 rounded-md bg-gray-800 pl-2 py-2 border border-gray-700 text-gray-100">
          {{ deckName }}
        </div>
      </div>
    </div>

    <!-- Cards List -->
    <div class="space-y-4">
      <h2 class="text-xl font-bold mb-4 text-gray-100">Cards</h2>
      
      <div v-for="(card, index) in cards" :key="card.id" 
           class="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-lg">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Question</label>
            <div class="w-full rounded-md bg-gray-700 pl-2 py-2 text-gray-100 border border-gray-600">
              {{ card.question }}
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Answer</label>
            <div class="w-full rounded-md bg-gray-700 pl-2 py-2 text-gray-100 border border-gray-600">
              {{ card.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Deck Button -->
    <div class="sticky bottom-6 flex justify-end mt-6">
      <button
        type="button"
        @click="deleteDeck"
        :disabled="isDeleting"
        class="bg-red-600 text-gray-100 px-6 py-3 rounded-md hover:bg-red-700 
               transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isDeleting ? 'Deleting...' : 'Delete Deck' }}
      </button>
    </div>
  </div>
</template>