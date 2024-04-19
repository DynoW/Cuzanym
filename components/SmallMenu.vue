<template>
    <div class="flex flex-row gap-5 items-center">
        <button title="notifiactions">
            <Icon name="material-symbols:notifications-outline" class="cursor-pointer" />
        </button>
        <NuxtLink title="profile" to="/profile">
            <Icon name="material-symbols:account-circle" class="cursor-pointer" />
        </NuxtLink>
        <button title="mode">
            <span class="">
                <Icon name="material-symbols:sunny-outline-rounded" class="cursor-pointer" />
            </span>
            <span class="hidden">
                <Icon name="ph:moon" class="cursor-pointer" />
            </span>
        </button>
    </div>
</template>