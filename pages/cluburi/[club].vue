<script setup lang="ts">
</script>

<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <main class="main">
            <ContentDoc v-slot="{ doc }">
                    <h1>{{ doc.name }}</h1>
                    <p>{{ doc.desc }}</p>
                    <p>Coordonator: {{ doc.coord || 'necunoscut' }}</p>
                    <p>Număr de membri: {{ doc.members || 'necunoscut' }}</p>
                    <p>Evenimente</p>
                    <p>Contact</p>
            </ContentDoc>
        </main>
    </NuxtLayout>
</template>