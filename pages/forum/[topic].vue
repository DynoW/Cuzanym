<script setup lang="ts">
import { capitalize } from 'vue';
const topic = useRoute().params.topic.toString();

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
        <main class="container flex flex-col-reverse md:flex-row gap-10 mx-auto pb-80 sm:pb-56 md:pb-44 xl:pb-36 pt-12">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-12">
                <!-- <Announcement>
                    <span class="not-italic">Topic: </span>{{ capitalize(topic) }}
                </Announcement> -->
                <Posts />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Announcement>
                    <span class="not-italic">Topic: </span>{{ capitalize(topic) }}
                </Announcement>
                <br />
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>