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
const dashboard = ref(false);
const user_roles = useUserRoles().value;
if (user_roles?.is_moderator || user_roles?.is_admin) {
    dashboard.value = true;
}
</script>

<template>
    <div class="flex flex-row gap-5 items-center">
        <NuxtLink v-if="dashboard" to="/forum/dashboard">
            <Icon name="mdi:monitor-dashboard" class="cursor-pointer" />
        </NuxtLink>
        <NuxtLink to="/forum/dashboard">
            <Icon name="material-symbols:notifications-outline" class="cursor-pointer" />
        </NuxtLink>
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