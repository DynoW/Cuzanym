<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()
</script>

<template>
    <NuxtLayout>
        <p>Ntza {{ user?.email }}</p>
    </NuxtLayout>
</template>