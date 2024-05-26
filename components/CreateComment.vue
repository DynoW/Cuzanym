<script setup lang="ts">
const post = useAttrs().post as any;
const comment_id = useAttrs().comment_id as any;
const content = ref('');
let createMenu = ref(false);

const createPost = async () => {
    if (!content.value.trim()) {
        alert('Conținutul este necesar!');
        return;
    } else {
        const { data, status } = await useFetch('/api/post/comment', {
            method: 'post',
            headers: useRequestHeaders(['cookie']),
            body: {
                post_id: post.id,
                content: content.value,
                comment_id
            }
        })
        if (status.value === "success") {
            post.comments.push(
                data.value
            );
            if(data.value?.reply_to_id) {
                const comment = post.comments.find((comment: any) => comment.id === data.value?.reply_to_id);
                comment.replies.push(data.value);
            }
            content.value = '';
        } else {
            alert('A apărut o eroare!');
        }
    }
}
</script>

<template>
    <div v-if="createMenu" class="flex flex-col gap-2">
        <input v-model="content" placeholder="Conținut" maxlength="250"
            class="border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0"></input>
        <div class="flex flex-row justify-between gap-2">
            <button @click="createPost"
                class="basis-full p-2 rounded-lg bg-blue-600 text-white dark:bg-blue-900">Comentează</button>
            <button @click="createMenu = false"
                class="basis-10 p-2 rounded-lg bg-neutral-300 dark:bg-neutral-600">X</button>
        </div>
    </div>
    <div v-else class="text-end">
        <button @click="createMenu = true"
            class="p-2 rounded-lg bg-blue-600 text-white dark:bg-blue-900">Comentează</button>
    </div>
</template>