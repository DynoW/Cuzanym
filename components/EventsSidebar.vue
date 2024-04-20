<script setup lang="ts">
const getRandomItems = (arr: any[], n: number) => {
    let result = arr.sort(() => 0.5 - Math.random());
    return result.slice(0, n).sort((a, b) => a.title.localeCompare(b.title));;
};

</script>

<template>
    <aside class="flex flex-col gap-3">
        <h2 class="side-menu-title">Events</h2>
        <div class="flex flex-col gap-4">
            <ContentList path="/events" v-slot="{ list }">
                <div v-for="article in getRandomItems(list, 2)" :key="article._path">
                    <NuxtLink :to="article._path" class="text-lg font-semibold">
                        <NuxtImg :src="article.image" :alt="article.title" />
                    </NuxtLink>
                </div>
            </ContentList>
        </div>
    </aside>
</template>