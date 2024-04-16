<template>
    <footer
        class="absolute bottom-0 w-full flex justify-center bg-gradient-to-r from-sky-50 via-sky-300 via-15% vua to-blue-700 text-shadow text-white">
        <div class="container flex flex-col sm:flex-row py-5 px-24">
            <div class="basis-1/4">
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
            <div class="basis-1/4">
                <h2 class="text-xl mb-3 font-montserrat-semibold">Ținem Legătura</h2>
                <ul class="flex flex-col gap-1">
                    <li>
                        <NuxtLink to="" class="">
                            <p class="">Termeni si Condiții</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="">Politica de confidențialitate</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="">Sesisează-ne o problemă</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="basis-2/4 flex justify-end">
                <Logo class="text-6xl logo-shadow" />
            </div>
        </div>
    </footer>
</template>