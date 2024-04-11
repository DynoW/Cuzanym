<script setup lang="ts">
const user = useSupabaseUser()
watch(user, () => {
    if (user.value) {
        return
    } else return navigateTo('/login')
}, { immediate: true })
</script>

<template>
    <div>
        ntza {{ user?.email }}
    </div>
</template>