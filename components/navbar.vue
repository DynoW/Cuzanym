<template>
    <div
        class="hidden sm:flex bg-gradient-to-r from-sky-50 via-sky-300 via-15% vua to-blue-700 w-full h-14 items-center justify-center text-white">
        <div class="container w-full flex flex-row gap-10 justify-between items-center">
            <Logo class="text-3xl text-shadow" />
            <div class="text-center ">
                <div class="flex flex-row gap-8">
                    <NuxtLink to="/" class="text-lg text-shadow">Forum</NuxtLink>
                    <NuxtLink to="/" class="text-lg text-shadow">Evenimente</NuxtLink>
                    <NuxtLink to="/" class="text-lg text-shadow">Raportari</NuxtLink>
                    <NuxtLink to="/" class="text-lg text-shadow">Politici</NuxtLink>
                </div>
            </div>
            <div>
                <div class="bg-gray-200 rounded-full flex flex-row items-center justify-center p-[6px] gap-2">
                    <Icon name="ph:magnifying-glass-bold" class="text-black cursor-pointer" />
                    <input type="text" placeholder="Search" class="w-full bg-gray-200 focus:outline-none" />
                </div>
            </div>
            <div class="flex flex-row gap-5 items-center">
                <button class="">
                    <Icon name="material-symbols:notifications-outline" class="cursor-pointer" />
                </button>
                <NuxtLink to="/profile">
                    <Icon name="material-symbols:account-circle" class="cursor-pointer" />
                </NuxtLink>
                <button class="">
                    <span class="">
                        <Icon name="material-symbols:sunny-outline-rounded" class="cursor-pointer" />
                    </span>
                    <span class="hidden">
                        <Icon name="ph:moon" class="cursor-pointer" />
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>