<script setup lang="ts">
  import { ref } from 'vue'
  import { FlagType } from '../models/flagsModel'

  export type FlagQuizType = {
    answer: FlagType
    options: FlagType[]
  }

  const props = defineProps<{
    q: FlagQuizType
  }>()

  const emits = defineEmits<{
    (e: 'answer', correct: boolean): void
  }>()

  const selected = ref<FlagType | null>(null)

  const correct = (opt: FlagType) => opt === props.q.answer

  const handleClick = (opt: FlagType) => {
    if (selected.value) return
    selected.value = opt
    emits('answer', correct(opt))
  }
</script>

<template>
  <div
    class="mb-10 flex flex-col items-center justify-center gap-y-6 md:flex-row md:gap-x-6"
  >
    <div class="flex h-[280px] w-[420px] items-center">
      <img class="h-full w-full object-contain" :src="q.answer.url" />
    </div>

    <div class="flex flex-col gap-y-2">
      <button
        v-for="(opt, i) in q.options"
        :key="i"
        class="w-[350px] rounded-lg p-3 text-2xl text-white dark:text-black"
        :class="{
          'bg-gray-400 hover:bg-gray-500 dark:bg-gray-200 dark:hover:bg-gray-300':
            !selected,
          'bg-gray-500 dark:bg-gray-300': selected && opt === selected,
          'bg-gray-400 opacity-50 dark:bg-gray-200':
            selected && opt !== selected,
        }"
        @click="() => handleClick(opt)"
      >
        {{ opt === selected ? (correct(opt) ? '⭕️' : '❌') : '' }}
        {{ opt.name['ja'] }}
      </button>
    </div>
  </div>
</template>
