<script setup lang="ts">
  defineProps<{
    src: string | null
  }>()
</script>

<template>
  <img v-if="src" :src="src" class="block h-10 w-10 rounded-full" />
  <div v-else class="h-10 w-10 rounded-full bg-gray-400"></div>
</template>
