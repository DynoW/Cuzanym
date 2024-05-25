<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = {
    path: '/cluburi',
    sort: [{ order: 1}]
}
</script>

<template>
    <div class="min-h-screen w-full relative bg-neutral-50 dark:bg-gradient-to-r text-neutral-700 dark:from-slate-900 dark:to-slate-950 dark:text-neutral-100 font-poppins"
        style="background-image: url('/img/clubs/cluburi-bg-darkish.png'); background-position: center center;">
        <Navbar class="fixed w-full" />
        <nav class="fixed w-full top-14">
            <Hierarchy class="bg-blue-900 text-white" />
        </nav>
        <main class="main pt-32">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12">
                <ContentList :query="query" v-slot="{ list }">
                    <div v-for="club in list" :key="club._path"
                        class="flex flex-col justify-evenly text-center rounded-[32px] p-4 bg-neutral-100 dark:bg-slate-800 shadow-xl">
                        <h2 class="text-2xl font-bold font-montserrat-semibold text-slate-800 dark:text-white">{{
                            club.name }}</h2>
                        <div class="font-montserrat-regular text-sm mt-2 dark:text-white">
                            <p>{{ club.desc }}</p>
                            <p>întâlniri: {{ club.meetings || 'necunoscut' }}</p>
                            <p>prof. coordonator: {{ club.coord.join(', ') ||
                                'necunoscut' }}</p>
                        </div>
                        <NuxtLink to="/work-in-progress"
                            class="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-slate-700">
                            Detalii
                        </NuxtLink>
                    </div>
                </ContentList>
            </div>
        </main>
        <Footer class="from-blue-600 via-blue-700 to-blue-900" />
    </div>
</template>