export interface CounterBus {
  on: (fn: (n: number) => void) => () => void
  emit: (n: number) => void
  reset?: () => void
  label: string
}
