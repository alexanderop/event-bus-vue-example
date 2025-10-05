import type { Subscription } from 'rxjs'
import type { CounterBus } from './types'
import { BehaviorSubject } from 'rxjs'

export function rxjsBus(): CounterBus {
  const subj = new BehaviorSubject(0)
  return {
    on: (fn) => {
      const s: Subscription = subj.subscribe(fn)
      return () => s.unsubscribe()
    },
    emit: n => subj.next(n),
    label: 'RxJS BehaviorSubject',
  }
}
