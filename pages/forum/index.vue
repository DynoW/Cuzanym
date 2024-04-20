<script setup lang="ts">

</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-6">
                <Announcement>
                    Bun venit, pe forum!
                </Announcement>
                <Topics />
            </div>
            <div class="basis-2/5 xl:basis-1/4 px-4">
                <EventsSidebar />
            </div>
        </main>
    </NuxtLayout>
</template>