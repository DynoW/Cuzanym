<script setup lang="ts">
const club = useAttrs().club;
console.log(club)
const user = useSupabaseUser();
await callOnce(async () => {
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

const { pending, data: posts } = useLazyFetch("/api/get/posts/topic", {
    method: 'post',
    headers: useRequestHeaders(['cookie']),
    body: {
        topic: club
    }
});

useTags().value = undefined;
useTag().value = undefined;
</script>

<template>
    <div class="flex flex-col gap-4">
        <CreatePost v-if="user && user.email && user.email.endsWith('@laicuza.ro')" :topic="club" />
        <div v-if="pending">
            <p>Loading...</p>
        </div>
        <Posts v-else :posts="posts" />
    </div>
</template>