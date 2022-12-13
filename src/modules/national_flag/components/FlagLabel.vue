<script setup lang="ts">
  withDefaults(
    defineProps<{
      dummy?: boolean
    }>(),
    {
      dummy: false,
    }
  )

  const emit = defineEmits(['click'])
</script>
<template>
  <div
    v-if="dummy"
    class="w-[205px] rounded-lg border-2 border-dashed border-gray-400 bg-transparent py-1"
  >
    <slot></slot>
  </div>
  <div
    v-else
    class="w-[205px] cursor-move rounded-lg bg-gray-300 py-2 text-black"
    @click="emit('click')"
  >
    <slot></slot>
  </div>
</template>
