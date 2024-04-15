<script setup lang="ts">
const { data } = await useFetch("/api/get/topics", {
    headers: useRequestHeaders(['cookie'])
});

const topics = data.value;
</script>

<template>
    <div class="bg-white rounded-lg flex flex-col">
        <div class="flex flex-row bg-neutral-100 rounded-lg font-bold text-neutral-500">
            <div class="basis-8/12 p-5 text-start">
                Topic
            </div>
            <div class="basis-2/12 p-5 text-center">
                Posts
            </div>
            <div class="basis-2/12 p-5 text-center">
                Last Activity
            </div>
        </div>

        <div v-for="topic in topics" :key="topic.id" class="flex flex-row">
            <NuxtLink :to="'/forum/'+topic.name.toLowerCase()" class="flex flex-row gap-6 basis-8/12 p-5">
                <Icon name="icon-park-solid:topic" class="text-neutral-500" />
                <h3 class="font-bold text-neutral-700">{{ topic.name }}</h3>
            </NuxtLink>
            <div class="flex justify-center basis-2/12 p-5">
                {{ 3 }}
            </div>
            <div class="flex justify-center basis-2/12 p-5">
                {{ "acum 3 zile" }}
            </div>
        </div>
    </div>
</template>