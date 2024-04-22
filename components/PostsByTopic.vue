<script setup lang="ts">
const topic = useRoute().params.topic as string;

const { pending, data: posts } = useLazyFetch("/api/get/posts/topic", {
    method: 'post',
    headers: useRequestHeaders(['cookie']),
    body: {
        topic
    }
});
console.log(posts);
</script>

<template>
    <div v-if="pending" class="loading-screen">
        <p>Loading...</p>
    </div>
    <Posts v-else :posts="posts" />
</template>