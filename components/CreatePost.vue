<script setup lang="ts">
import { ref } from 'vue';
const user = useSupabaseUser();
const title = ref('');
const content = ref('');
const tags = ref('');
let createMenu = ref(false);

const createPost = async () => {
    const data = await useFetch('/api/post/post', {
        method: 'post',
        body: {
            title: title.value,
            content: content.value,
            tags: tags.value.split(' '),
            user: user
        }
    })
    window.location.reload();
}

</script>

<template>
    <div class="bg-white rounded-xl">
        <div v-if="createMenu" class="flex flex-col p-5 gap-4">
            <div class="flex flex-row justify-between px-1">
                <h1 class="text-2xl font-bold">Create a post</h1>
                <Icon name="material-symbols:close" @click="createMenu=!createMenu" class="cursor-pointer" />
            </div>
            <div class="flex flex-col gap-3">
                <input v-model="title" type="text" placeholder="Title"
                    class="border-2 border-neutral-300 p-2 rounded-lg" />
                <textarea v-model="content" placeholder="Content"
                    class="h-32 border-2 border-neutral-300 p-2 rounded-lg"></textarea>
                <input v-model="tags" type="text" placeholder="Tags"
                    class="border-2 border-neutral-300 p-2 rounded-lg" />
                <button @click="createPost" class="bg-sky-600 text-white p-2 rounded-lg">Post</button>
            </div>
        </div>
        <div v-else class="flex flex-col p-5 gap-4">
            <button @click=" createMenu=!createMenu" class="bg-sky-600 text-white p-2 rounded-lg">Create a
                post</button>
        </div>
    </div>
</template>
