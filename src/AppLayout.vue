<script setup lang="ts">
  import { MenuItemType } from './types'

  const props = defineProps<{
    menuItems: MenuItemType[]
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

        <div>
          <ul class="flex items-center justify-end pb-0">
            <li v-for="item in props.menuItems" :key="item.id">
              <a
                href="#"
                class="rounded px-8 py-2 hover:bg-teal-600"
                @click="() => emits('menuselect', item.id)"
                >{{ item.title }}</a
              >
            </li>
          </ul>
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
