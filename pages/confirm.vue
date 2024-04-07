<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

<template>
  <div>
    <p>
      Redirecting...
    </p>
  </div>
</template>