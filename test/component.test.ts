import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { mittBus } from '../src/bus/mitt-bus'
import CounterPanel from '../src/components/CounterPanel.vue'

describe('component CounterPanel.vue', () => {
  it('should render', async () => {
    const bus = mittBus()
    const screen = render(CounterPanel, { props: { bus } })
    bus.emit(10)
    await new Promise(resolve => setTimeout(resolve, 10)) // Wait for reactivity
    const valueElement = screen.container.querySelector('.value-number')
    expect(valueElement?.textContent).toBe('10')
  })

  it('should be interactive', async () => {
    const bus = mittBus()
    const screen = render(CounterPanel, { props: { bus } })

    const valueElement = screen.container.querySelector('.value-number')
    expect(valueElement?.textContent).toBe('0')

    // Get buttons
    const incrementButton = screen.getByRole('button', { name: /\+1/ })
    const decrementButton = screen.getByRole('button', { name: /-1/ })

    // Click increment button
    await incrementButton.click()
    expect(valueElement?.textContent).toBe('1')

    // Click decrement button
    await decrementButton.click()
    expect(valueElement?.textContent).toBe('0')
  })
})
