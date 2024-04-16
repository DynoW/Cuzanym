<script setup lang="ts">
import { capitalize } from 'vue';
const tag = useRoute().params.tag.toString();

const { data } = await useFetch("/api/get/posts/tag/" + capitalize(tag), {
    headers: useRequestHeaders(['cookie'])
});
const posts = data.value;

</script>

<template>
    <Posts :posts="posts" />
</template>