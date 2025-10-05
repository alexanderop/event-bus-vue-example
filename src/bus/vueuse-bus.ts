import type { CounterBus } from './types'
import { useEventBus } from '@vueuse/core'

export function vueUseBus(): CounterBus {
  const bus = useEventBus<number>('counter')
  return {
    on: fn => bus.on(fn),
    emit: n => bus.emit(n),
    reset: () => bus.reset(),
    label: 'VueUse useEventBus',
  }
}
