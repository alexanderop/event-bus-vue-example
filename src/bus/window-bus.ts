import type { CounterBus } from './types'

const TYPE = 'counter:update'

export function windowBus(): CounterBus {
  const handlerMap = new Set<(n: number) => void>()

  function on(fn: (n: number) => void) {
    handlerMap.add(fn)
    const h = (ev: Event) => fn((ev as CustomEvent<number>).detail)
    window.addEventListener(TYPE, h)
    return () => {
      handlerMap.delete(fn)
      window.removeEventListener(TYPE, h)
    }
  }

  function emit(n: number) {
    window.dispatchEvent(new CustomEvent<number>(TYPE, { detail: n }))
  }

  return { on, emit, label: 'window CustomEvent' }
}
