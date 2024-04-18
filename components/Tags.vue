<script setup lang="ts">
const { data } = await useFetch("/api/get/tags", {
    headers: useRequestHeaders(['cookie'])
});

const tags = data.value;
</script>

<template>
    <aside class="flex flex-col gap-3">
        <h2 class="side-menu-title">Tags</h2>
        <div class="">
            <NuxtLink v-for="tag in tags" :to="'/tag/'+tag.name" class="inline-block p-2 m-1 border-2 rounded-xl font-bold">{{
                tag.name }}</NuxtLink>
        </div>
    </aside>
</template>