<script setup lang="ts">
const tag = useRoute().params.tag as string;

const { pending, data: posts } = useLazyFetch("/api/get/posts/tag", {
    method: 'post',
    headers: useRequestHeaders(['cookie']),
    body: {
        tag
    }
});
</script>

<template>
    <div v-if="pending" class="loading-screen">
        <p>Loading...</p>
    </div>
    <Posts v-else :posts="posts" />
</template>