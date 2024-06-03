<script setup lang="ts">
const postsList = ref(false);
const showTooltip = ref(false);
const user = useSupabaseUser();
</script>

<template>
    <NuxtLayout name="cluburi">
        <main class="main px-4 pt-20 lg:pt-32 text-white">
            <ContentDoc>
                <template v-slot="{ doc }">
                    <div class="flex flex-col lg:flex-row justify-center gap-3">
                        <div class="basis-9/12 flex flex-col md:flex-row bg-slate-900 rounded-3xl gap-6 p-6">
                            <div class="flex flex-col grow gap-4">
                                <h1 class="text-2xl">{{ doc.name }}</h1>
                                <NuxtImg :src="'/img' + doc._path + '/' + doc.image"
                                    :alt="doc.image.replace(/\.[^.]+$/, '')"
                                    class="rounded-3xl min-w-full h-48 object-cover" />
                                <button v-if="!postsList" @click="postsList = !postsList"
                                    class="p-2 rounded-lg bg-blue-600 text-white dark:bg-blue-900 mt-2">Afisează
                                    postările</button>
                                <LoadPostsClub v-if="postsList && user" :club="doc._path.replace('/cluburi/', '')" />
                                <p v-if="postsList && !user" class="text-sm text-center">Trebuie să te autentifici
                                    pentru a vedea postările!</p>
                            </div>
                            <div class="md:basis-72 lg:basis-96 flex flex-col gap-3">
                                <div class="flex flex-row justify-between">
                                    <p class="text-lg">Prof. Coordonator: {{ doc.coord.join(', ') || 'necunoscut' }}</p>
                                    <div class="relative inline-block">
                                        <Icon name="material-symbols:info" class="text-6xl text-gray-300 cursor-pointer"
                                            @mouseover="showTooltip = true" @mouseleave="showTooltip = false" />
                                        <p v-if="showTooltip"
                                            class="text-center text-xs p-3 rounded-lg bg-slate-900 border absolute z-10 bottom-full left-1/2 ml-[-200px] md:ml-[-110px] w-56">
                                            Pentru a
                                            actualiza delatliile
                                            clubului puteți sa ne trimiteți un email la
                                            <b>cuzanym@gmail.com</b>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p>Întâlniri: {{ doc.meetings || 'necunoscut' }}</p>
                                    <p v-if="doc.time && doc.time != ''">({{ doc.time }})</p>
                                </div>
                                <div v-if="doc.req && doc.req.length > 0">
                                    <p>Cerințe:</p>
                                    <ul v-for="cerinta in doc.req" class="list-disc">
                                        <li class="ml-6">{{ cerinta }}</li>
                                    </ul>
                                </div>
                                <p v-else-if="doc.req && doc.req.length == 0">Nu sunt cerințe pentru a intra în
                                    acest club</p>
                                <p v-else>Cerințe: necunoscut</p>
                                <p v-if="!doc.desc_long || doc.desc_long == ''">Descriere:
                                    <br>
                                    {{ doc.desc }}
                                </p>
                                <p v-else>Descriere: {{ doc.desc_long }}</p>
                                <div v-if="doc.contact && doc.contact != ''" class="flex flex-row justify-around gap-2">
                                    <p v-if="doc.req && doc.req.includes('invitație')"
                                        class="font-thin text-orange-200">
                                        Acest club este pe bază de invitație din partea coordonatorului!
                                    </p>
                                    <NuxtLink :to="doc.contact"
                                        class="px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-900 text-white mt-auto">
                                        Contact&nbsp;&nbsp;>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div v-if="doc.event && doc.event != ''"
                            class="lg:basis-3/12 flex flex-col bg-slate-800 rounded-3xl p-6 gap-4 w-fit mx-auto h-fit">
                            <h2 class="text-lg w-fit">Evenimente recente</h2>
                            <NuxtImg :src="doc.event" alt="event" class="rounded-3xl w-full max-w-xs object-cover" />
                        </div>
                    </div>
                </template>
                <template #empty>
                    <p class="text-center text-lg">Dacă sunteți coordonatorii acestui club, vă rugăm sa ne scrieți la
                        <b>cuzanym@gmail.com</b>
                    </p>
                </template>
                <template #not-found>
                    <p class="text-center text-xl">Clubul nu a fost găsit!</p>
                </template>
            </ContentDoc>
        </main>
    </NuxtLayout>
</template>