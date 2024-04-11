<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
    if (user.value) {
        navigateTo('/')
    }
})
</script>

<template>
    <div class="h-screen w-screen flex justify-center items-center">
        <div class="">
            <div class="flex flex-col items-center bg-white rounded-lg p-5 gap-5">
                <div>
                    <img src="/assets/img/logo-login.png" alt="logo" class="scale-75" />
                </div>
                <div class="p-3 rounded-full border shadow-md">
                    <button class="flex flex-row items-center justify-items-center gap-2"
                        @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })">
                        <img src="https://api.iconify.design/logos:google-icon.svg?color=%23655353" alt="google"
                            class="w-5 h-5 mt-1" />
                        <p>Sign in with Google</p>
                    </button>
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
    </div>
</template>

<style>
body {
    background-image: url('/assets/img/copaci.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
}
</style>