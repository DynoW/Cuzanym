<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { data: user_roles } = await supabase
    .from('user')
    .select('id, is_admin, is_director, is_moderator')
    .eq('id', user.value?.id as string)
    .single()

if (!user_roles || (user_roles?.is_moderator == false && user_roles?.is_admin == false)) {
    navigateTo('/forum');
}

const { pending, data: posts } = useLazyFetch("/api/get/posts", {
    method: 'get',
    headers: useRequestHeaders(['cookie']),
})

async function deleteComment(comment_id: any, comments: any) {
    const { status } = await useFetch('/api/post/comment/delete', {
        method: 'post',
        headers: useRequestHeaders(['cookie']),
        body: {
            comment_id
        }
    })
    if (status.value === "success") {
        const index = comments.findIndex((c: any) => c.id === comment_id);
        if (index !== -1) {
            comments.splice(index, 1);
        }
    } else {
        alert('A apărut o eroare!');
    }
}

async function updateComment(comment: any, is_hidden: boolean) {
    const { status } = await useFetch('/api/post/comment/update', {
        method: 'post',
        headers: useRequestHeaders(['cookie']),
        body: {
            comment_id: comment.id,
            is_hidden
        }
    })
    if (status.value === "success") {
        comment.is_hidden = !comment.is_hidden;
    } else {
        alert('A apărut o eroare!');
    }
}

function formatDate(time: any) {
    const currentTime = new Date();
    const lastTime = new Date(time);
    const timeDiff = currentTime.getTime() - lastTime.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (minutes <= 0) {
        return `acum câteva secunde`;
    } else if (minutes < 60) {
        return `acum ${minutes == 1 ? 'un' : minutes} minut${minutes == 1 ? '' : 'e'}`;
    } else if (hours < 24) {
        return `acum ${hours == 1 ? 'o' : hours} or${hours == 1 ? 'ă' : 'e'}`;
    } else {
        return `acum ${days == 1 ? 'o' : days} zi${days == 1 ? '' : 'le'}`;
    }
}
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main main-color main-flex">
            <div class="basis-3/5 flex flex-col gap-6">
                <div v-if="pending" class="loading-screen">
                    <p>Loading...</p>
                </div>
                <Posts v-else :posts="posts" />
            </div>
            <div class="basis-2/5">
                <div v-if="!pending">
                    <div v-for="post in posts" :key="post.id+'-comments'">
                        <div v-for="comment in post.comments" :key="comment.id"
                            class="flex flex-col mb-2 p-5 border-l-2 border-neutral-300 bg-white dark:bg-slate-800 dark:border-neutral-600">
                            <div class="flex flex-row">
                                <Icon name="material-symbols:account-circle" class="size-14 text-gray-500 basis-14" />
                                <div class="flex flex-col ml-3">
                                    <h4 class="text-neutral-700 text-xl font-bold dark:text-gray-400">
                                        <span v-if="comment.author?.username">{{ comment.author.username }}</span>
                                        <span v-else>Utilizator anonim</span>
                                    </h4>
                                    <p class="text-gray-500">{{ formatDate(comment.created_at) }}</p>
                                </div>
                                <div class="grow flex flex-col">
                                    <div v-if="user_roles && user_roles.is_moderator == true"
                                        class="flex flex-row justify-end">
                                        <button v-if="comment.is_hidden" @click="updateComment(comment, false)">
                                            <Icon name="bx:hide" class="mr-2 text-gray-400 md:hover:text-gray-300" />
                                        </button>
                                        <button v-if="!comment.is_hidden" @click="updateComment(comment, true)">
                                            <Icon name="bx:show" class="mr-2 text-blue-700 md:hover:text-blue-500" />
                                        </button>
                                        <button v-if="user_roles.is_admin" @click="deleteComment(comment.id, post.comments)">
                                            <Icon name="material-symbols:delete"
                                                class="mr-2 text-red-500 md:hover:text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-1">
                                <p class="break-normal">
                                    {{ comment.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </NuxtLayout>
</template>