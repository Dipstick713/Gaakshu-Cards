<script setup>
  import { supabase } from '@/supabase';
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router';
  // Login form state
  const loginForm = reactive({
    email: '',
    password: ''
  })
  const router = useRouter();
  
  // Error message state
  const errorMessage = ref('')
  
  // Login handler
  const handleLogin = async () => {
    try{
      let { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (error) throw error;
    router.push('/');
    } catch(error){
      errorMessage.value = `${error.message}`
    }
  }
</script>

<template>
    <!-- Login Form -->
    <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="login-email" class="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="login-email"
              v-model="loginForm.email"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
  
          <div>
            <label for="login-password" class="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="login-password"
              v-model="loginForm.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
  
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-4 text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>
</template>