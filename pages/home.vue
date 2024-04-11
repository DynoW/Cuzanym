<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
    <div>
        <p>Ntza {{ user?.email }}</p>
    </div>
</template>