<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  useHead({
    bodyAttrs: {
      class: 'bg-gray-900 text-white'
    }
  })
</script>