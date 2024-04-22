<script setup lang="ts">
import { capitalize } from 'vue';
const topic = useRoute().params.topic.toString();

const { pending, data: posts } = useFetch("/api/get/posts/topic/" + capitalize(decodeURIComponent(topic)), {
    headers: useRequestHeaders(['cookie'])
});
</script>

<template>
    <div v-if="pending" class="loading-screen">
        <p>Loading...</p>
    </div>
    <Posts v-else :posts="posts" />
</template>