<script setup lang="ts">
const user = useSupabaseUser()
if (!user.value) {
    navigateTo('/')
}
</script>

<template>
    <div>
        ntza {{user?.email}}
    </div>
</template>