<script setup>
import { ref } from "vue";
const isOpen = ref(false);
let input = ref("");
async function search() {
    await navigateTo("/search?q=" + input.value);
    window.location.reload();
}
</script>

<template>
    <nav class="bg-gradient-to-r from-sky-50 via-sky-300 via-15% vua to-blue-700 text-white">
        <div class="lg:container mx-auto px-3 lg:px-0">
            <div class="flex justify-between items-center h-14">
                <div class="flex items-center gap-6 lg:gap-12">
                    <Logo class="text-3xl" />
                    <div class="hidden md:flex items-center gap-6">
                        <NuxtLink to="/forum" class="text-lg text-shadow">Forum</NuxtLink>
                        <NuxtLink to="/" class="text-lg text-shadow">Evenimente</NuxtLink>
                        <NuxtLink to="/forum/raportări" class="text-lg text-shadow">Raportari</NuxtLink>
                        <NuxtLink to="/" class="text-lg text-shadow">Politici</NuxtLink>
                    </div>
                </div>
                <div>
                    <div
                        class="bg-gray-200 rounded-full flex flex-row items-center justify-center p-[6px] gap-2 text-neutral-600 m-2">
                        <Icon name="ph:magnifying-glass-bold" class="text-black" />
                        <input type="text" id="search" v-model="input" placeholder="Search" @keyup.enter="search()"
                            class="max-w-32 sm:max-w-48 md:w-full bg-gray-200 focus:outline-none" />
                    </div>
                </div>
                <SmallMenu class="hidden md:flex" />

                <div class="md:hidden flex items-center">
                    <button @click="isOpen = !isOpen" class="md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="md:hidden" :class="isOpen ? 'block' : 'hidden'">
            <div class="flex flex-col items-end px-4 pb-2">
                <SmallMenu class="mb-2" />
                <NuxtLink to="/forum" class="text-lg text-shadow">Forum</NuxtLink>
                <NuxtLink to="/" class="text-lg text-shadow">Evenimente</NuxtLink>
                <NuxtLink to="/forum/raportări" class="text-lg text-shadow">Raportari</NuxtLink>
                <NuxtLink to="/" class="text-lg text-shadow">Politici</NuxtLink>
            </div>
        </div>
    </nav>
</template>