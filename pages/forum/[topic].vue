<script setup lang="ts">
const topic = useRoute().params.topic as string;

const { data } = await useFetch("/api/get/topics", {
    headers: useRequestHeaders(['cookie'])
});
const topics = data.value;

if (!topics?.some((t) => t.name.toLowerCase() === topic.toLowerCase())){
    throw createError({ status: 404, message: "Topic not found!" });
}
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main main-flex">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-6">
                <CreatePost :topic="topic" />
                <PostsByTopic />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Announcement>
                    <span class="not-italic">Topic: </span>{{ topic }}
                </Announcement>
                <br />
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>