<script setup lang="ts">
  import AppMenu from '@/core/components/AppMenu.vue'
  import UserMenu from '@/core/components/UserMenu.vue'
  import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav class="bg-teal-500 text-white">
      <div
        class="container mx-auto flex h-16 items-center justify-between px-2 py-4"
      >
        <h1>
          <RouterLink to="/" class="mr-2 text-xl font-semibold">
            Vue3 + TypeScript demo page
          </RouterLink>
          <a
            href="https://github.com/nejiko96/vue3-ts-minesweeper"
            target="_blank"
            title="View source on GitHub"
            aria-label="View source on GitHub"
            class="rounded-md bg-black/0 px-2 py-4 hover:bg-black/30"
          >
            <fa icon="fa-brands fa-github" size="2xl" />
          </a>
        </h1>

        <div class="flex items-center">
          <AppMenu class="mr-4" />
          <UserMenu />
        </div>
      </div>
    </nav>
  </header>
  <main>
    <slot></slot>
  </main>
</template>
