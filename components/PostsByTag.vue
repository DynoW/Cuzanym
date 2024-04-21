<script setup lang="ts">
import { capitalize } from 'vue';
const tag = useRoute().params.tag.toString();

const { pending, data: posts } = useLazyFetch("/api/get/posts/tag/" + capitalize(tag), {
    headers: useRequestHeaders(['cookie'])
});
</script>

<template>
    <div v-if="pending" class="loading-screen">
        <p>Loading...</p>
    </div>
    <Posts v-else :posts="posts" />
</template>