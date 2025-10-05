<script setup lang="ts">
import type { CounterBus } from '../bus/types'
import { onUnmounted, ref } from 'vue'

const props = defineProps<{ bus: CounterBus }>()
const value = ref(0)

const off = props.bus.on(n => value.value = n)
onUnmounted(() => off?.())

function inc() {
  props.bus.emit(value.value + 1)
}
function dec() {
  props.bus.emit(value.value - 1)
}
function reset() {
  props.bus.emit(0)
}
</script>

<template>
  <section class="card">
    <div class="card-header">
      <h3 class="card-title">
        Controller
      </h3>
    </div>
    <div class="card-body">
      <div class="value-display">
        <span class="value-label">Value</span>
        <span class="value-number">{{ value }}</span>
      </div>
      <div class="flex gap-2">
        <button class="btn-secondary" @click="dec">
          <span class="i-carbon-subtract" />
          <span>-1</span>
        </button>
        <button class="btn-primary" @click="inc">
          <span class="i-carbon-add" />
          <span>+1</span>
        </button>
        <button class="btn-secondary" @click="reset">
          <span class="i-carbon-reset" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  </section>
</template>
