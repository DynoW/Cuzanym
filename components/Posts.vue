<script setup lang="ts">
const posts = useAttrs().posts as Post[]

interface Post {
    id: string;
    title: string;
    content: string;
    author: {id: string, name?: string};
    tags: [ {name?: string} ];
    updatedAt: string;
}

function formatDate(time: any) {
    const currentTime = new Date();
    const lastTime = new Date(time);
    const timeDiff = currentTime.getTime() - lastTime.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
        return `acum ${minutes == 1 ? 'un' : minutes} minut${minutes == 1 ? '' : 'e'}`;
    } else if (hours < 24) {
        return `acum ${hours == 1 ? 'o' : hours} or${hours == 1 ? 'ă' : 'e'}`;
    } else {
        return `acum ${days == 1 ? 'o' : days} zi${days == 1 ? '' : 'le'}`;
    }
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="post in posts" class="flex flex-col p-5 border-b-2 border-neutral-300 bg-white rounded-xl">
            <div class="flex flex-row">
                <Icon name="material-symbols:account-circle" class="size-14 text-gray-500" />
                <div class="flex flex-col ml-3">
                    <h2 class="text-neutral-700 text-xl font-bold">
                        <small v-if="post.author.name">{{ post.author.name }}</small>
                        <small v-else>Unknown author</small>
                    </h2>
                    <p class="font-thin">tags:
                        <span v-for="tag in post.tags" class="font-thin">
                            <span>{{ tag.name }}</span>
                        </span>
                    </p>
                </div>
            </div>
            <br />
            <div class="flex flex-col gap-3">
                <h3 class="text-xl font-bold">{{ post.title }}</h3>
                <p class="">
                    {{ post.content }}
                </p>
            </div>
            <br />
            <div class="flex flex-row justify-between text-gray-500">
                <div class="flex flex-row gap-8">
                    <div>
                        <Icon name="material-symbols:thumb-up" class="mr-2" />
                        <span>{{ 0 }}</span>
                    </div>
                    <div>
                        <Icon name="material-symbols:thumb-down" class="mr-2" />
                        <span>{{ 0 }}</span>
                    </div>
                    <div>
                        <Icon name="material-symbols:comment" class="mr-2" />
                        <span>{{ 0 }}</span>
                    </div>
                </div>
                <div>
                    <span>{{ formatDate(post.updatedAt) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
