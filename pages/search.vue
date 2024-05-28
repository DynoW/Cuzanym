<script setup lang="ts">
const searchString = useRoute().query.q;
const { pending, data: posts, error } = await useFetch(`/api/get/search?q=${searchString}`, {
    headers: useRequestHeaders(['cookie'])
});
useTags().value = undefined;
useTag().value = undefined;
await callOnce(async () => {
    const user = useSupabaseUser();
    if (user.value) {
        if (user.value.email && !user.value.email.endsWith('@laicuza.ro'))
            navigateTo('/login?wrong_domain=true')
        else {
            useUserRoles().value = await $fetch('/api/get/user', {
                method: 'get',
                headers: useRequestHeaders(['cookie']),
            })
        }
    }
})
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main main-flex">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-6">
                <Announcement>
                    Search results for: <span class="not-italic">{{ searchString }}</span>
                </Announcement>
                <div v-if="pending" class="loading-screen">
                    <p>Loading...</p>
                </div>
                <Posts v-else-if="!error" :posts="posts" />
                <div v-else>
                    <h3 class="text-lg text-center">Nu a fost găsit nici un rezultat.</h3>
                </div>
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>