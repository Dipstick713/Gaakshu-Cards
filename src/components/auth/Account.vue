<script setup>
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';
import Navbar from '../Navbar.vue';

const router = useRouter();

const logout = async () => {
    await supabase.auth.signOut();
    router.push('/');
}

</script>

<template>
<Navbar/>
<div class="flex justify-center space-x-4">
    <button @click="logout">Logout</button>
</div>
</template>

