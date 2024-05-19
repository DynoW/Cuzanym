<script setup lang="ts">
const user = useSupabaseUser();
const posts = useAttrs().posts as post[];

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
    if(type === 'UP') {
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
</script>

<template>
    <div class="flex flex-col gap-4 break-all">
        <div v-for="post in filtered_posts as any" :key="post.id"
            class="flex flex-col p-5 border-b-2 rounded-xl border-neutral-300 bg-white dark:bg-slate-800 dark:border-neutral-600">
            <div class="flex flex-row">
                <Icon name="material-symbols:account-circle" class="size-14 text-gray-500 basis-14" />
                <div class="flex flex-col ml-3">
                    <h2 class="text-neutral-700 text-xl font-bold dark:text-gray-400">
                        <span v-if="post.author.name">{{ post.author.name }}</span>
                        <span v-else>Utilizator anonim</span>
                    </h2>
                    <p class="font-thin">
                        <span v-for="tag in post.tags" :key="tag.name" class="font-thin">
                            {{ '#' + tag.name + ' '}}
                        </span>
                    </p>
                </div>
            </div>
            <br />
            <div class="flex flex-col gap-3">
                <h3 class="text-xl font-bold">{{ post.title }}</h3>
                <p class="font-bo">
                    {{ post.content }}
                </p>
            </div>
            <br />
            <div class="flex flex-row justify-between text-gray-500">
                <div class="flex flex-row gap-8">
                    <div>
                        <button @click="reactToPost(post, 'UP')">
                            <Icon name="material-symbols:thumb-up"
                                :class="post.likedByUser ? 'mr-2 text-gray-300' :'mr-2 hover:text-gray-300'" />
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
                            <Icon name="material-symbols:comment" class="mr-2 hover:text-gray-300" />
                        </button>
                        <span>{{ post.comments.length }}</span>
                    </div>
                </div>
                <div>
                    <span>{{ formatDate(post.updated_at) }}</span>
                </div>
            </div>
            <div v-if="post.comm">
                <br />
                <div v-for="comment in post.comments" :key="comment.id"
                    class="flex flex-col p-5 border-b-2 rounded-xl border-neutral-300 bg-white dark:bg-slate-800 dark:border-neutral-600">
                    <div class="flex flex-row">
                        <Icon name="material-symbols:account-circle" class="size-14 text-gray-500 basis-14" />
                        <div class="flex flex-col ml-3">
                            <h2 class="text-neutral-700 text-xl font-bold dark:text-gray-400">
                                <span v-if="comment.author?.name">{{ comment.author.name }}</span>
                                <span v-else>Utilizator anonim</span>
                            </h2>
                        </div>
                    </div>
                    <br />
                    <div class="flex flex-col gap-3">
                        <p class="font-bo">
                            {{ comment.content }}
                        </p>
                    </div>
                    <br />
                    <div class="flex flex-row justify-between text-gray-500">
                        <div>
                            <span>{{ formatDate(comment.created_at) }}</span>
                        </div>
                    </div>
                </div>
                <br />
                <CreateComment :post="post" />
            </div>
        </div>
    </div>
</template>
