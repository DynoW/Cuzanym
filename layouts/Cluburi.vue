<template>
    <div
        class="min-h-screen w-full relative bg-[url('/img/cluburi/cluburi-bg-darkish.png')] dark:bg-[url('/img/cluburi/cluburi-bg-dark.png')] bg-center font-poppins">
        <Navbar class="fixed w-full" />
        <nav class="hidden lg:block fixed w-full top-14">
            <Hierarchy class="bg-blue-900 text-white" />
        </nav>
        <slot />
        <Footer class="from-blue-600 via-blue-700 to-blue-900" />
    </div>
</template>