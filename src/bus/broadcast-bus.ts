import type { CounterBus } from './types'

const NAME = 'counter-channel'

export function broadcastBus(): CounterBus {
  const ch = new BroadcastChannel(NAME)
  const localHandlers = new Set<(n: number) => void>()

  const messageHandler = (ev: MessageEvent) => {
    if (typeof ev.data === 'number') {
      localHandlers.forEach(fn => fn(ev.data))
    }
  }
  ch.addEventListener('message', messageHandler)

  return {
    on: (fn) => {
      localHandlers.add(fn)
      return () => localHandlers.delete(fn)
    },
    emit: (n) => {
      // Trigger local handlers (for same-tab sync)
      localHandlers.forEach(fn => fn(n))
      // Send to other tabs
      ch.postMessage(n)
    },
    reset: () => { /* not needed; close if you create many channels */ },
    label: 'BroadcastChannel (cross-tab)',
  }
}
