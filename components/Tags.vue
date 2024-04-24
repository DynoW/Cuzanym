<script setup lang="ts">
const { data: tags } = await useFetch("/api/get/tags", {
    headers: useRequestHeaders(['cookie'])
});
</script>

<template>
    <aside class="flex flex-col gap-3">
        <div class="flex flex-row justify-between align-top side-menu-title px-4">
            <h2 class="">Tags</h2>
            <button class="font-thin" @click="useTag().value = undefined">clear tags</button>
        </div>
        <div class="">
            <!-- <NuxtLink v-for="tag in tags" :key="tag.name" :to="useRoute().path + '?tag=' + tag.name.toLowerCase()"
                class="inline-block p-2 m-1 border-2 rounded-xl font-bold">
                {{ tag.name }}</NuxtLink> -->
            <button v-for="tag in tags" :key="tag.name" @click="useTag().value = tag.name"
                class="inline-block p-2 m-1 border-2 rounded-xl font-bold">
                {{ tag.name }}</button>
        </div>
    </aside>
</template>