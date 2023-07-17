<script setup lang="ts">
  import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <div class="root body">
    <div id="app">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />
    </div>
  </div>
</template>

<style scoped>
  /* cancel tailwind css styling start */
  img {
    display: inline;
    vertical-align: baseline;
  }

  div {
    box-sizing: content-box;
  }

  /* cancel tailwind css styling end */

  .root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgb(255 255 255 / 87%);
    background-color: #242424;
    font-synthesis: none;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
  }

  .body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;

    /* box-sizing: unset; */
  }

  @media (prefers-color-scheme: light) {
    .root {
      color: #213547;
      background-color: #fff;
    }
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
