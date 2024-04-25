<script setup lang="ts">
const { auth } = useSupabaseClient()

const { data } = await useFetch("/api/get/user", {
    headers: useRequestHeaders(['cookie'])
});
const user = data.value;

const handleLogout = async () => {
    await auth.signOut()
    navigateTo('/')
}
</script>

<template>
    <NuxtLayout name="home">
        <main class="main main-flex">
            <div class="basis-2/5 xl:basis-1/4 flex flex-col gap-4 rounded-lg p-5 bg-white dark:bg-slate-800">
                <div class="flex flex-col justify-center text-center">
                    <h1 class="font-extrabold text-2xl">
                        Profil
                    </h1>
                    <span>
                        <Icon name="material-symbols:account-circle" class="size-48 text-neutral-500" />
                    </span>
                </div>
                <div class="flex flex-row gap-2 justify-center md:justify-normal">
                    <h2>
                        Username:
                    </h2>
                    <span title="username" class="input inline-block whitespace-nowrap overflow-hidden max-w-48"
                        role="textbox" contenteditable>
                        {{ (user?.username == null) ? 'Utilizator anonim' : user?.username }}
                    </span>
                    <button>
                        <Icon name="material-symbols:ink-pen" />
                    </button>
                </div>
                <div class="text-center md:text-start">
                    <button @click="handleLogout()" class="text-red-500 font-extrabold text-lg">Sign out</button>
                </div>
            </div>
            <div class="basis-3/5 xl:basis-3/4">

            </div>
        </main>
    </NuxtLayout>
</template>