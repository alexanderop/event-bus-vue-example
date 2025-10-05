# Vue Event Bus - Patterns and Options

A comprehensive demonstration of event bus patterns and communication strategies in Vue 3 applications.

## What is an Event Bus?

An event bus is a pattern for enabling communication between components that don't have a direct parent-child relationship. It acts as a central hub where components can emit and listen to events, enabling decoupled component communication.

## Event Bus Options in Vue

### 1. **mitt / tiny-emitter (External Library)**
A lightweight event emitter library that provides a simple pub/sub interface.

**Pros:**
- Lightweight (~200 bytes)
- Simple API
- Framework agnostic
- TypeScript support

**Cons:**
- Additional dependency
- No built-in Vue integration
- Manual cleanup required

**Use when:** You need a simple, lightweight solution for basic event communication.

### 2. **Pinia Stores (Recommended)**
Vue's official state management solution that can also handle cross-component communication.

**Pros:**
- Official Vue solution
- Type-safe
- DevTools integration
- Can combine state + events
- Automatic cleanup
- Composable API

**Cons:**
- Slightly more setup than a simple event bus
- May be overkill for very simple use cases

**Use when:** You need state management alongside event communication, or want the most maintainable solution.

### 3. **Composables with Reactive State**
Create a composable that returns reactive state and methods.

**Pros:**
- No external dependencies
- Vue native
- Composable pattern
- TypeScript friendly

**Cons:**
- Requires custom implementation
- Less standardized

**Use when:** You want a Vue-native solution without external dependencies.

### 4. **Provide/Inject**
Vue's built-in dependency injection system.

**Pros:**
- Built into Vue
- No external dependencies
- Good for component trees

**Cons:**
- Requires provider at ancestor level
- Not truly global
- Less suitable for sibling communication

**Use when:** Communication is within a component tree hierarchy.

### 5. **Global Properties (Not Recommended)**
Attaching an event emitter to `app.config.globalProperties`.

**Pros:**
- Globally available
- Simple setup

**Cons:**
- Pollutes global namespace
- Hard to track dependencies
- Difficult to test
- Not composable

**Use when:** Legacy code migration only.

## Project Features

This project demonstrates various event bus implementations with:

- ⚡️ [Vue 3](https://github.com/vuejs/core) with Composition API and `<script setup>`
- 🔥 [Vite](https://github.com/vitejs/vite) for fast development
- 🍍 [Pinia](https://pinia.vuejs.org/) for event bus via stores
- 🎨 [UnoCSS](https://github.com/antfu/unocss) for styling
- 🦾 TypeScript for type safety
- 📦 Auto-imported components and composables
- 🗂 File-based routing

## Getting Started

### Prerequisites

- Node.js >=14.18
- pnpm (install with `npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install
```

## Usage

### Development

Run the development server and visit http://localhost:3333

```bash
pnpm dev
```

### Build

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

### Testing

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Unit tests
pnpm test:unit
```

## Implementation Examples

This project includes examples of each event bus pattern:

### Using mitt (External Library)

```typescript
// Create event bus
import mitt from 'mitt'
const emitter = mitt()

// Emit event
emitter.emit('user-login', { userId: 123 })

// Listen to event
emitter.on('user-login', (data) => {
  console.log('User logged in:', data.userId)
})

// Cleanup
onUnmounted(() => {
  emitter.off('user-login')
})
```

### Using Pinia Store

```typescript
// stores/eventBus.ts
export const useEventBus = defineStore('eventBus', () => {
  const listeners = ref<Map<string, Function[]>>(new Map())

  function emit(event: string, data?: any) {
    listeners.value.get(event)?.forEach(cb => cb(data))
  }

  function on(event: string, callback: Function) {
    const callbacks = listeners.value.get(event) || []
    listeners.value.set(event, [...callbacks, callback])
  }

  return { emit, on }
})

// In component
const eventBus = useEventBus()
eventBus.emit('user-login', { userId: 123 })
```

### Using Composables

```typescript
// composables/useEventBus.ts
const listeners = new Map<string, Function[]>()

export function useEventBus() {
  function emit(event: string, data?: any) {
    listeners.get(event)?.forEach(cb => cb(data))
  }

  function on(event: string, callback: Function) {
    const callbacks = listeners.get(event) || []
    listeners.set(event, [...callbacks, callback])

    // Auto cleanup
    onUnmounted(() => {
      off(event, callback)
    })
  }

  function off(event: string, callback: Function) {
    const callbacks = listeners.get(event) || []
    listeners.set(event, callbacks.filter(cb => cb !== callback))
  }

  return { emit, on, off }
}
```

## Best Practices

1. **Always clean up listeners** - Use `onUnmounted` or `onBeforeUnmount` to remove event listeners
2. **Type your events** - Define event names and payloads as TypeScript types
3. **Prefer Pinia for complex apps** - Better DevTools integration and maintainability
4. **Use provide/inject for tree-scoped communication** - Better than global event bus
5. **Consider props/emits first** - Event bus should be last resort for distant components

## When NOT to Use an Event Bus

- Parent-child communication → Use props and emits
- Shared state → Use Pinia stores
- Simple data passing → Use provide/inject
- Route-based communication → Use route params/query

## License

MIT
