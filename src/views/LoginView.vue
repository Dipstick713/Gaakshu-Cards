<script setup>
 import Login from '@/components/auth/Login.vue';
 import SignUp from '@/components/auth/SignUp.vue';
 import { ref } from 'vue';
 const formType = ref('login')
</script>

<template>
    <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div class="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <!-- Toggle between Login and Signup -->
        <div class="flex justify-center space-x-4 text-gray-300 mb-8">
          <button 
            @click="formType = 'login'"
            :class="{'text-blue-500 border-b-2 border-blue-500': formType === 'login'}"
            class="pb-2 px-4 transition-colors">
            Login
          </button>
          <button 
            @click="formType = 'signup'"
            :class="{'text-blue-500 border-b-2 border-blue-500': formType === 'signup'}"
            class="pb-2 px-4 transition-colors">
            Sign Up
          </button>
        </div>
        <Login v-if="formType === 'login'"/>
        <SignUp v-else/>
      </div>
    </div>
  </template>
  
 