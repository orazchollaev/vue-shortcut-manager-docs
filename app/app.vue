<template>
  <div class="docs-layout">
    <!-- Mobile hamburger -->
    <button class="mobile-menu-toggle" @click="sidebarOpen = !sidebarOpen" :class="{ open: sidebarOpen }">
      <span></span><span></span><span></span>
    </button>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" v-if="sidebarOpen" @click="sidebarOpen = false"></div>

    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">
        <h1>Vue Shortcut Manager</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#features" @click="sidebarOpen = false">Features</a></li>
          <li><a href="#install" @click="sidebarOpen = false">Install</a></li>
          <li><a href="#usage" @click="sidebarOpen = false">Usage</a></li>
          <li><a href="#api" @click="sidebarOpen = false">API</a></li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <a href="https://www.npmjs.com/package/vue-shortcut-manager" target="_blank" class="npm-badge">
          <span class="badge-label">npm</span>
          <span class="badge-version">vue-shortcut-manager</span>
        </a>
      </div>
    </aside>

    <main class="content">
      <div class="content-wrapper">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('content').path('/').first()
})
</script>

<style lang="scss">
</style>