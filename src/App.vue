<script setup lang="ts">
import { availablePatterns, getBusByName } from './bus/pattern'
import CounterMirror from './components/CounterMirror.vue'
import CounterPanel from './components/CounterPanel.vue'

const buses = availablePatterns.map(pattern => ({
  name: pattern,
  bus: getBusByName(pattern),
}))
</script>

<template>
  <div class="min-h-screen p-8 px-4 font-sans">
    <div class="mx-auto max-w-7xl">
      <header class="mb-8 text-center">
        <h1 class="m-0 mb-2 from-[rgb(var(--color-accent))] to-[rgb(var(--color-border))] bg-gradient-to-br bg-clip-text text-5xl text-transparent font-bold md:text-4xl">
          Vue Event Patterns
        </h1>
        <p class="m-0 text-base text-[rgba(var(--color-text-base),0.7)]">
          Compare different communication patterns with independent counters
        </p>
      </header>

      <p class="mb-12 flex items-center justify-center gap-2 text-center text-sm text-[rgba(var(--color-text-base),0.6)]">
        <span class="text-base">ℹ️</span>
        Each pattern demonstrates component communication between Controller and Mirror
      </p>

      <div class="grid gap-10">
        <div v-for="{ name, bus } in buses" :key="name" class="pattern-section">
          <h2 class="m-0 mb-4 text-xl text-[rgb(var(--color-accent))] font-semibold capitalize">
            {{ name }}
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CounterPanel :bus="bus" />
            <CounterMirror :bus="bus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
