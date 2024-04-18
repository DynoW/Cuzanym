<script setup lang="ts">
const title = ref('');
const content = ref('');
const tags = ref('');

const createPost = async () => {
    const data = await useFetch('/api/post/post', {
        method: 'post',
        body: {
            title: title.value,
            content: content.value,
            tags: tags.value.split(' ')
        }
    })
    window.location.reload();
}

</script>

<template>
    <div class="bg-white rounded-xl">
        <div class="flex flex-col p-5 gap-4">
            <h1 class="text-2xl font-bold">Create a post</h1>
            <div class="flex flex-col gap-3">
                <input v-model="title" type="text" placeholder="Title" class="border-2 border-neutral-300 p-2 rounded-lg" />
                <textarea v-model="content" placeholder="Content" class="h-32 border-2 border-neutral-300 p-2 rounded-lg"></textarea>
                <input v-model="tags" type="text" placeholder="Tags" class="border-2 border-neutral-300 p-2 rounded-lg" />
                <button @click="createPost" class="bg-sky-600 text-white p-2 rounded-lg">Post</button>
            </div>
        </div>
    </div>
</template>
