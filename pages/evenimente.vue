<script setup lang="ts">

</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-24">
                <ContentList path="/evenimente" v-slot="{ list }">
                    <div v-for="event in list" :key="event._path" class="duration-400 ease-in-out hover:scale-105">
                        <NuxtLink to="/work-in-progress">
                            <NuxtImg :src="event.imagine" :alt="event.titlu" :id="event.titlu"
                                class="aspect-[1/1.4]  object-contain hover:object-contain" />
                        </NuxtLink>
                    </div>
                </ContentList>
            </div>
        </main>
    </NuxtLayout>
</template>