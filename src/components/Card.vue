<script setup>
import { ref, reactive, computed } from 'vue'

const currentIndex = ref(0)
const isFlipped = ref(false)

const cards = reactive([
  { front: "What is the capital of France?", back: "Paris" },
  { front: "What is the largest planet in our solar system?", back: "Jupiter" },
  { front: "Who wrote 'Romeo and Juliet'?", back: "William Shakespeare" },
])

const currentCard = computed(() => cards[currentIndex.value])

const handleFlip = () => {
  isFlipped.value = !isFlipped.value
}

const changeCard = (direction) => {
  if (isFlipped.value) {
    isFlipped.value = false
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + direction + cards.length) % cards.length
    }, 300)
  } else {
    currentIndex.value = (currentIndex.value + direction + cards.length) % cards.length
  }
}

const isLastCard = computed(() => {
  return currentIndex.value === cards.length - 1;
});

const isFirstCard = computed(() => {
  return currentIndex.value === 0;
});

const handlePrevious = () => changeCard(-1)
const handleNext = () => changeCard(1)

const handleFinish = () => {
  // Implement finish logic here
  alert("Congratulations! You've completed the flashcard deck.");
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <h1 class="text-3xl font-bold mb-4">Flashcard Study</h1>
    <p class="mb-8">Card {{ currentIndex + 1 }} of {{ cards.length }}</p>

    <div class="flashcard-container w-full max-w-2xl aspect-video mb-8">
      <div 
        class="flashcard"
        :class="{ 'is-flipped': isFlipped }"
        @click="handleFlip"
      >
        <div class="flashcard-face flashcard-front bg-navy">
          <div class="flex items-center justify-center h-full p-8 text-center text-2xl">
            {{ currentCard.front }}
          </div>
        </div>
        <div class="flashcard-face flashcard-back bg-dark-green">
          <div class="flex items-center justify-center h-full p-8 text-center text-2xl">
            {{ currentCard.back }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-4">
      <button v-if="!isFirstCard" @click="handlePrevious" class="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">Previous</button>
      <button v-if="!isLastCard" @click="handleNext" class="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">Next</button>
      <button v-else @click="handleFinish" class="px-6 py-2 bg-green-600 rounded hover:bg-green-800">Finish</button>
    </div>
  </div>
</template>

<style>
:root {
  --dark-navy: #1a1e2e;
  --navy: #252b3d;
  --dark-green: #1c3a3a;
  --blue: #3b82f6;
}

body {
  background-color: var(--dark-navy);
  color: white;
  font-family: Arial, sans-serif;
}

.bg-dark-navy {
  background-color: var(--dark-navy);
}

.bg-navy {
  background-color: var(--navy);
}

.bg-dark-green {
  background-color: var(--dark-green);
}

.bg-blue-600 {
  background-color: var(--blue);
}

.flashcard-container {
  perspective: 1000px;
}

.flashcard {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.flashcard.is-flipped {
  transform: rotateY(180deg);
}

.flashcard-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.flashcard-back {
  transform: rotateY(180deg);
}
</style>