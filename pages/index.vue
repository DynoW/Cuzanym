<script setup lang="ts">
const user = useSupabaseUser()
console.log(user.value)
</script>

<template>
  <div>
    Hola {{ user?.email }}
  </div>
</template>