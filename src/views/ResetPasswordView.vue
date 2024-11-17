<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const isResetMode = ref(false)

onMounted(() => {
  // Check if we have a reset token in the URL
  const hash = window.location.hash
  if (hash && hash.includes('type=recovery')) {
    isResetMode.value = true
  }
})

const validatePassword = () => {
  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long'
    return false
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return false
  }
  return true
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address'
    return false
  }
  return true
}

const handleResetRequest = async () => {
  try {
    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    if (!validateEmail()) {
      isLoading.value = false
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/ResetPassword`
    })

    if (error) throw error

    successMessage.value = 'Password reset link has been sent to your email'
    email.value = ''
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred while requesting password reset'
  } finally {
    isLoading.value = false
  }
}

const handlePasswordUpdate = async () => {
  try {
    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    if (!validatePassword()) {
      isLoading.value = false
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: password.value
    })

    if (error) throw error

    successMessage.value = 'Password has been successfully updated'
    password.value = ''
    confirmPassword.value = ''

    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push('/Auth')
    }, 2000)
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred while updating password'
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <Navbar />
  <div class="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-100">
        {{ isResetMode ? 'Reset Your Password' : 'Request Password Reset' }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Error Message -->
        <div v-if="errorMessage" 
             class="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded mb-4">
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" 
             class="bg-green-900/50 border border-green-600 text-green-200 px-4 py-3 rounded mb-4">
          {{ successMessage }}
        </div>

        <!-- Request Reset Form -->
        <form v-if="!isResetMode" @submit.prevent="handleResetRequest" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-200">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md 
                       shadow-sm placeholder-gray-400 bg-gray-700 text-gray-100
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                   shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>

        <!-- Reset Password Form -->
        <form v-else @submit.prevent="handlePasswordUpdate" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-200">
              New Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md 
                       shadow-sm placeholder-gray-400 bg-gray-700 text-gray-100
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-200">
              Confirm New Password
            </label>
            <div class="mt-1">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md 
                       shadow-sm placeholder-gray-400 bg-gray-700 text-gray-100
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                   shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Updating...' : 'Update Password' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>