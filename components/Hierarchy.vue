<script setup lang="ts">
import { capitalize } from 'vue';

const path = useRoute().path
const parts = path.split('/').filter(Boolean)
const links = parts.map((part, index) => ({
    name: capitalize(decodeURIComponent(part)),
    path: part === 'tag' ? '/forum' : '/' + parts.slice(0, index + 1).join('/')
}))
</script>

<template>
    <div
        class="flex justify-center w-full bg-neutral-100 text-neutral-400 dark:bg-slate-950 dark:dark:text-neutral-100">
        <ul class="container flex flex-row p-2 gap-3">
            <li v-for="link in links" :key="link.name">
                <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
                <Icon v-if="link !== links[links.length - 1]" name="material-symbols:arrow-forward-ios-rounded"
                    class="w-3 ml-3" />
            </li>
        </ul>
    </div>
</template>