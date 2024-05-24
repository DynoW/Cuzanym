<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
let posts = useAttrs().posts as post[];

const { data: user_roles } = await supabase
    .from('user')
    .select('id, is_admin, is_director, is_moderator')
    .eq('id', user.value?.id as string)
    .single()

if (user_roles && (user_roles.is_admin == false && user_roles.is_moderator == false)) {
    posts = posts.filter((post: any) => {
        if (post.topic_id != "a622945f-1f3c-487a-aca7-9fb1fbc2872f") {
            if (post.author_id == user.value?.id && post.is_hidden == true) {
                post.pending = true;
            }
            return post.is_hidden == false || post.author_id == user.value?.id;
        } else {
            if (post.author_id == user.value?.id && post.is_hidden == true) {
                post.pending = true;
            }
            if (user_roles.is_director == true) {
                return post.is_hidden == false;
            } else {
                return post.author_id == user.value?.id;
            }
        }
    });
} else if (!user_roles) {
    posts = []
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

async function reactToPost(post: any, type: string) {
    const { reaction, action } = await $fetch('/api/post/reaction', {
        method: 'post',
        headers: useRequestHeaders(['cookie']),
        body: {
            post_id: post.id,
            type
        }
    })
    if (action == 'deleted') {
        post.reactions = post.reactions.filter((reaction: any) => reaction.user_id !== user.value?.id);
    } else if (action == 'created') {
        post.reactions.push(reaction as unknown as reaction);
    } else if (action == 'updated') {
        post.reactions = post.reactions.map((reaction: any) => {
            if (reaction.user_id === user.value?.id) {
                reaction.type = type as unknown as reaction_type;
            }
            return reaction;
        });
    }
    if (type === 'UP') {
        post.likedByUser = !post.likedByUser;
        post.dislikedByUser = false;
    } else {
        post.dislikedByUser = !post.dislikedByUser;
        post.likedByUser = false;
    }
}

useTags().value = [...new Set(posts.flatMap(post => post.tags.map(tag => tag.name)))];

const filtered_posts = computed(() => {
    if (useTag().value) {
        return posts.filter((post: any) => post.tags.some((t: any) => t.name == useTag().value));
    } else {
        return posts;
    }
});

filtered_posts.value.map((post: any) => {
    post.comm = false;
    post.likedByUser = post.reactions.some((reaction: any) => reaction.user_id === user.value?.id && reaction.type === 'UP');
    post.dislikedByUser = post.reactions.some((reaction: any) => reaction.user_id === user.value?.id && reaction.type === 'DOWN');
    return post;
});

async function deletePost(post: any) {
    const { status } = await useFetch('/api/post/post/delete', {
        method: 'post',
        headers: useRequestHeaders(['cookie']),
        body: {
            post_id: post.id
        }
    })
    if (status.value === "success") {
        const index = filtered_posts.value.findIndex((p: any) => p.id === post.id);
        if (index !== -1) {
            filtered_posts.value.splice(index, 1);
        }
    } else {
        alert('A apărut o eroare!');
    }
}

async function updatePost(post: any, is_hidden: boolean) {
    const { status } = await useFetch('/api/post/post/update', {
        method: 'post',
        headers: useRequestHeaders(['cookie']),
        body: {
            post_id: post.id,
            is_hidden
        }
    })
    if (status.value === "success") {
        post.is_hidden = !post.is_hidden;
    } else {
        alert('A apărut o eroare!');
    }
}
</script>

<template>
    <div class="flex flex-col gap-4 break-all">
        <div v-for="post in filtered_posts as any" :key="post.id"
            class="flex flex-col p-5 border-b-2 rounded-xl border-neutral-300 bg-white dark:bg-slate-800 dark:border-neutral-600">
            <div class="flex flex-row">
                <Icon name="material-symbols:account-circle" class="size-14 text-gray-500 basis-14" />
                <div class="flex flex-col ml-3">
                    <h2 class="text-neutral-700 text-xl font-bold dark:text-gray-400">
                        <span v-if="post.author?.username">{{ post.author.username }}</span>
                        <span v-else>Utilizator anonim</span>
                    </h2>
                    <p class="font-thin">
                        <span v-for="tag in post.tags" :key="tag.name" class="font-thin">
                            {{ '#' + tag.name + ' ' }}
                        </span>
                    </p>
                </div>
                <div class="grow flex flex-col">
                    <div v-if="user_roles && user_roles.is_moderator == true" class="flex flex-row justify-end">
                        <button v-if="post.is_hidden" @click="updatePost(post, false)">
                            <Icon name="bx:hide" class="mr-2 text-gray-400 hover:text-gray-300" />
                        </button>
                        <button v-if="!post.is_hidden" @click="updatePost(post, true)">
                            <Icon name="bx:show" class="mr-2 text-blue-700 hover:text-blue-500" />
                        </button>
                        <button v-if="user_roles.is_admin" @click="deletePost(post)">
                            <Icon name="material-symbols:delete" class="mr-2 text-red-500 hover:text-red-400" />
                        </button>
                    </div>
                    <div v-if="post.pending" class="text-end text-orange-200">
                        pending
                    </div>
                </div>
            </div>
            <br />
            <div class="flex flex-col gap-3">
                <h3 class="text-xl font-bold">{{ post.title }}</h3>
                <p class="font-bold break-normal">
                    {{ post.content }}
                </p>
            </div>
            <br />
            <div class="flex flex-row justify-between text-gray-500 gap-1">
                <div class="flex flex-row gap-4 sm:gap-6 md:gap-8">
                    <div>
                        <button @click="reactToPost(post, 'UP')">
                            <Icon name="material-symbols:thumb-up"
                                :class="post.likedByUser ? 'mr-2 text-gray-300' : 'mr-2 hover:text-gray-300'" />
                        </button>
                        <span>{{ post.reactions.filter((reaction: any) => String(reaction.type) === 'UP').length
                            }}</span>
                    </div>
                    <div>
                        <button @click="reactToPost(post, 'DOWN')">
                            <Icon name="material-symbols:thumb-down"
                                :class="post.dislikedByUser ? 'mr-2 text-gray-300' : 'mr-2 hover:text-gray-300'" />
                        </button>
                        <span>{{ post.reactions.filter((reaction: any) => String(reaction.type) === 'DOWN').length
                            }}</span>
                    </div>
                    <div>
                        <button @click="post.comm = !post.comm">
                            <Icon name="material-symbols:comment"
                                :class="post.comm ? 'mr-2 text-gray-300' : 'mr-2 hover:text-gray-300'" />
                        </button>
                        <span>{{ post.comments.length }}</span>
                    </div>
                </div>
                <div>
                    <span>{{ formatDate(post.created_at) }}</span>
                </div>
            </div>
            <div v-if="post.comm">
                <br />
                <Comments :comments="post.comments" :user_roles="user_roles" />
                <CreateComment :post="post" />
            </div>
        </div>
    </div>
</template>
