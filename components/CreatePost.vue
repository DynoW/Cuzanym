<script setup lang="ts">
import { ref } from 'vue';
const topic = useAttrs().topic;
const title = ref('');
const content = ref('');
const tags = ref('');
let createMenu = ref(false);

const createPost = async () => {
    if (!title.value.trim()) {
        alert('Titlul este necesar!');
        return;
    } else {
        const { status } = await useFetch('/api/post/post', {
            method: 'post',
            headers: useRequestHeaders(['cookie']),
            body: {
                title: title.value,
                content: content.value,
                tags: tags.value.match(/[a-zA-Z]/) ? tags.value.replace(/#/g, ',').replace(/\s+/g, ' ').split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [],
                topic
            }
        })
        if (status.value === "success") {
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
                <h1 class="text-2xl font-bold">Creează o postare</h1>
                <Icon name="material-symbols:close" @click="createMenu = !createMenu" class="cursor-pointer" />
            </div>
            <div class="flex flex-col gap-3 dark:text-neutral-100">
                <input v-model="title" type="text" placeholder="Titlu" maxlength="100"
                    class="border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0" />
                <textarea v-model="content" placeholder="Conținut (opțional)" maxlength="750"
                    class="h-32 border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0"></textarea>
                <input v-model="tags" type="text" placeholder="Tag-uri separate de , (opțional)" maxlength="70"
                    class="border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0" />
                <button @click="createPost"
                    class="p-2 rounded-lg bg-sky-600 text-white dark:bg-blue-900">Postează</button>
            </div>
        </div>
        <div v-else class="flex flex-col p-5 gap-4">
            <button @click=" createMenu = !createMenu"
                class="p-2 rounded-lg bg-sky-600 text-white dark:bg-blue-900">Creează o postare</button>
        </div>
    </div>
</template>
