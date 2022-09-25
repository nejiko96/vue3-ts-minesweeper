<script setup lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { MenuItemType } from './types'

  const props = defineProps<{
    menuItems: MenuItemType[]
    selected: string
  }>()

  const emits = defineEmits<{
    (e: 'menuselect', id: string): void
  }>()
</script>

<template>
  <header>
    <nav class="bg-teal-500 text-white">
      <div
        class="container mx-auto flex h-16 items-center justify-between px-2 py-4"
      >
        <h1 class="text-xl font-semibold">Vue3 + TypeScript demo page</h1>

        <div class="w-44 text-right">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="text-md inline-flex w-full justify-center rounded-md bg-black bg-opacity-0 px-4 py-2 font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Menu
                <div class="mr-1 ml-1 h-5 w-5">
                  <fa icon="fa-angle-down" />
                </div>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <template v-for="item in props.menuItems" :key="item.id">
                  <div class="px-1 py-1">
                    <MenuItem
                      v-slot="{ active }"
                      :disabled="item.id === props.selected"
                    >
                      <button
                        :class="[
                          active
                            ? 'bg-teal-500 text-white'
                            : item.id === props.selected
                            ? 'text-gray-400'
                            : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                        @click="() => emits('menuselect', item.id)"
                      >
                        {{ item.title }}
                      </button>
                    </MenuItem>
                  </div>
                </template>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <a
          href="https://github.com/nejiko96/vue3-ts-minesweeper"
          target="_blank"
          title="View source on GitHub"
          aria-label="View source on GitHub"
        >
          <fa icon="fa-brands fa-github" size="2xl" />
        </a>
      </div>
    </nav>
  </header>
  <main>
    <slot></slot>
  </main>
</template>
