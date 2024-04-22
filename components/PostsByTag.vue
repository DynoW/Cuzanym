<script setup lang="ts">
const tag = useRoute().params.tag.toString();

const { pending, data: posts } = useLazyFetch("/api/get/posts/tag/" + tag, {
    headers: useRequestHeaders(['cookie'])
});
</script>

<template>
    <div v-if="pending" class="loading-screen">
        <p>Loading...</p>
    </div>
    <Posts v-else :posts="posts" />
</template>