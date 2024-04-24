<script setup lang="ts">
const tag = decodeURIComponent(useRoute().params.tag.toString());
const { data } = await useFetch("/api/get/tags", {
    headers: useRequestHeaders(['cookie'])
});
const tags = data.value;

if (!tags?.some((t) => t.name.toLowerCase() === tag.toLowerCase())) {
    throw createError({ status: 404, message: "Tag not found!" });
}
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main main-flex">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-6">
                <PostsByTag />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Announcement>
                    <span class="not-italic">Tag: </span>{{ tag }}
                </Announcement>
                <br />
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>