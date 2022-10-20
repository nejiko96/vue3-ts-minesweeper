<script setup lang="ts">
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
    <div class="--items-center flex grow justify-evenly pt-10">
      <div class="--text-left --w-96">
        <h3 class="mb-2 text-2xl font-semibold">
          Select From Search Result(10)
        </h3>
        <ul class="mb-2 grid grid-cols-3 grid-rows-3 gap-x-2 gap-y-2">
          <li
            class="w-40 rounded-lg bg-sky-500 p-2 text-xl text-white hover:bg-sky-300"
          >
            BENNI
          </li>
          <li
            class="w-40 rounded-lg bg-sky-500 p-2 text-xl text-white hover:bg-sky-300"
          >
            DENIM
          </li>
          <li
            class="w-40 rounded-lg bg-sky-500 p-2 text-xl text-white hover:bg-sky-300"
          >
            GENIC
          </li>
          <li
            class="w-40 rounded-lg bg-sky-500 p-2 text-xl text-white hover:bg-sky-300"
          >
            GENIE
          </li>
        </ul>

        <h3 class="mb-2 text-2xl font-semibold">Select From Suggestion</h3>
        <ul class="mb-2 grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-2">
          <li
            class="w-40 rounded-lg bg-pink-500 p-2 text-xl text-white hover:bg-pink-300"
          >
            GUIMP
          </li>
          <li
            class="w-40 rounded-lg bg-pink-500 p-2 text-xl text-white hover:bg-pink-300"
          >
            GRAMP
          </li>
        </ul>

        <h3 class="mb-2 text-2xl font-semibold">Edit Menu</h3>
        <ul class="grid grid-cols-3 grid-rows-1 gap-x-2 gap-y-2">
          <li
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
          >
            <fa icon="fa-rotate-left" size="sm" />
            Undo
          </li>
          <li
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
          >
            <fa icon="fa-trash-can" size="sm" />
            Clear
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-2 text-2xl font-semibold">Present/Correct/Absent</h3>
        <div class="grid grid-cols-5 grid-rows-6 gap-x-2 gap-y-2">
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
    </div>
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

  .present:hover {
    background-color: #fef08a;
  }

  .correct {
    background-color: var(--color-correct);
  }

  .correct:hover {
    background-color: #a1e1c7;
  }

  .absent {
    background-color: var(--color-absent);
  }

  .absent:hover {
    background-color: #bcc1c4;
  }

  .empty {
    border: 2px solid var(--color-tone-4);
  }
</style>
