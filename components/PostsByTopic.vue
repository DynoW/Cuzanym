<script setup lang="ts">
import { capitalize } from 'vue';
const topic = useRoute().params.topic.toString();

const { data } = await useFetch("/api/get/posts/topic/" + capitalize(topic), {
    headers: useRequestHeaders(['cookie'])
});

const posts = data.value;
</script>

<template>
    <Posts :posts="posts" />
</template>