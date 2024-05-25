<script setup lang="ts">
    const props = defineProps<{
        name: string;
        descriere?: string;
        coordonator?: string;
    }>();
</script>

<template>
    <div class="flex flex-col justify-center text-center rounded-[42px] p-6 bg-slate-800 shadow-xl">
        <h2 class="text-xl font-bold text-white font-montserrat-semibold">{{props.name}}</h2>
        <p class="text-white text-sm mt-2">{{ props.descriere }}</p>
        <p class="text-white text-sm mt-2">Coordonator: {{props.coordonator || 'necunoscut'}}</p>
        <button class="mt-4 bg-slate-700 text-white px-4 py-2 rounded-lg">Detalii</button>
    </div>
</template>