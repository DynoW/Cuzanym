<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

let wrongDomain = ref(false)

watchEffect(() => {
  if (user.value) {
    if (user.value.email?.endsWith('@laicuza.ro'))
      navigateTo('/forum')
    else {
      auth.signOut()
      wrongDomain.value = true
    }
  }
})

async function handleSignInWithGoogle(response: any) {
  const { data, error } = await auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
    nonce: '',
  })
  console.log(data, error)
}
</script>

<template>
  <div class="h-screen w-full flex relative justify-center items-center">
    <NuxtImg src="/img/login/banci.jpg" alt="login-bg" class="-z-10 w-full lg:w-3/5 h-full object-cover" />
    <div
      class="bg-neutral-100 p-5 lg:p-0 rounded-lg lg:rounded-none lg:h-full flex flex-col items-center justify-center absolute lg:static max-w-sm lg:max-w-full gap-5">
      <Logo class="text-7xl" />
      <div>
        <component :is="'script'" src="https://accounts.google.com/gsi/client" async></component>
        <div id="g_id_onload" data-client_id="642198305698-1t92r9k3u12lf3jl5naoeovudj6s5gn0.apps.googleusercontent.com"
          data-context="signin" data-ux_mode="redirect" login-url data-callback="handleSignInWithGoogle()" data-auto_prompt="false">
        </div>

        <div class="g_id_signin" data-type="standard" data-shape="pill" data-theme="outline" data-text="signin_with"
          data-size="large" data-logo_alignment="left">
        </div>
      </div>
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
