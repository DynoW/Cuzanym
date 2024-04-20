<template>
    <footer
        class="absolute bottom-0 w-full py-5 bg-gradient-to-r from-sky-50 via-sky-300 via-15% vua to-blue-700 text-shadow text-white dark:from-blue-900 dark:to-slate-900 dark:dark:text-neutral-100">
        <div class="md:container mx-auto flex flex-col justify-between sm:flex-row px-3">
            <div class="flex flex-row gap-2 md:gap-10 lg:ml-10 items-center justify-around">
                <div class="">
                    <h2 class="text-xl mb-3 font-montserrat-semibold">Parteneri</h2>
                    <ul class="flex flex-col gap-1">
                        <li>
                            <NuxtLink to="https://cuza.pages.dev/" target="_blank" class="">Resurse
                                Bacalaureat</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="https://www.facebook.com/p/Liceul-Teoretic-Alexandru-Ioan-Cuza-Bucuresti-100059320736208/?locale=ro_RO"
                                target="_blank" class="">Facebook</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="https://www.laicuza.ro" target="_blank" class="">Site
                                Oficial</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="">
                    <h2 class="text-xl mb-3 font-montserrat-semibold">Ținem Legătura</h2>
                    <ul class="flex flex-col gap-1">
                        <li>
                            <NuxtLink to="/terms" class="">Termeni si Condiții</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/policy" class="">Politica de confidențialitate</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forum/raportări" class="">Sesisează-ne o problemă</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-6">
                <Logo class="text-4xl lg:text-6xl logo-shadow" />
            </div>
        </div>
    </footer>
</template>