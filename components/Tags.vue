<script setup lang="ts">

</script>

<template>
    <aside class="flex flex-col gap-3 break-all text-neutral-100">
        <div class="flex flex-row justify-between align-top side-menu-title px-4">
            <h2 class="">Tags</h2>
            <button v-if="useTag().value != undefined" class="font-thin" @click="useTag().value = undefined">{{
                'selected: ' + useTag().value
                }}</button>
        </div>
        <div class="">
            <button v-for="tag in useTags().value" :key="tag" @click="useTag().value = tag"
                class="inline-block p-2 m-1 border-2 rounded-xl font-bold">
                {{ tag }}</button>
        </div>
    </aside>
</template>