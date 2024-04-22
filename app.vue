<script setup lang="ts">
let qr = ref(false)
</script>

<template>
  <NuxtLoadingIndicator color="blue" />
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
  <div class="hidden md:flex flex-col fixed bottom-0 right-0">
    <button @click="qr = !qr" class="text-end">X</button>
    <NuxtImg v-if="qr" src="/img/qr.png" alt="QR" class="max-h-64 max-w-64" />
  </div>
</template>
