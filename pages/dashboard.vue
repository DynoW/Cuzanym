<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
    <div>
        ntza {{user?.email}}
    </div>
</template>