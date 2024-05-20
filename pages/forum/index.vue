<script setup lang="ts">
// const supabase = useSupabaseClient()
// const user = useSupabaseUser()

// const { data } = await supabase
//     .from('user')
//     .select('id, is_admin, is_director, is_event_creator, is_banned')
//     .eq('id', user.value?.id as string)
//     .single()
// if (data)
//     console.log(data)
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main main-flex flex-col md:flex-row">
            <div class="basis-3/5 xl:basis-3/4 flex flex-col gap-6">
                <Announcement>
                    Bun venit, pe forum! <NuxtLink to="/forum/tutorial" class="text-sky-600">Tutorial</NuxtLink>
                </Announcement>
                <Topics />
            </div>
            <div class="basis-2/5 xl:basis-1/4 px-4">
                <EventsSidebar />
            </div>
        </main>
    </NuxtLayout>
</template>