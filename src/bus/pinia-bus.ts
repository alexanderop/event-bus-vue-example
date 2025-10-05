import type { CounterBus } from './types'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useHub } from '../stores/hub'

export function piniaBus(): CounterBus {
  const hub = useHub()
  const { value } = storeToRefs(hub)

  return {
    on: (fn) => {
      const stop = watch(value, n => fn(n), { immediate: true })
      return () => stop()
    },
    emit: n => hub.publishCounter(n),
    label: 'Pinia hub',
  }
}
