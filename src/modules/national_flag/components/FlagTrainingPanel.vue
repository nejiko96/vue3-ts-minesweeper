<script lang="ts">
  import { watch, ref } from 'vue'
  import draggable, { MoveEvent } from 'vuedraggable'

  import { shuffle } from '@/core/utils'
  import FlagLabel from './FlagLabel.vue'
  import { FlagType } from '../models/flagsModel'

  type FlagAnswerType = FlagType & {
    answer: FlagType[]
  }
</script>

<script setup lang="ts">
  const props = defineProps<{
    flags: FlagType[]
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
    <div class="mb-10 grid grid-cols-3 gap-x-6 gap-y-6">
      <template v-for="flag in shuffled" :key="flag.id">
        <div>
          <div class="mb-2 flex h-[200px] w-[240px] items-center">
            <img class="h-full w-full object-contain" :src="flag.url" />
          </div>
          <div
            class="mx-auto h-auto w-[240px] border-2 border-orange-300 bg-orange-100 p-2"
          >
            <draggable
              :list="flag.answer"
              group="flags"
              item-key="id"
              ghost-class="ghost"
              :move="checkMove"
            >
              <template #item="{ element }">
                <FlagLabel @click="() => handleAnswerClick(flag)"
                  >{{ element.id === flag.id ? '⭕️' : '❌' }}
                  {{ element.nameJa }}</FlagLabel
                >
              </template>
            </draggable>
            <FlagLabel v-if="flag.answer.length === 0" dummy>&nbsp;</FlagLabel>
          </div>
        </div>
      </template>
    </div>

    <div
      class="min-h-[100px] w-[770px] border-2 border-orange-300 bg-orange-100 p-2"
    >
      <draggable
        :list="org"
        group="flags"
        item-key="id"
        class="pool flex flex-row flex-wrap gap-x-2 gap-y-2"
        ghost-class="ghost"
        :move="checkMove"
      >
        <template #item="{ element }">
          <FlagLabel>{{ element.nameJa }}</FlagLabel>
        </template>
      </draggable>
    </div>
  </div>
</template>
