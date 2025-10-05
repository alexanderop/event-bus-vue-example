import type { CounterBus } from './types'
import { broadcastBus } from './broadcast-bus'
import { mittBus } from './mitt-bus'
import { piniaBus } from './pinia-bus'
import { rxjsBus } from './rxjs-bus'
import { vueUseBus } from './vueuse-bus'
import { windowBus } from './window-bus'

const patterns: Record<string, () => CounterBus> = {
  window: windowBus,
  vueuse: vueUseBus,
  mitt: mittBus,
  pinia: piniaBus,
  rxjs: rxjsBus,
  broadcast: broadcastBus,
}

export function getBusByName(name: string | null | undefined): CounterBus {
  const key = (name || 'vueuse').toLowerCase()
  const factory = patterns[key] ?? patterns.vueuse
  return factory()
}

export const availablePatterns = Object.keys(patterns)
