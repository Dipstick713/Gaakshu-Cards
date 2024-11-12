<script setup>
import Login from '@/components/LoginAccess.vue';
import Navbar from '@/components/Navbar.vue';
import Card from '@/components/Card.vue';
</script>

<template>
    <Navbar/>
    <div class="bg-gray-900 min-h-screen text-gray-300">
        <main class="container mx-auto px-4 py-8">
            <Card/>
        </main>
    </div>
</template>