<script setup lang="ts">
const client = useSupabaseClient()

const { data } = await useFetch('/api/me', {
    headers: useRequestHeaders(['cookie'])
})

console.log(data)
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-12">
                <Announcement>
                    Bun venit, pe forum! {{ user?.email }}
                </Announcement>
                <Topics />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>