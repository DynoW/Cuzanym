<script setup lang="ts">
import { capitalize } from "vue";
const topic = useRoute().params.topic as string;

const { data } = await useFetch("/api/get/topics", {
    headers: useRequestHeaders(['cookie'])
});
const topics = data.value;

if (!topics?.some((t) => t.name.toLowerCase() === topic)){
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
                <CreatePost :topic="capitalize(topic)" />
                <LoadPosts />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Announcement>
                    <span class="not-italic">Topic: </span>{{ capitalize(topic) }}
                </Announcement>
                <br />
                <Announcement>
                    <p v-if="topic =='raportări'" class="text-base not-italic text-amber-200">Această secțiune este
                        pentru a trimite mesaje directorului</p>
                    <NuxtLink to="/forum/tutorial" v-else class="text-lg not-italic text-sky-600">(Postările
                        trebuie moderate de către moderatori → vezi Tutorial)</NuxtLink>
                </Announcement>
                <br />
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>