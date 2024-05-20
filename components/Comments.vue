<script setup lang="ts">
const comments = useAttrs().comments as any;
const user = useSupabaseUser();
const user_roles = useAttrs().user_roles as any;

const filtered_comments = computed(() => {
    if (user_roles && user_roles.is_admin == false) {
        return comments.filter((comment: any) => {
            if (comment.author_id == user.value?.id && comment.is_hidden == true) {
                comment.pending = true;
            }
            return comment.is_hidden == false || comment.author_id == user.value?.id;
        });
    } else if (!user_roles) {
        return [];
    } else {
        return comments;
    }
});

async function deleteComment(comment: any) {
    const { status } = await useFetch('/api/post/comment/delete', {
        method: 'post',
        headers: useRequestHeaders(['cookie']),
        body: {
            comment_id: comment.id
        }
    })
    if (status.value === "success") {
        const index = filtered_comments.value.findIndex((c: any) => c.id === comment.id);
        if (index !== -1) {
            filtered_comments.value.splice(index, 1);
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
    <div v-for="comment in filtered_comments" :key="comment.id"
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
                <div v-if="user_roles && user_roles.is_admin == true" class="flex flex-row justify-end">
                    <button v-if="comment.is_hidden" @click="updateComment(comment, false)">
                        <Icon name="bx:hide" class="mr-2 text-gray-400 hover:text-gray-300" />
                    </button>
                    <button v-if="!comment.is_hidden" @click="updateComment(comment, true)">
                        <Icon name="bx:show" class="mr-2 text-blue-700 hover:text-blue-500" />
                    </button>
                    <button @click="deleteComment(comment)">
                        <Icon name="material-symbols:delete" class="mr-2 text-red-500 hover:text-red-400" />
                    </button>
                </div>
                <div v-if="comment.pending" class="text-end text-orange-200">
                    pending
                </div>
            </div>
        </div>
        <div class="pt-1">
            <p class="">
                {{ comment.content }}
            </p>
        </div>
    </div>
</template>