<script setup lang="ts">
import { ref } from 'vue';
const topic = useAttrs().topic;
const title = ref('');
const content = ref('');
const tags = ref('');
let createMenu = ref(false);

const createPost = async () => {
    if (!title.value) {
        alert('Titlul este necesar!');
        return;
    } else {
        const { status, data , error } = await useFetch('/api/post/post', {
            method: 'post',
            headers: useRequestHeaders(['cookie']),
            body: {
                title: title.value,
                content: content.value,
                tags: tags.value.match(/[a-zA-Z]/) ? tags.value.split(',').map(tag => tag.trim()) : [],
                topic
            }
        })
        if (data.value == "bad word") {
            alert('Nu ai voie sa folosești cuvinte vulgare!');
        } else if (status.value === "success") {
            window.location.reload();
        } else {
            alert('A apărut o eroare!');
        }
    }
}

</script>

<template>
    <div class="rounded-xl bg-white dark:bg-slate-800">
        <div v-if="createMenu" class="flex flex-col p-5 gap-4">
            <div class="flex flex-row justify-between px-1">
                <h1 class="text-2xl font-bold">Create a post</h1>
                <Icon name="material-symbols:close" @click="createMenu = !createMenu" class="cursor-pointer" />
            </div>
            <div class="flex flex-col gap-3 dark:text-neutral-100">
                <input v-model="title" type="text" placeholder="Titlu"
                    class="border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0" />
                <textarea v-model="content" placeholder="Conținut"
                    class="h-32 border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0"></textarea>
                <input v-model="tags" type="text" placeholder="Tag-uri separate de ,"
                    class="border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0" />
                <button @click="createPost" class="p-2 rounded-lg bg-sky-600 text-white dark:bg-blue-900">Post</button>
            </div>
        </div>
        <div v-else class="flex flex-col p-5 gap-4">
            <button @click=" createMenu = !createMenu"
                class="p-2 rounded-lg bg-sky-600 text-white dark:bg-blue-900">Create a
                post</button>
        </div>
    </div>
</template>
