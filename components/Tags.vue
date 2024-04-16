<script setup lang="ts">
const { data } = await useFetch("/api/get/tags", {
    headers: useRequestHeaders(['cookie'])
});

const tags = data.value;
</script>

<template>
    <aside class="flex flex-col gap-3">
        <h2 class="side-menu-title">Tags</h2>
        <!-- <nav>
            <h2 class="side-menu-title">Tags</h2>
            <ul class="flex flex-col gap-3">
                <li class="side-menu-item">
                    <Icon name="🚀" class="mr-2 grow-0" />
                    <button class="grow text-left">Categories</button>
                    <Icon name="iconamoon:number-1-circle-fill" class="grow-0" />
                </li>
                <li class="side-menu-item">
                    <Icon name="🚀" class="mr-2 grow-0" />
                    <button class="grow text-left">Categories</button>
                    <Icon name="iconamoon:number-1-circle-fill" class="grow-0" />
                </li>
                <li class="side-menu-item">
                    <Icon name="🚀" class="mr-2 grow-0" />
                    <button class="grow text-left">Categories</button>
                    <Icon name="iconamoon:number-1-circle-fill" class="grow-0" />
                </li>
                <li class="side-menu-item">
                    <Icon name="🚀" class="mr-2 grow-0" />
                    <button class="grow text-left">Categories</button>
                    <Icon name="iconamoon:number-1-circle-fill" class="grow-0" />
                </li>
            </ul>
        </nav> -->
        <div v-for="tag in tags">
            <NuxtLink :to="'/tag/'+tag.name" class="p-2 m-1 bg-red-200 border-2 rounded-xl border-red-300 text-red-400 font-bold">{{ tag.name }}</NuxtLink>
        </div>
    </aside>
</template>