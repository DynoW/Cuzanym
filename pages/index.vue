<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

watchEffect(() => {
  if (user.value) {
    navigateTo('/forum')
  }
})

const handleLogin = async () => {
  try {
    const { error } = await auth.signInWithOAuth({ provider: 'google' })
    if (error) throw error
  } catch (error) {
    alert((error as any).error_description || (error as any).message)
  }
}
</script>

<template>
  <div class="h-screen w-full flex relative justify-center items-center">
    <NuxtImg src="/img/banci.jpg" alt="login-bg" class="-z-10 w-full lg:w-3/5 h-full object-cover" />
    <div
      class="bg-neutral-100 p-5 lg:p-0 rounded-lg lg:rounded-none lg:h-full flex flex-col items-center justify-center absolute lg:static max-w-sm lg:max-w-full gap-5">
      <Logo class="text-7xl" />
      <button
        class="p-3 rounded-full border shadow-md cursor-pointer flex flex-row items-center justify-items-center gap-2"
        @click="handleLogin()">
        <Icon name="logos:google-icon" class="w-5 h-5 mt-1" />
        <p>Sign in with Google</p>
      </button>
      <div class="flex justify-center">
        <p class="text-md text-gray-500 text-center w-4/5">Ne rezervam dreptul de a permite accesul pe acest website
          doar
          elevilor din Liceul Teoretic Alexandru Ioan
          Cuza.</p>
      </div>
      <div>
        <p class="text-md text-gray-500 text-center">By students for students, with complete anonymity.</p>
        <p class="text-sm text-slate-600 text-center">
          <a href="#">Privacy Policy</a>
          &nbsp;&nbsp;
          <a href="#">Terms & conditions</a>
        </p>
      </div>
    </div>
  </div>

  <!--<div class="h-screen w-full flex flex-row overflow-hidden">
    <div class="basis-3/5">
      <img src="/assets/img/banci.jpg" alt="login-bg" />
    </div>
    <div class="bg-neutral-100 h-full basis-2/5 flex flex-col items-center justify-center gap-10">
      <div>
        <img src="/assets/img/logo-login.png" alt="logo" class="" />
      </div>
      <div class="p-3 rounded-full border shadow-md">
        <button class="flex flex-row items-center justify-items-center gap-2" @click="handleLogin()">
          <img src="https://api.iconify.design/logos:google-icon.svg?color=%23655353" alt="google"
            class="w-5 h-5 mt-1" />
          <p>Sign in with Google</p>
        </button>
      </div>
      <div class="flex justify-center">
        <p class="text-md text-gray-500 text-center w-4/5">Ne rezervam dreptul de a permite accesul pe acest website
          doar
          elevilor din Liceul Teoretic Alexandru Ioan
          Cuza.</p>
      </div>
      <div>
        <p class="text-md text-gray-500 text-center">By students for students, with complete anonymity.</p>
        <p class="text-sm text-slate-600 text-center">
          <a href="#">Privacy Policy</a>
          &nbsp;&nbsp;
          <a href="#">Terms & conditions</a>
        </p>
      </div>
    </div>
  </div>-->
  <!--<div class="h-screen w-full flex justify-center items-center login-bg">
    <div class="max-w-sm md:max-w-lg">
      <div class="flex flex-col items-center bg-white rounded-lg p-5 gap-5">
        <div>
          <img src="/assets/img/logo-login.png" alt="logo" class="scale-75" />
        </div>
        <div class="p-3 rounded-full border shadow-md">
          <button class="flex flex-row items-center justify-items-center gap-2" @click="handleLogin()">
            <img src="https://api.iconify.design/logos:google-icon.svg?color=%23655353" alt="google"
              class="w-5 h-5 mt-1" />
            <p>Sign in with Google</p>
          </button>
        </div>
        <div class="max-w-sm">
          <p class="text-md text-gray-500 text-center">Ne rezervăm dreptul de a permite accesul pe acest website doar
            elevilor din Liceul Teoretic "Alexandru Ioan
            Cuza".</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 text-center">By students for students, with complete anonymity.</p>
          <p class="text-sm text-slate-600 text-center">
            <a href="#">Privacy Policy</a>
            &nbsp;&nbsp;
            <a href="#">Terms & conditions</a>
          </p>
        </div>
      </div>
    </div>
  </div>-->
</template>
