<script setup lang="ts">
const user = useSupabaseUser()
watch(user, () => {
  if (user.value == null) {
    return navigateTo('/login')
  }
}, { immediate: true })
</script>

<template>
  <div>
    Hola {{ user?.email }}
  </div>
</template>