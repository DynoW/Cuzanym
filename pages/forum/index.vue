<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="container flex flex-col-reverse md:flex-row gap-10 mx-auto pb-80 sm:pb-56 md:pb-44 xl:pb-36 pt-12">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-12">
                <Announcement>
                    Welcome to the forum!
                </Announcement>
                <Topics />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>