<script setup>
import { ref, computed } from 'vue'
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router'
import store from '@/store';
import Navbar from '@/components/Navbar.vue';
import LoginAccess from '@/components/LoginAccess.vue';
const user = computed(()=> store.state.user);

const router = useRouter()
const deckName = ref('')
const cards = ref([{ question: '', answer: '' }])

const canAddCard = computed(() => {
  const lastCard = cards.value[cards.value.length - 1]
  return lastCard.question.trim() !== '' && lastCard.answer.trim() !== ''
})

const addCard = () => {
  if (canAddCard.value) {
    cards.value.push({ question: '', answer: '' })
  }
}

const removeCard = (index) => {
  cards.value.splice(index, 1)
  if (cards.value.length === 0) {
    cards.value.push({ question: '', answer: '' })
  }
}

const createDeck = async () => {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      throw userError
    }

    const { data: deck, error: deckError } = await supabase
      .from('decks')
      .insert({
        user_id: user.id,
        deck_name: deckName.value
      })
      .select()
      .single()

    if (deckError) {
      throw deckError
    }

    const cardInserts = cards.value.map(card => ({
      deck_id: deck.id,
      question: card.question,
      answer: card.answer
    }))

    const { error: cardError } = await supabase
      .from('cards')
      .insert(cardInserts)

    if (cardError) {
      console.error('Card error:', cardError)
      return
    }

    // Navigate to deck view
    router.push(`/Decks`)

  } catch (error) {
    console.error('Error creating deck:', error)
  }
}
</script>

<template>
  <Navbar/>
  <div v-if="!user" class="bg-gray-900 min-h-screen text-gray-300">
        <div class="py-5 px-10">
            <LoginAccess/>
        </div>
  </div>
  <div v-else class="flex flex-col min-h-screen bg-gray-900 text-white p-6">
    <h1 class="text-2xl font-bold mb-4">Create New Deck</h1>
    <form @submit.prevent="createDeck" class="w-full space-y-4">
      <div>
        <label for="deckName" class="block mb-2">Deck Name:</label>
        <input
          maxlength="20"
          id="deckName"
          v-model="deckName"
          class="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded w-full"
          required
        />
      </div>

      <div>
        <h2 class="text-xl font-bold mb-2">Add Cards</h2>
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="bg-gray-800 p-4 rounded flex items-center gap-4"
        >
          <div class="flex-1">
            <label :for="`card-${index}-question`" class="block mb-2">Question:</label>
            <input
              maxlength="120"
              :id="`card-${index}-question`"
              v-model="card.question"
              class="bg-gray-700 border-gray-600 text-white px-4 py-2 rounded w-full"
              required
            />
          </div>
          <div class="flex-1">
            <label :for="`card-${index}-answer`" class="block mb-2">Answer:</label>
            <input
              maxlength="120"
              :id="`card-${index}-answer`"
              v-model="card.answer"
              class="bg-gray-700 border-gray-600 text-white px-4 py-2 rounded w-full"
              required
            />
          </div>
          <button
            type="button"
            @click="removeCard(index)"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-8"
          >
            Remove Card
          </button>
        </div>
        <button
          type="button"
          @click="addCard"
          :disabled="!canAddCard"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Card
        </button>
      </div>

      <button
        type="submit"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Deck
      </button>
    </form>
  </div>
</template>