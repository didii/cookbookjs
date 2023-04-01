<script setup lang="ts">
</script>

<template>
  <header class="header">
    This is some header
  </header>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'about' }">About</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'recipe', params: { id: '64283ea175e7a7548640ccf3' } }">Recipe &lt;id></router-link>
      </li>
    </ul>
  </nav>
  <section>
    <router-view></router-view>
  </section>
</template>

<style scoped>
</style>
