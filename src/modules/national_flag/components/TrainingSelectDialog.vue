<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'
  import { FlagGroupType } from '../models/flagsModel'

  defineProps<{
    trainings: FlagGroupType[]
    lang: string
    isOpen: boolean
  }>()

  const emits = defineEmits<{
    (e: 'close'): void
    (e: 'select', tr: FlagGroupType): void
  }>()
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="() => emits('close')">
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
              class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all"
            >
              <div class="flex justify-evenly">
                <div v-for="i in 4" :key="i">
                  <ul
                    v-for="(tr, j) in trainings.slice((i - 1) * 14, i * 14)"
                    :key="j"
                  >
                    <li
                      class="mb-2 max-w-[200px] cursor-pointer rounded border-2 border-transparent px-2 py-1 text-white transition duration-300"
                      :class="{
                        'bg-orange-500 hover:border-orange-300 hover:bg-orange-600':
                          tr.type === 'area',
                        'bg-amber-500 hover:border-amber-300 hover:bg-amber-600':
                          tr.type === 'mainland',
                        'bg-yellow-500 hover:border-yellow-300 hover:bg-yellow-600':
                          tr.type === 'design',
                      }"
                      @click="() => emits('select', tr)"
                    >
                      {{ tr.title[lang] }}
                    </li>
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
