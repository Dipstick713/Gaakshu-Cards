<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/supabase';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute()
const router = useRouter()
const deckId = route.params.id
const cards = ref([])
const deckName = ref('')
const errorMessage = ref('')
const hasUnsavedChanges = ref(false)
const validationErrors = ref([])

// Computed property to check for empty fields
const hasEmptyFields = computed(() => {
  if (!deckName.value?.trim()) {
    return true
  }
  
  return cards.value.some(card => 
    !card.question?.trim() || !card.answer?.trim()
  )
})

// Validation check that returns specific errors
const validateForm = () => {
  const errors = []
  
  if (!deckName.value?.trim()) {
    errors.push('Deck name cannot be empty')
  }
  
  cards.value.forEach((card, index) => {
    if (!card.question?.trim()) {
      errors.push(`Card ${index + 1} question cannot be empty`)
    }
    if (!card.answer?.trim()) {
      errors.push(`Card ${index + 1} answer cannot be empty`)
    }
  })
  
  validationErrors.value = errors
  return errors.length === 0
}

// Fetch deck and cards data
const fetchDeckData = async () => {
  try {
    const { data: deckData, error: deckError } = await supabase
      .from('decks')
      .select('deck_name')
      .eq('id', deckId)
      .single()
    if (deckError) throw deckError;
    deckName.value = deckData.deck_name
    
    const { data: cardsData, error: cardsError } = await supabase
      .from('cards')
      .select('id, question, answer')
      .eq('deck_id', deckId)
      .order('created_at')
    
    if (cardsError) throw cardsError;
    
    cards.value = cardsData
  } catch (error) {
    errorMessage.value = 'Error fetching deck data: ' + error.message
  }
}

const saveAllChanges = async () => {
  // Clear previous error messages
  errorMessage.value = ''
  validationErrors.value = []
  
  // Validate form before saving
  if (!validateForm()) {
    errorMessage.value = 'Please fix the following errors:'
    return
  }

  try {
    // Update deck name
    const { error: deckError } = await supabase
      .from('decks')
      .update({ deck_name: deckName.value.trim() })
      .eq('id', deckId)

    if (deckError) throw deckError;

    // Update all cards
    for (const card of cards.value) {
      const { error: cardError } = await supabase
        .from('cards')
        .update({
          question: card.question.trim(),
          answer: card.answer.trim()
        })
        .eq('id', card.id)
      
      if (cardError) throw cardError;
    }
    router.push('/Decks')
    hasUnsavedChanges.value = false
  } catch (error) {
    errorMessage.value = 'Error saving changes: ' + error.message
  }
}

const deleteCard = async (cardId) => {
  try {
    // Don't allow deletion if there's only one card
    if (cards.value.length <= 1) {
      errorMessage.value = 'Cannot delete the last card'
      return
    }

    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', cardId)
    
    if (error) throw error
    
    cards.value = cards.value.filter(card => card.id !== cardId)
    hasUnsavedChanges.value = true
  } catch (error) {
    errorMessage.value = 'Error deleting card: ' + error.message
  }
}

const addNewCard = async () => {
  try {
    const newCard = {
      deck_id: deckId,
      question: '',
      answer: '',
      created_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('cards')
      .insert([newCard])
      .select()

    if (error) throw error
    
    if (data && data[0]) {
      cards.value.push({
        id: data[0].id,
        question: data[0].question,
        answer: data[0].answer
      })
      hasUnsavedChanges.value = true
    } else {
      throw new Error('No data returned from insert operation')
    }
  } catch (error) {
    errorMessage.value = 'Error adding new card: ' + error.message
  }
}

const handleInputChange = () => {
  hasUnsavedChanges.value = true
  // Clear validation errors when user starts typing
  validationErrors.value = []
  errorMessage.value = ''
}

onMounted(() => {
  fetchDeckData()
})
</script>

<template>
<Navbar/>
  <div class="p-6 bg-gray-900 min-h-screen text-gray-100">
    <!-- Error Message -->
    <div v-if="errorMessage || validationErrors.length > 0" 
         class="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded mb-4">
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <ul v-if="validationErrors.length > 0" class="list-disc list-inside">
        <li v-for="(error, index) in validationErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <h2 class="text-xl font-bold mb-4 text-gray-100">Deck Name</h2>
    <form id="deck-edit-form" @submit.prevent="saveAllChanges" class="space-y-6">
      <!-- Deck Name Input -->
      <div class="flex gap-2">
        <input
          v-model="deckName"
          type="text"
          maxlength="20"
          placeholder="Enter deck name"
          @input="handleInputChange"
          name="deck-name"
          :class="`flex-1 rounded-md bg-gray-800 pl-2 py-2 border text-gray-100 shadow-sm 
                  focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500
                  ${!deckName?.trim() ? 'border-red-500' : 'border-gray-700'}`"
        />
      </div>

      <!-- Cards List -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold mb-4 text-gray-100">Cards</h2>
        
        <div v-for="(card, index) in cards" :key="card.id" 
             class="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-lg">
          <div class="space-y-4">
            <div>
              <input
                maxlength="120"
                v-model="card.question"
                type="text"
                :name="`card-${index}-question`"
                placeholder="Enter question"
                @input="handleInputChange"
                :class="`w-full rounded-md bg-gray-700 pl-2 py-2 text-gray-100 
                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                        placeholder-gray-500 border
                        ${!card.question?.trim() ? 'border-red-500' : 'border-gray-600'}`"
              />
            </div>
            
            <div>
              <input
                maxlength="120"
                v-model="card.answer"
                :name="`card-${index}-answer`"
                placeholder="Enter answer"
                @input="handleInputChange"
                :class="`w-full rounded-md bg-gray-700 pl-2 py-2 text-gray-100 
                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                        placeholder-gray-500 border
                        ${!card.answer?.trim() ? 'border-red-500' : 'border-gray-600'}`"
              ></input>
            </div>
            
            <div class="flex justify-end">
              <button
                type="button"
                @click="deleteCard(card.id)"
                :disabled="cards.length <= 1"
                :title="cards.length <= 1 ? 'Cannot delete the last card' : 'Delete card'"
                class="bg-red-600 text-gray-100 px-4 py-2 rounded-md hover:bg-red-700 
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add New Card Button -->
      <button
        type="button"
        @click="addNewCard"
        class="bg-green-600 text-gray-100 px-4 py-2 rounded-md hover:bg-green-700 
               transition-colors duration-200"
      >
        Add New Card
      </button>

      <!-- Save All Changes Button -->
      <div class="sticky bottom-6 flex justify-end mt-6">
        <button
          type="submit"
          :disabled="!hasUnsavedChanges || hasEmptyFields"
          :title="hasEmptyFields ? 'Please fill in all fields before saving' : ''"
          class="bg-indigo-600 text-gray-100 px-6 py-3 rounded-md hover:bg-indigo-700 
                 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save All Changes
        </button>
      </div>
    </form>
  </div>
</template>