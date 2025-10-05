<script setup lang="ts">
import type { CounterBus } from '../bus/types'
import { onUnmounted, ref } from 'vue'

const props = defineProps<{ bus: CounterBus }>()
const value = ref(0)
const off = props.bus.on(n => value.value = n)
onUnmounted(() => off?.())
</script>

<template>
  <section class="card">
    <div class="card-header">
      <h3 class="card-title">
        Mirror
      </h3>
    </div>
    <div class="card-body">
      <div class="value-display">
        <span class="value-label">Synced Value</span>
        <span class="value-number">{{ value }}</span>
      </div>
      <div class="flex items-center justify-center gap-2 p-2">
        <span class="h-2 w-2 animate-pulse rounded-full bg-[rgb(var(--color-accent))]" />
        <span class="text-xs text-[rgba(var(--color-text-base),0.7)]">Live Sync Active</span>
      </div>
    </div>
  </section>
</template>
