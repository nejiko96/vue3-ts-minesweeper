<script setup lang="ts">
  import { ref } from 'vue'

  const cnt = ref(0)
  const increment = () => {
    cnt.value += 1
  }
</script>

<template>
  <div class="p-4">
    <button
      class="mx-auto block cursor-pointer rounded border-2 border-transparent bg-blue-500 px-4 py-2 font-semibold text-white transition duration-300 hover:border-blue-300 hover:bg-blue-600"
      @click="increment"
    >
      Increment
    </button>
    <span>{{ cnt }}</span>
  </div>
</template>
