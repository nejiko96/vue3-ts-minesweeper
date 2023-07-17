<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Switch } from '@headlessui/vue'

  export type LangType = 'ja' | 'en'

  const props = defineProps<{
    modelValue: LangType
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', value: LangType): void
  }>()

  const isEnglish = ref(props.modelValue === 'en')

  watch(
    () => isEnglish.value,
    () => emits('update:modelValue', isEnglish.value ? 'en' : 'ja')
  )
</script>

<template>
  <span
    class="cursor-pointer rounded-lg px-1.5 text-3xl hover:bg-gray-300 dark:hover:bg-gray-600"
    @click="isEnglish = false"
    >🇯🇵</span
  >
  <Switch
    v-model="isEnglish"
    :class="isEnglish ? 'bg-orange-500' : 'bg-orange-300'"
    class="relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
  >
    <span class="sr-only">Language</span>
    <span
      aria-hidden="true"
      :class="isEnglish ? 'translate-x-7' : 'translate-x-0'"
      class="pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
    ></span>
  </Switch>
  <span
    class="cursor-pointer rounded-lg px-1.5 text-3xl hover:bg-gray-300 dark:hover:bg-gray-600"
    @click="isEnglish = true"
    >🇬🇧</span
  >
</template>
