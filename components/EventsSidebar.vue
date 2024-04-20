<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const events = ref([]);

    onMounted(async () => {
        try {
            const response = await fetch('/content/events');
            const data = await response.json();
            events.value = data;
        } catch (error) {
            console.error(error);
        }
    });

</script>

<template>
    <aside class="flex flex-col gap-3">
        <h2 class="side-menu-title">Events</h2>
        <div class="flex flex-col gap-4">
            <ContentList path="/events" v-slot="{ list }">
                <div v-for="article in list.slice(0, 2)" :key="article._path">
                    <NuxtLink :to="article._path" class="text-lg font-semibold">
                        <NuxtImg :src="article.image" :alt="article.title" />
                    </NuxtLink>
                </div>
            </ContentList>
        </div>
    </aside>
</template>