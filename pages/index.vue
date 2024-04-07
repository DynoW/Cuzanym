<script setup lang="ts">
  const user = useSupabaseUser()
  const { auth } = useSupabaseClient()

  const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

  watchEffect(() => {
    if (user.value) {
      navigateTo('/dashboard')
    }
  })
</script>

<template>
    <div>
      <button @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })">
        Sign in with Google
      </button>
    </div>
</template>