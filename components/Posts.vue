<script setup lang="ts">
const user = useSupabaseUser();
const posts = useAttrs().posts as Post[];

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

async function reactToPost(post: Post, type: string) {
    const { reaction, action } = await $fetch('/api/post/reaction', {
        method: 'post',
        headers: useRequestHeaders(['cookie']),
        body: {
            postId: post.id,
            type
        }
    })
    if (action == 'deleted') {
        post.votes = post.votes.filter(vote => vote.userId !== user.value?.id);
    } else if (action == 'created') {
        post.votes.push(reaction as unknown as Vote);
    } else if (action == 'updated') {
        post.votes = post.votes.map(vote => {
            if (vote.userId === user.value?.id) {
                vote.type = type as unknown as VoteType;
            }
            return vote;
        });
    }
}

const filteredPosts = computed(() => {
    if (useTag().value) {
        return posts.filter((post: any) => post.tags.some((t: any) => t.name == useTag().value));
    } else {
        return posts;
    }
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="post in filteredPosts" :key="post.id"
            class="flex flex-col p-5 border-b-2 rounded-xl border-neutral-300 bg-white dark:bg-slate-800 dark:border-neutral-600">
            <div class="flex flex-row">
                <Icon name="material-symbols:account-circle" class="size-14 text-gray-500" />
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
                            <Icon name="material-symbols:thumb-up" class="mr-2" />
                        </button>
                        <span>{{ post.votes.filter(vote => String(vote.type) === 'UP').length }}</span>
                    </div>
                    <div>
                        <button @click="reactToPost(post, 'DOWN')">
                            <Icon name="material-symbols:thumb-down" class="mr-2" />
                        </button>
                        <span>{{ post.votes.filter(vote => String(vote.type) === 'DOWN').length }}</span>
                    </div>
                    <div>
                        <Icon name="material-symbols:comment" class="mr-2" @click="" />
                        <span>{{ post.comments.length }}</span>
                    </div>
                </div>
                <div>
                    <span>{{ formatDate(post.updatedAt) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
