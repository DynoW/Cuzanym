<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main main-color main-flex flex-col md:flex-row">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-6">
                <Announcement>
                    📜 Bun venit, pe forum!&nbsp;&nbsp;<span class="not-italic">|</span>&nbsp;<NuxtLink
                        to="/forum/tutorial" class="text-sky-600">Tutorial aici 📖
                    </NuxtLink>&nbsp;
                    <span class="not-italic">|</span>&nbsp;
                    <NuxtLink to="/forum/sugestii%20site" class="text-amber-600">
                        Apreciem orice sugestie 🤗
                    </NuxtLink>
                </Announcement>
                <Topics />
            </div>
            <div class="basis-2/5 xl:basis-1/4 px-4">
                <EventsSidebar />
            </div>
        </main>
    </NuxtLayout>
</template>