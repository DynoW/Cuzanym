<template>
    <NuxtLayout name="home">
        <ContentDoc class="container mx-auto">
            <template #not-found>
                <div class="container mx-auto">
                    <h1>Document Not Found</h1>
                    <p>The document you're looking for could not be found.</p>
                </div>
            </template>
        </ContentDoc>
    </NuxtLayout>
</template>