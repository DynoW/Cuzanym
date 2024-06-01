<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const queryParams = useRoute().query

let wrongDomain = ref(false)

watchEffect(() => {
  if (user.value) {
    if (user.value.email && user.value.email.endsWith('@laicuza.ro')) {
      navigateTo('/forum')
    } else {
      wrongDomain.value = true
    }
  }
})

if (queryParams.wrong_domain == 'true') {
  auth.signOut()
  wrongDomain.value = true
}

if (queryParams.is_banned == 'true') {
  wrongDomain.value = true
}

const handleLogin = async () => {
  try {
    const { error } = await auth.signInWithOAuth({ provider: 'google', options: {
      redirectTo: window.location.origin,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
    }})
    if (error) throw error
  } catch (error) {
    alert((error as any).error_description || (error as any).message)
  }
}
</script>

<template>
  <div class="h-screen w-full flex relative justify-center items-center">
    <NuxtImg preload src="/img/login/banci.jpg" alt="login-bg" class="-z-10 w-full lg:w-3/5 h-full object-cover" />
    <div
      class="bg-neutral-100 p-5 lg:p-0 rounded-lg lg:rounded-none lg:h-full flex flex-col items-center justify-center absolute lg:static max-w-sm lg:max-w-full gap-5">
      <Logo class="text-7xl" />
      <button
        class="p-3 rounded-full border shadow-md cursor-pointer flex flex-row items-center justify-items-center gap-2"
        @click="handleLogin()">
        <Icon name="logos:google-icon" class="w-5 h-5 mt-1" />
        <p>Sign in with Google</p>
      </button>
      <div v-if="wrongDomain" class="flex justify-center">
        <p class="text-md text-red-500 text-center w-4/5">
          Ne pare rău, dar nu ai acces la acest website. Te rugăm să folosești un cont de email de la Liceul Teoretic
          "Alexandru Ioan Cuza".
        </p>
      </div>
      <div v-if="!wrongDomain" class="flex justify-center">
        <p class="text-md text-gray-500 text-center w-4/5">
          Ne rezervăm dreptul de a permite accesul pe acest website
          doar elevilor din Liceul Teoretic "Alexandru Ioan Cuza".
        </p>
      </div>
      <div>
        <p class="text-md text-gray-500 text-center">By students for students, with complete anonymity.</p>
        <p class="text-sm text-slate-600 text-center">
          <NuxtLink to="/policy">Privacy Policy</NuxtLink>
          &nbsp;&nbsp;
          <NuxtLink to="/terms">Terms & conditions</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>