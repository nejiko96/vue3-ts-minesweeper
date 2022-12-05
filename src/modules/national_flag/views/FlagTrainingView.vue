<script lang="ts">
  import { onMounted, ref } from 'vue'
  import {
    TransitionRoot,
    Dialog,
    TransitionChild,
    DialogPanel,
  } from '@headlessui/vue'
  import draggable, { MoveEvent } from 'vuedraggable'
  import { sample, shuffle } from '@/core/utils'
  import {
    FlagType,
    FlagFilterType,
    getFilter,
    getFlagList,
    getFilterList,
  } from '../models/flagsModel'
  import FlagLabel from '../components/FlagLabel.vue'

  type FlagAnswerType = FlagType & {
    answer: FlagType[]
  }

  const trainingList = getFilterList()
</script>

<script setup lang="ts">
  const trainingObj = ref<FlagFilterType>(sample(trainingList))

  const org = ref<FlagType[]>([])

  const shuffled = ref<FlagAnswerType[]>([])

  const checkMove = (evt: MoveEvent<FlagType>): boolean => {
    const el = evt.relatedContext.component.$el
    if (el.classList.contains('pool')) return true
    if (evt.relatedContext.list.length === 0) return true
    return false
  }

  const handleRestart = () => {
    org.value = getFlagList(trainingObj.value.id)
    shuffled.value = shuffle(org.value).map((o) => ({
      ...o,
      answer: [],
    }))
  }

  const handleRemove = (flag: FlagAnswerType) => {
    if (flag.answer[0] && flag.id !== flag.answer[0].id) {
      const f = flag.answer.pop() as FlagType
      org.value.push(f)
    }
  }

  const isDialogOpen = ref(false)

  const handleTrainingSelect = (id: string) => {
    trainingObj.value = getFilter(id)
    handleRestart()
    isDialogOpen.value = false
  }

  onMounted(handleRestart)
</script>

<template>
  <div class="bg-gray-200 p-4 text-center dark:bg-gray-800">
    <h1 class="mb-4 text-3xl font-semibold">
      National Flag Training :
      <button
        class="rounded-lg border-2 border-transparent bg-orange-500 px-4 py-2 text-white transition duration-300 hover:border-orange-300 hover:bg-orange-600"
        @click="isDialogOpen = true"
      >
        {{ trainingObj.titleJa }}
      </button>
    </h1>

    <div class="flex flex-col items-center justify-center">
      <div class="mb-10 grid grid-cols-4 gap-x-6 gap-y-6">
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
                  <FlagLabel @click="() => handleRemove(flag)"
                    >{{ element.id === flag.id ? '⭕️' : '❌' }}
                    {{ element.nameJa }}</FlagLabel
                  >
                </template>
              </draggable>
              <FlagLabel v-if="flag.answer.length === 0" dummy
                >&nbsp;</FlagLabel
              >
            </div>
          </div>
        </template>
      </div>

      <div
        class="min-h-[150px] w-[1030px] border-2 border-orange-300 bg-orange-100 p-2"
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
  </div>
  <TransitionRoot :show="isDialogOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="isDialogOpen = false">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all"
            >
              <div class="mt-2 flex justify-evenly">
                <div v-for="i in 3" :key="i">
                  <ul>
                    <template
                      v-for="tr in trainingList.slice((i - 1) * 12, i * 12)"
                      :key="tr.id"
                    >
                      <li
                        class="mb-2 rounded bg-orange-500 px-4 py-1 text-white"
                        @click="() => handleTrainingSelect(tr.id)"
                      >
                        {{ tr.titleJa }}
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div></Dialog
    ></TransitionRoot
  >
</template>

<style scoped>
  .ghost {
    opacity: 0.5;
  }
</style>
