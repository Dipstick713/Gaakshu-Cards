<script setup>
import { supabase } from '@/supabase';
import { ref,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../Navbar.vue';

const router = useRouter();
const email = ref();

const logout = async () => {
    await supabase.auth.signOut();
    router.push('/');
}

onMounted(async () =>{
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if(user){
        email.value= user.email;
    }
});
</script>

<template>
<Navbar/>
<body class="bg-gray-900 min-h-screen mx-auto py-8 px-4">
<div class="bg-gray-900 max-w-2xl mx-auto py-8 px-4">
    <div class="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
      <h2 class="text-2xl font-semibold text-gray-100 mb-6">Account Settings</h2>
      <div class="space-y-6">
        <!-- Email Display -->
        <div class="flex items-center space-x-3 p-4 bg-gray-700/50 rounded-md">
          <div>
            <div class="text-sm text-gray-400 py-1">Email Address</div>
            <div class="text-gray-100">{{ email }}</div>
          </div>
        </div>

        <!-- Account Actions -->
        <div class="space-y-3">

          <!-- Logout Button -->
          <button
            @click="logout"
            class="w-full flex items-center justify-center space-x-2 px-4 py-2 
                   bg-red-900/50 hover:bg-red-800/50
                   text-red-100 rounded-md transition-colors
                   border border-red-900/50"
          >
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</body>
</template>



