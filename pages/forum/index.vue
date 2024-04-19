<script setup lang="ts">

</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-12">
                <Announcement>
                    Bun venit, pe forum!
                </Announcement>
                <Topics />
            </div>
            <div class="basis-2/5 xl:basis-1/4">
                <Tags />
            </div>
        </main>
    </NuxtLayout>
</template>