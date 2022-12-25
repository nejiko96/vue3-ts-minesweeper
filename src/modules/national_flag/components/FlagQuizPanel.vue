<script setup lang="ts">
  import { ref } from 'vue'
  import { FlagType } from '../models/flagsModel'
  import FlagImage from './FlagImage.vue'

  export type FlagQuizType = {
    answer: FlagType
    options: FlagType[]
  }

  const props = defineProps<{
    q: FlagQuizType
    lang: string
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
    class="flex flex-col items-center justify-center gap-y-6 md:flex-row md:gap-x-6"
  >
    <FlagImage :id="q.answer.id" class="h-[280px] w-[420px]"></FlagImage>

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
        {{ opt.name[lang] }}
      </button>
    </div>
  </div>
</template>
