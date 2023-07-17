<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<script setup lang="ts">
  defineProps<{
    id: string
    label: string
    modelValue: number | undefined
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number | undefined): void
  }>()

  const handleInput: (ev: Event) => void = (ev) => {
    if (ev.target instanceof HTMLInputElement) {
      emits(
        'update:modelValue',
        (ev.target.value && Number(ev.target.value)) || undefined
      )
    }
  }
</script>

<template>
  <div class="mb-6 w-full px-3">
    <label class="mb-2 block text-sm font-semibold tracking-wide" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
      v-bind="$attrs"
      type="number"
      @input="handleInput"
    />
  </div>
</template>
