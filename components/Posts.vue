<script setup lang="ts">
const posts = useAttrs().posts
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="post in posts" class="flex flex-col p-5 border-b-2 border-neutral-300 bg-white rounded-xl">
            <div class="flex flex-row">
                <Icon name="material-symbols:account-circle" class="size-14 text-gray-500" />
                <div class="flex flex-col ml-3">
                    <h2 class="text-neutral-700 text-xl font-bold">user</h2>
                    <p class="font font-thin">tags</p>
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
                        <span>{{ 2 }}</span>
                    </div>
                    <div>
                        <Icon name="material-symbols:thumb-down" class="mr-2" />
                        <span>{{ 1 }}</span>
                    </div>
                    <div>
                        <Icon name="material-symbols:comment" class="mr-2" />
                        <span>{{ 69 }}</span>
                    </div>
                </div>
                <div>
                    <span>acum 6 zile</span>
                </div>
            </div>
        </div>
    </div>
</template>
