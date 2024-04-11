<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
  if (user.value == null) {
    return navigateTo('/login')
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