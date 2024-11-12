<script setup>
import { supabase } from '@/supabase';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

  const router= useRouter();

  const signupForm = reactive({
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  // Error message state
  const errorMessage = ref('')

    // Signup handler
    const handleSignup = async () => {
    errorMessage.value = ''
    
    // Password validation
    if (signupForm.password !== signupForm.confirmPassword) {
      errorMessage.value = 'Passwords do not match'
      return
    }
    try{
      let { data, error } = await supabase.auth.signUp({
      email: signupForm.email,
      password: signupForm.password,
    });
    if (error) throw error;
    router.push('/');
    }
    catch(error){
      errorMessage.value = error.message;
    }
  }
</script>

<template>
    <form @submit.prevent="handleSignup" class="space-y-6">
          <div>
            <label for="signup-email" class="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="signup-email"
              v-model="signupForm.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
  
          <div>
            <label for="signup-password" class="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="signup-password"
              v-model="signupForm.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a password"
            />
          </div>
  
          <div>
            <label for="signup-confirm-password" class="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              v-model="signupForm.confirmPassword"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
  
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </button>
          <p class="text-gray-300">Already have an account?<a href="/Auth" class="text-blue-500 px-2">Login</a></p>
        </form>
        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-1 text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>
</template>