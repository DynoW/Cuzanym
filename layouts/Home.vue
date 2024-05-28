<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${decodeURIComponent(titleChunk)} | Cuzanym` : 'Cuzanym';
    }
})
</script>

<template>
    <div
        class="min-h-screen w-full relative bg-center bg-[url('/img/clubs/cluburi-bg-darkish.png')] bg-blue-700 text-neutral-100 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-950 font-poppins">
        <Navbar />
        <slot />
        <Footer />
    </div>
</template>