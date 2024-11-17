<script setup>
import LoginAccess from '@/components/LoginAccess.vue';
import Navbar from '@/components/Navbar.vue';
import Decks from '@/components/Decks.vue';
import store from '@/store';
import { computed } from 'vue';
const user = computed(()=> store.state.user);
</script>

<template>
    <Navbar/>
    <div class="bg-gray-900 min-h-screen text-gray-300">
        <div v-if="!user" class="py-5 px-10">
            <LoginAccess/>
        </div>
        <main v-else class="container mx-auto px-4 py-8">
            <Decks/>
        </main>
    </div>
</template>