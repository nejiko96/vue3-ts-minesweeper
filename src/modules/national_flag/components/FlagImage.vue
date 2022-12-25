<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    id: string
  }>()

  const url = computed(
    () => new URL(`../assets/images/${props.id}.svg`, import.meta.url).href
  )
</script>

<template>
  <div class="flex items-center">
    <img class="h-full w-full object-contain" :src="url" />
  </div>
</template>
