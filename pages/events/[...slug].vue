<template>
    <NuxtLayout name="home">
        <main>
            <ContentDoc>
                <template #not-found>
                    <div>
                        <h1>Document Not Found</h1>
                        <p>The document you're looking for could not be found.</p>
                    </div>
                </template>
            </ContentDoc>
        </main>
    </NuxtLayout>
</template>