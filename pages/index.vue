<script setup lang="ts">
  const user = useSupabaseUser()

  console.log(user)
</script>

<template>
    <div>
        ntza {{user?.email}}
    </div>
</template>