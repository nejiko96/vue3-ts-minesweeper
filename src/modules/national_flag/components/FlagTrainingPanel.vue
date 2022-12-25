<script lang="ts">
  import { watch, ref } from 'vue'
  import draggable, { MoveEvent } from 'vuedraggable'

  import { shuffle } from '@/core/utils'
  import { FlagType } from '../models/flagsModel'
  import FlagImage from './FlagImage.vue'
  import FlagLabel from './FlagLabel.vue'

  type FlagAnswerType = FlagType & {
    answer: FlagType[]
  }
</script>

<script setup lang="ts">
  const props = defineProps<{
    flags: FlagType[]
    lang: string
  }>()

  const org = ref<FlagType[]>([])

  const shuffled = ref<FlagAnswerType[]>([])

  const checkMove = (evt: MoveEvent<FlagType>): boolean => {
    const el = evt.relatedContext.component.$el
    if (el.classList.contains('pool')) return true
    if (evt.relatedContext.list.length === 0) return true
    return false
  }

  const handleRestart = () => {
    org.value = [...props.flags]
    shuffled.value = shuffle(org.value).map((o) => ({
      ...o,
      answer: [],
    }))
  }

  const handleAnswerClick = (flag: FlagAnswerType) => {
    if (flag.answer[0] && flag.id !== flag.answer[0].id) {
      const f = flag.answer.pop() as FlagType
      org.value.push(f)
    }
  }

  watch(() => props.flags, handleRestart, { immediate: true })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="mb-4 grid grid-cols-3 gap-x-4 gap-y-4">
      <div v-for="flag in shuffled" :key="flag.id">
        <FlagImage :id="flag.id" class="mb-2 h-[150px] w-[225px]"></FlagImage>
        <div
          class="mx-auto h-auto w-[225px] border-2 border-orange-300 bg-orange-100 p-2"
        >
          <draggable
            :list="flag.answer"
            group="flags"
            item-key="id"
            ghost-class="opacity-50"
            :move="checkMove"
            class="answer"
          >
            <template #item="{ element }">
              <FlagLabel @click="() => handleAnswerClick(flag)"
                >{{ element.id === flag.id ? '⭕️' : '❌' }}
                {{ element.name[lang] }}</FlagLabel
              >
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <div
      class="mb-4 min-h-[100px] w-[705px] border-2 border-orange-300 bg-orange-100 p-2"
    >
      <draggable
        :list="org"
        group="flags"
        item-key="id"
        class="pool flex flex-row flex-wrap gap-x-2 gap-y-2"
        ghost-class="opacity-50"
        :move="checkMove"
      >
        <template #item="{ element }">
          <FlagLabel>{{ element.name[lang] }}</FlagLabel>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
  .answer:empty::before {
    display: block;
    content: 'drop answer here';
    width: 205px;
    border-radius: 0.5rem;
    border-width: 2px;
    border-style: dashed;
    border-color: rgb(156 163 175 / var(--tw-border-opacity));
    background-color: transparent;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    color: rgb(156 163 175 / var(--tw-border-opacity));
  }
</style>
