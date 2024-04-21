<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main">
            <div class="">
                <ContentList path="/events" v-slot="{ list }">
                    <div v-for="event in list" :key="event._path">
                        <NuxtImg :src="event.imagine" :alt="event.titlu" :id="event.titlu" class="max-w-80" />
                    </div>
                </ContentList>
            </div>
        </main>
    </NuxtLayout>
</template>