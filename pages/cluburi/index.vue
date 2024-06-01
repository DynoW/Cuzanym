<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = {
    path: '/cluburi',
    sort: [{ order: 1 }]
}
</script>

<template>
    <NuxtLayout name="cluburi">
        <main class="main pt-20 lg:pt-32">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12">
                <ContentList :query="query" v-slot="{ list }">
                    <div v-for="club in list" :key="club._path"
                        class="flex flex-col justify-evenly text-center rounded-[32px] p-4 bg-neutral-100 dark:bg-slate-800 shadow-xl">
                        <NuxtImg :src="'/img' + club._path + '/' + club.image"
                            :alt="club.image.replace(/\.[^.]+$/, '')" class="rounded-[32px] w-full h-48 object-cover" />
                        <h2 class="text-2xl font-bold font-montserrat-semibold text-slate-800 dark:text-white">{{
                            club.name }}</h2>
                        <div class="font-montserrat-regular text-sm mt-2 dark:text-white">
                            <p>{{ club.desc }}</p>
                            <p>întâlniri: {{ club.meetings || 'necunoscut' }}</p>
                            <p>prof. coordonator: {{ club.coord.join(', ') ||
                                'necunoscut' }}</p>
                        </div>
                        <NuxtLink :to="club._path"
                            class="mt-4 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-900 text-white">
                            Detalii
                        </NuxtLink>
                    </div>
                </ContentList>
            </div>
        </main>
    </NuxtLayout>
</template>