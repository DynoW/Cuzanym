<script setup lang="ts">
    const searchString = useRoute().query.q;
    const { data } = await useFetch(`/api/get/search?q=${searchString}`, {
        headers: useRequestHeaders(['cookie'])
    });
    const posts = data.value as Post[];
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-6">
                <Announcement>
                    Search results for: <span class="not-italic">{{ searchString }}</span>
                </Announcement>
                <Posts :posts="posts" />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>