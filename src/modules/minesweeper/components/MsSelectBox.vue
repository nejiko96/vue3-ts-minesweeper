<script setup lang="ts">
  type SelectOptionType = {
    id: string
    name: string
  }

  defineProps<{
    id: string
    label: string
    options: Readonly<SelectOptionType[]>
    modelValue: string
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const handleChange: (ev: Event) => void = (ev) => {
    if (ev.target instanceof HTMLSelectElement) {
      emits('update:modelValue', ev.target.value)
    }
  }
</script>

<template>
  <div class="mb-6 w-full px-3">
    <label class="mb-2 block text-sm font-semibold tracking-wide" :for="id">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :id="id"
        class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-1 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        :value="modelValue"
        @change="handleChange"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <fa icon="fa-angle-down" size="xs" />
      </div>
    </div>
  </div>
</template>
