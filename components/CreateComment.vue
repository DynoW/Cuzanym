<script setup lang="ts">
    const user = useSupabaseUser();
    const post = useAttrs().post as any; 
    const content = ref('');
    const createPost = async () => {
        if (!content.value.trim()) {
            alert('Conținutul este necesar!');
            return;
        } else {
            const { status } = await useFetch('/api/post/comment', {
                method: 'post',
                headers: useRequestHeaders(['cookie']),
                body: {
                    post_id: post.id,
                    content: content.value,
                }
            })
            if (status.value === "success") {
                post.comments.push({
                    content: content.value,
                    created_at: new Date().toISOString(),
                    user: {
                        id: user.value?.id,
                    }
                });
                content.value = '';
            } else {
                alert('A apărut o eroare!');
            }
        }
    }
</script>

<template>
    <div class="flex flex-col gap-2">
        <textarea v-model="content" placeholder="Conținut" maxlength="500"
            class="max-h-32 border-2 p-2 rounded-lg border-neutral-300 dark:bg-slate-500 dark:border-0"></textarea>
        <button @click="createPost" class="p-2 rounded-lg bg-sky-600 text-white dark:bg-blue-900">Comentează</button>
    </div>
</template>