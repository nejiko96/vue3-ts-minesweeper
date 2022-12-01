<script lang="ts">
  import flagsRaw from '../assets/flag_list.txt?raw'

  type FlagType = {
    id: string
    name: string
  }

  const FLAG_TBL = flagsRaw.split('\n').map((row) => {
    const [id, , name] = row.split(`\t`)
    return { id, name }
  })

  const FLAG_DIC = FLAG_TBL.reduce<Record<string, FlagType>>((h, o) => {
    h[o.id] = o
    return h
  }, {})

  // const ids = [
  //   'SG', // シンガポール
  //   'ID', // インドネシア
  //   'MC', // モナコ
  //   'PL', // ポーランド
  //   'NP', // ネパール
  // ]

  const ids = [
    'SH', // セントヘレナ・アセンションおよびトリスタンダクーニャ
    'SH_S', // セントヘレナ
    'SH_A', // アセンション
    'SH_T', // トリスタンダクーニャ
  ]
</script>
<script setup lang="ts">
  const flags = ids.map((id) => ({
    ...FLAG_DIC[id],
    url: new URL(`../assets/images/${id}.svg`, import.meta.url).href,
  }))
</script>
<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Flag Study</h1>
    <div class="flex flex-col items-center justify-center">
      <div class="mb-10 grid grid-cols-3 gap-x-6 gap-y-6">
        <template v-for="flag in flags" :key="flag.id">
          <div>
            <div class="mb-2 flex h-[200px] w-[240px] items-center">
              <img class="h-full w-full object-contain" :src="flag.url" />
            </div>

            <div class="mx-auto w-[200px] rounded bg-gray-300 py-2 text-black">
              {{ flag.name }}
            </div>
          </div>
        </template>
      </div>

      <div
        class="h-[200px] w-[650px] border-2 border-yellow-400 bg-yellow-100 p-2"
      >
        <div class="flex flex-row flex-wrap gap-x-2 gap-y-2">
          <template v-for="flag in flags" :key="flag.id">
            <div class="h-min w-[200px] rounded bg-gray-300 py-2 text-black">
              {{ flag.name }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
