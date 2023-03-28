<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div id="app" class="container-fluid my-container mt-5">
    <header>
      <nav class="d-flex pt-3">
        <p class="m-0"><RouterLink to="/">Home</RouterLink></p>
        <p class="ms-3 mb-0"><RouterLink to="/about">About</RouterLink></p>
      </nav>
      <hr>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
</style>
