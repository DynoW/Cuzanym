<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()

watchEffect(() => {
    if (!user.value) {
        navigateTo('/')
    }
})
</script>

<template>
    <NuxtLayout>
        <p>Ntza {{ user?.email }}</p>
    </NuxtLayout>
</template>