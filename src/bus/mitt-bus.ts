import type { CounterBus } from './types'
import mitt from 'mitt'

interface Events {
  counter: number
  [key: string]: unknown
  [key: symbol]: unknown
}

export function mittBus(): CounterBus {
  const emitter = mitt<Events>()
  return {
    on: (fn) => {
      const h = (n: number) => fn(n)
      emitter.on('counter', h)
      return () => emitter.off('counter', h)
    },
    emit: n => emitter.emit('counter', n),
    reset: () => emitter.all.clear(),
    label: 'mitt',
  }
}
