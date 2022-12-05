<script setup lang="ts">
  withDefaults(
    defineProps<{
      dummy?: boolean
    }>(),
    {
      dummy: false,
    }
  )

  const emit = defineEmits(['close'])
</script>
<template>
  <div
    v-if="dummy"
    class="w-[220px] rounded-lg border-2 border-dashed border-gray-400 bg-transparent py-1"
  >
    <slot></slot>
  </div>
  <div
    v-else
    class="w-[220px] rounded-lg bg-gray-300 py-2 text-black"
    @click="emit('close')"
  >
    <slot></slot>
  </div>
</template>
