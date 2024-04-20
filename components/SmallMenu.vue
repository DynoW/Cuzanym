<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
    if (colorMode.preference === 'light') {
        colorMode.preference = 'dark';
    } else if (colorMode.preference === 'dark') {
        colorMode.preference = 'system';
    } else {
        colorMode.preference = 'light';
    }
};
</script>

<template>
    <div class="flex flex-row gap-5 items-center">
        <button title="notifiactions">
            <Icon name="material-symbols:notifications-outline" class="cursor-pointer" />
        </button>
        <NuxtLink title="profile" to="/profile">
            <Icon name="material-symbols:account-circle" class="cursor-pointer" />
        </NuxtLink>
        <button @click="toggleTheme" title="mode">
            <Icon name="material-symbols:sunny-outline-rounded" v-show="colorMode.preference === 'light'" />
            <Icon name="ph:moon" v-show="colorMode.preference === 'dark'" />
            <Icon name="system-uicons:globe" v-show="colorMode.preference === 'system'" />
        </button>
    </div>
</template>