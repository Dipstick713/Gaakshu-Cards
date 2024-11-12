<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { supabase } from './supabase';
import store from './store';

const appReady = ref(null);
const user = supabase.auth.getUser();

if (!user){
    appReady.value = true;
}

supabase.auth.onAuthStateChange((_, session) => {
    store.methods.setUser(session);
    appReady.value = true;
});

</script>

<template>
<RouterView/>
</template>
