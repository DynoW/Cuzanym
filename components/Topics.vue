<script setup lang="ts">
let { data: topics } = await useFetch("/api/get/topics", {
    headers: useRequestHeaders(['cookie'])
});

if (topics.value) {
    topics.value = topics.value.filter((topic: any) => topic.id !== 'a622945f-1f3c-487a-aca7-9fb1fbc2872f');
}

function formatDate(time: any) {
    if (!time) return '-';
    const currentTime = new Date();
    const lastTime = new Date(time);
    const timeDiff = currentTime.getTime() - lastTime.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
        return `acum ${minutes == 1 ? 'un' : minutes} minut${minutes == 1 ? '' : 'e'}`;
    } else if (hours < 24) {
        return `acum ${hours == 1 ? 'o' : hours} or${hours == 1 ? 'ă' : 'e'}`;
    } else {
        return `acum ${days == 1 ? 'o' : days} zi${days == 1 ? '' : 'le'}`;
    }
}
</script>

<template>
    <div class="bg-white rounded-lg flex flex-col dark:bg-slate-800">
        <div
            class="flex flex-row rounded-t-lg font-bold items-center bg-neutral-100 text-neutral-500 dark:bg-slate-950 dark:text-neutral-100">
            <div class="basis-8/12 p-5 text-start">
                Topic
            </div>
            <div class="basis-1/12 p-5 text-center">
                Postări
            </div>
            <div class="basis-3/12 p-5 text-center">
                Ultima activitate
            </div>
        </div>

        <div v-for="topic in topics" :key="topic.id" class="flex flex-row">
            <NuxtLink :to="'/forum/' + topic.name.toLowerCase()" class="flex flex-row gap-6 basis-8/12 p-5">
                <Icon name="icon-park-solid:topic" class="text-neutral-500" />
                <h3 class="font-bold">{{ topic.name }}</h3>
            </NuxtLink>
            <div class="flex justify-center basis-1/12 p-5">
                {{ topic.count }}
            </div>
            <div class="flex justify-center basis-3/12 p-5">
                {{ formatDate(topic.last) }}
            </div>
        </div>
    </div>
</template>