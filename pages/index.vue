<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const user = useSupabaseUser()
console.log(user.value)
</script>

<template>
  <div>
    Hola {{ user?.email }}
  </div>
</template>