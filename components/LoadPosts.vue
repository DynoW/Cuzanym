<script setup lang="ts">
const topic = useAttrs().topic;

const { pending, data: posts } = useLazyFetch("/api/get/posts/topic", {
    method: 'post',
    headers: useRequestHeaders(['cookie']),
    body: {
        topic
    }
});

useTags().value = undefined;
useTag().value = undefined;
</script>

<template>
    <div v-if="pending" class="loading-screen">
        <p>Loading...</p>
    </div>
    <Posts v-else :posts="posts" />
</template>