<script setup lang="ts">
const { data: tags } = await useFetch("/api/get/tags", {
    headers: useRequestHeaders(['cookie'])
});
</script>

<template>
    <aside class="flex flex-col gap-3 break-all">
        <div class="flex flex-row justify-between align-top side-menu-title px-4">
            <h2 class="">Tags</h2>
            <button v-if="useTag().value != undefined" class="font-thin" @click="useTag().value = undefined">{{ 'selected: ' + useTag().value
                }}</button>
        </div>
        <div class="">
            <button v-for="tag in tags" :key="tag.name" @click="useTag().value = tag.name"
                class="inline-block p-2 m-1 border-2 rounded-xl font-bold">
                {{ tag.name }}</button>
        </div>
    </aside>
</template>