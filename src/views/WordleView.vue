<script setup lang="ts">
  import { ref } from 'vue'

  const chars = 'aerosunityquirk'
  const hints = '  ?  ? !  !!!!!'.split('')

  const charClass = (k: number): string => {
    if (!chars[k]) return 'empty'
    if (hints[k] === '?') return 'present'
    if (hints[k] === '!') return 'correct'
    return 'absent'
  }
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="text-3xl font-semibold">Wordle Helper</h1>
    <div class="flex grow items-center justify-center">
      <div class="grid grid-cols-5 grid-rows-6 gap-x-2 gap-y-2 py-10">
        <template v-for="(_, k) in 30" :key="k">
          <div
            class="box-border inline-flex h-16 w-16 items-center justify-center uppercase text-white"
            :class="charClass(k)"
          >
            <span class="text-4xl font-bold">{{ chars[k] }}</span>
          </div>
        </template>
      </div>
    </div>

    <a
      href="#"
      class="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Noteworthy technology acquisitions 2021
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </a>
  </div>
</template>

<style>
  :root {
    --color-tone-1: #000;
    --color-tone-2: #787c7e;
    --color-tone-3: #878a8c;
    --color-tone-4: #d3d6da;
    --color-tone-5: #edeff1;
    --color-tone-6: #f6f7f8;
    --color-tone-7: #fff;
    --color-tone-8: #121212;
    --color-tone-9: #dfdfdf;
    --color-tone-10: #000;
    --color-tone-11: #787c7e;
    --color-tone-12: #363636;
    --color-nav-hover: #f4f4f4;
    --opacity-50: rgb(255 255 255 / 50%);
    --error-background: #e3e3e1;
    --icon-disabled: #a6a6a6;
    --green: #6aaa64;
    --darkened-green: #538d4e;
    --yellow: #c9b458;
    --darkened-yellow: #b59f3b;
    --color-present: var(--yellow);
    --color-correct: var(--green);
    --color-absent: var(--color-tone-2);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-tone-1: #fff;
      --color-tone-2: #818384;
      --color-tone-3: #565758;
      --color-tone-4: #3a3a3c;
      --color-tone-5: #272729;
      --color-tone-6: #1a1a1b;
      --color-tone-7: #121213;
      --color-tone-8: #fff;
      --color-tone-9: #424242;
      --color-tone-10: #dfdfdf;
      --color-tone-11: #dfdfdf;
      --color-tone-12: #dfdfdf;
      --color-nav-hover: #2f2f31;
      --opacity-50: rgb(0 0 0 / 50%);
      --error-background: var(--color-tone-7);
      --icon-disabled: #59595a;
      --color-present: var(--darkened-yellow);
      --color-correct: var(--darkened-green);
      --color-absent: var(--color-tone-4);
    }
  }
</style>

<style scoped>
  .present {
    background-color: var(--color-present);
  }

  .correct {
    background-color: var(--color-correct);
  }

  .absent {
    background-color: var(--color-absent);
  }

  .empty {
    border: 2px solid var(--color-tone-4);
  }
</style>
